import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useMountEffect from '@restart/hooks/useMountEffect';
import useSafeState from '@restart/hooks/useSafeState';
import { DropzoneArea } from 'material-ui-dropzone';
import React, { useCallback, useRef, useState } from 'react';
import { MagickInputFile, MagickOutputFile } from 'wasm-imagemagick';

import { useWasmImageMagick } from '../../hooks/useWasmImageMagick';

export function HomeView() {
  const { instance: Magick } = useWasmImageMagick();
  const blobUrlsRef = useRef<Record<string, string>>({});
  const [inputImage, setInputImage] = useSafeState(useState<MagickInputFile | null>(null));
  const [outputImage, setOutputImage] = useSafeState(useState<MagickOutputFile | null>(null));
  const [outputImageBlobUrl, setOutputImageBlobUrl] = useSafeState(useState<string | null>(null));
  const handleDelete = useCallback(
    (file: File | MagickInputFile | MagickOutputFile | null) => {
      if (!file) return;
      const blobUrls = blobUrlsRef.current;
      const blobUrl = blobUrls[file.name];
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
        delete blobUrls[file.name];
      }
      if (file.name === inputImage?.name) {
        setInputImage(null);
        handleDelete(outputImage);
        setOutputImage(null);
        setOutputImageBlobUrl(null);
      }
    },
    [inputImage, outputImage, setInputImage, setOutputImage, setOutputImageBlobUrl]
  );
  const handleChange = useCallback(
    async (files: File[]) => {
      const [file] = files;
      if (!file || !Magick) return;
      handleDelete(file);
      const blobUrl = URL.createObjectURL(file);
      blobUrlsRef.current[file.name] = blobUrl;
      const magickImage = await Magick.buildInputFile(blobUrl, file.name);
      setInputImage(magickImage);
      setOutputImage(null);
      setOutputImageBlobUrl(null);
    },
    [Magick, handleDelete, setInputImage, setOutputImage, setOutputImageBlobUrl]
  );
  const handleGrayscale = useCallback(async () => {
    if (!inputImage || !Magick) return;
    const { outputFiles } = await Magick.execute({
      inputFiles: [inputImage],
      commands: [`convert ${inputImage.name} -set colorspace Gray -separate -average grayscale.png`],
    });
    const [nextImage] = outputFiles;
    if (!nextImage) return;
    handleDelete(nextImage);
    const blobUrl = URL.createObjectURL(nextImage.blob);
    blobUrlsRef.current[nextImage.name] = blobUrl;
    setOutputImage(nextImage);
    setOutputImageBlobUrl(blobUrl);
  }, [Magick, handleDelete, inputImage, setOutputImage, setOutputImageBlobUrl]);
  useMountEffect(() => {
    const blobUrls = blobUrlsRef.current;
    return () => {
      Object.keys(blobUrls).forEach((fileName) => {
        const blobUrl = blobUrls[fileName];
        URL.revokeObjectURL(blobUrl);
      });
    };
  });
  return (
    <Container component="main" maxWidth="md">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Image Converter</Typography>
        </Toolbar>
      </AppBar>
      <DropzoneArea
        clearOnUnmount
        filesLimit={1}
        onChange={handleChange}
        onDelete={handleDelete}
        inputProps={{ multiple: false, accept: 'image/*' }}
      />
      <Button disabled={!inputImage} onClick={handleGrayscale}>
        灰階化
      </Button>
      {outputImageBlobUrl && (
        <Box>
          <img src={outputImageBlobUrl} />
        </Box>
      )}
    </Container>
  );
}
export default HomeView;

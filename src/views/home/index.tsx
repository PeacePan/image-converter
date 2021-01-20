import { DropzoneArea } from 'material-ui-dropzone';
import React, { useCallback } from 'react';
import useStateDecorator, { StateDecoratorActions } from 'state-decorator';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useBlobUrl } from '../../hooks/useBlobUrl';
import { useWasmImageMagick } from '../../hooks/useWasmImageMagick';
import { HomeViewActions, HomeViewStates } from './interfaces';

const getInitialState = (): HomeViewStates => ({
  inputFile: null,
  outputImage: null,
});

const actionsImpl: StateDecoratorActions<HomeViewStates, HomeViewActions> = {
  handleChange: (state, [files]) => {
    const [file] = files;
    if (!file) return state;
    return { ...state, inputFile: file };
  },
  handleDelete: (state, [file]) => {
    if (!file || !state.inputFile || file.name !== state.inputFile.name) return state;
    return { ...state, inputFile: null, outputImage: null };
  },
  setOutputImage: (state, [outputImage]) => ({ ...state, outputImage }),
};

export function HomeView() {
  const { magick } = useWasmImageMagick();
  const { state, actions } = useStateDecorator<HomeViewStates, HomeViewActions>(getInitialState, actionsImpl);
  const { inputFile, outputImage } = state;
  const { handleChange, handleDelete, setOutputImage } = actions;
  const outputImageBlobUrl = useBlobUrl(outputImage?.blob);

  const handleGrayscale = useCallback(async () => {
    if (!inputFile || !magick) return;
    const inputImageBlobUrl = URL.createObjectURL(inputFile);
    const inputImage = await magick.buildInputFile(inputImageBlobUrl, inputFile.name);
    const { outputFiles } = await magick.execute({
      inputFiles: [inputImage],
      commands: [`convert ${inputImage.name} -set colorspace Gray -separate -average grayscale.png`],
    });
    URL.revokeObjectURL(inputImageBlobUrl);
    const [nextImage] = outputFiles;
    if (!nextImage) return;
    setOutputImage(nextImage);
  }, [magick, inputFile, setOutputImage]);
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
      <Button disabled={!inputFile} onClick={handleGrayscale}>
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

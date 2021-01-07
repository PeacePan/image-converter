import React, { useCallback, useEffect, useRef } from 'react';
import * as Magick from 'wasm-imagemagick';
import Container from '@material-ui/core/Container';
import { DropzoneArea } from 'material-ui-dropzone';
import './style.scss';

function Home() {
  const blobUrlsRef = useRef<Record<string, string>>({});
  const handleDelete = useCallback((file: File) => {
    const blobUrls = blobUrlsRef.current;
    const blobUrl = blobUrls[file.name];
    if (blobUrl) {
      URL.revokeObjectURL(blobUrl);
      delete blobUrls[file.name];
    };
  }, []);
  const handleChange = useCallback(async (files: File[]) => {
    const [file] = files;
    if (!file) return;
    const blobUrl = URL.createObjectURL(file);
    handleDelete(file);
    blobUrlsRef.current[file.name] = blobUrl;
    const magickFile = await Magick.buildInputFile(blobUrl, file.name);
    console.log(magickFile);
  }, [handleDelete]);
  useEffect(() => {
    const blobUrls = blobUrlsRef.current;
    return () => {
      Object.keys(blobUrls).forEach((fileName) => {
        const blobUrl = blobUrls[fileName];
        URL.revokeObjectURL(blobUrl);
      });
    };
  }, []);
  return (
    <Container className="home">
      <main className="home-body">
        <DropzoneArea
          clearOnUnmount
          filesLimit={1}
          onChange={handleChange}
          onDelete={handleDelete}
          inputProps={{
            multiple: false,
            accept: 'image/*',
          }}
      />
      </main>
    </Container>
  );
}

export default Home;

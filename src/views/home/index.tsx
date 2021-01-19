import React, { useCallback, useEffect, useRef } from 'react';
import Container from '@material-ui/core/Container';
import { DropzoneArea } from 'material-ui-dropzone';
import { useWasmImageMagick } from '../../hooks/useWasmImageMagick';

export function HomeView() {
  const blobUrlsRef = useRef<Record<string, string>>({});
  const { instance: Magick } = useWasmImageMagick();
  const handleDelete = useCallback((file: File) => {
    const blobUrls = blobUrlsRef.current;
    const blobUrl = blobUrls[file.name];
    if (blobUrl) {
      URL.revokeObjectURL(blobUrl);
      delete blobUrls[file.name];
    }
  }, []);
  const handleChange = useCallback(
    async (files: File[]) => {
      const [file] = files;
      if (!file || !Magick) return;
      const blobUrl = URL.createObjectURL(file);
      handleDelete(file);
      blobUrlsRef.current[file.name] = blobUrl;
      const magickFile = await Magick.buildInputFile(blobUrl, file.name);
      console.log(magickFile);
    },
    [handleDelete]
  );
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
    <Container>
      <main>
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
export default HomeView;

import type { MagickOutputFile } from 'wasm-imagemagick';

export interface HomeViewStates {
  inputFile: File | null;
  outputImage: MagickOutputFile | null;
}

export type HomeViewActions = {
  handleChange: (files: File[]) => void;
  handleDelete: (file: File) => void;
  setOutputImage: (outputImage: MagickOutputFile) => void;
};

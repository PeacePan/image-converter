import type Magick from 'wasm-imagemagick';
import { useEffect, useRef, useState } from 'react';
import useSafeState from '@restart/hooks/useSafeState';
import loadScript from '../utils/loadScript';

type MagickInstance = typeof Magick;

export const useWasmImageMagick = (): UseWasmImageMagickReturn => {
  const [loading, setLoading] = useSafeState(useState(false));
  const [instance, setInstance] = useSafeState(useState<MagickInstance | null>(null));
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const module = await loadScript<MagickInstance>({
          id: 'wasm-imagemagick-api',
          src: './static/js/magickApi.js',
          type: 'module',
        });
        if (module && 'IMWeight' in module) setInstance(module);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return { loading, instance };
};

export interface UseWasmImageMagickReturn {
  loading: boolean;
  instance: MagickInstance | null;
}

import { useEffect, useState } from 'react';

export const useBlobUrl = (blob: Blob | null | undefined) => {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  useEffect(() => {
    if (!blob) {
      setBlobUrl(null);
      return;
    }
    const url = URL.createObjectURL(blob);
    setBlobUrl(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [blob, setBlobUrl]);
  return blobUrl;
};

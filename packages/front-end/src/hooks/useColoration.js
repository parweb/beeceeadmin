import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { applyBrightness, applySaturation, applyContrast } from 'helpers';
import { useBrightness, useContrast, useSaturation, useEditorImg } from 'hooks';
import { $brightness, $contrast, $saturation } from 'state';

const useContext = canvas => {
  const [{ src, width, height, imageRef, currentImg }] = useEditorImg();

  const [context, setContext] = useState(null);

  useEffect(() => {
    if (canvas.current && imageRef?.current && width && height) {
      const _context = canvas.current.getContext('2d');

      canvas.current.width = width;
      canvas.current.height = height;

      _context.drawImage(imageRef.current, 0, 0);

      setContext(_context);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, currentImg, width, height]);

  return context;
};

const useColoration = canvas => {
  const context = useContext(canvas);

  useBrightness(canvas);
  useContrast(canvas);
  useSaturation(canvas);

  const [{ src, currentImg, imageRef }] = useEditorImg();

  const brightness = useRecoilValue($brightness);
  const contrast = useRecoilValue($contrast);
  const saturation = useRecoilValue($saturation);

  useEffect(() => {
    if (context && imageRef?.current) {
      context.drawImage(imageRef.current, 0, 0);
      const imageData = context.getImageData(
        0,
        0,
        canvas.current.width,
        canvas.current.height
      );

      const contrasted = applyContrast(imageData, contrast);
      const brightened = applyBrightness(contrasted, brightness);
      const saturated = applySaturation(brightened, saturation);

      context.putImageData(saturated, 0, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, currentImg, saturation, brightness, contrast]);
};

export default useColoration;

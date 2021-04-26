import { useRef } from 'react';

import { useColoration, useTransform, useFitParent } from 'hooks';

const useCanvas = () => {
  const canvas = useRef();

  useColoration(canvas);
  useTransform(canvas);
  useFitParent(canvas);

  return canvas;
};

export default useCanvas;

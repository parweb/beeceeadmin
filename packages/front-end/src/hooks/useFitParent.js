import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { $scale, $translate } from 'state';
import { useEditorImg } from 'hooks';

const getTranslate = (imageSize, parentSize) => {
  const scale = getScale(imageSize, parentSize);

  if (imageSize.width / imageSize.height < 0.71) {
    return scale
      ? {
          x: -(imageSize.width * (1 - scale)) / 2,
          y: -(imageSize.height * (1 - scale)) / 2
        }
      : {
          x: (parentSize.width - imageSize.width) / 2,
          y: 0
        };
  }

  return scale
    ? {
        x: -((imageSize.width - parentSize.width) / 2),
        y: -((imageSize.height - parentSize.height) / 2)
      }
    : {
        x: (parentSize.width - imageSize.width) / 2,
        y: 0
      };
};

const getScale = (imageSize, parentSize) => {
  if (
    imageSize.width < parentSize.width &&
    imageSize.height < parentSize.height
  ) {
    return null;
  }

  if (imageSize.width / imageSize.height < 0.71) {
    return imageSize.width < parentSize.width &&
      imageSize.height < parentSize.height
      ? null
      : parentSize.width / imageSize.width;
  }

  let scale = 0;
  if (imageSize.width < imageSize.height) {
    scale = parentSize.height / imageSize.height;

    if (scale * imageSize.width > parentSize.width) {
      scale *= parentSize.width / (scale * imageSize.width);
    }
  } else if (imageSize.width > imageSize.height) {
    scale = parentSize.width / imageSize.width;

    if (scale * imageSize.height > parentSize.height) {
      scale *= parentSize.height / (scale * imageSize.height);
    }
  }

  return scale;
};

const useFitParent = canvas => {
  const [canvasReady, setCanvasReady] = useState(false);
  const [flag, setFlag] = useState(false);
  const setScale = useSetRecoilState($scale);
  const setTranslate = useSetRecoilState($translate);

  const [imageSize] = useEditorImg();

  useEffect(() => {
    setCanvasReady(false);
    if (flag === true) {
      setFlag(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageSize.src, imageSize.currentImg]);

  useEffect(() => {
    if (canvasReady === false && imageSize.width && imageSize.height) {
      const interval = setInterval(() => {
        if (
          canvas.current.width === imageSize.width &&
          canvas.current.height === imageSize.height
        ) {
          setCanvasReady(true);
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, [
    canvasReady,
    imageSize.isLoading,
    imageSize.width,
    imageSize.height,
    canvas
  ]);

  useEffect(() => {
    if (flag === false && canvasReady) {
      const parentSize = canvas.current.parentElement.parentElement.parentElement.getBoundingClientRect();
      const imgSize = canvas.current;

      const scale = getScale(imgSize, parentSize);
      const translate = getTranslate(imgSize, parentSize);

      if (scale) {
        setScale(scale);
      }

      setTranslate(translate);

      setFlag(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasReady, flag]);

  useEffect(() => {
    if (canvasReady === true) {
      canvas.current.classList.add('canvas-ready');
    } else {
      canvas.current.classList.remove('canvas-ready');
    }
  }, [canvasReady, canvas]);
};

export default useFitParent;

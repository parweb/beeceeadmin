import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import {
  scale as __scale,
  rotate as __rotate,
  translate as __translate,
  compose,
  toCSS
} from 'transformation-matrix';

import { useEditorImg, useScale, useTranslate, useRotate } from 'hooks';
import { $scale, $translate, $rotate } from 'state';

const deg2rad = degrees => degrees * (Math.PI / 180);

const useTransform = canvas => {
  useScale(canvas);
  useRotate(canvas);
  useTranslate(canvas);

  const [{ src }] = useEditorImg();

  const scale = useRecoilValue($scale);
  const translate = useRecoilValue($translate);
  const rotate = useRecoilValue($rotate);

  useEffect(() => {
    if (canvas.current) {
      const deg = parseInt(rotate);
      const value = parseFloat(scale);

      let _transform = toCSS(
        compose(
          __translate(translate.x, translate.y),
          __rotate(deg2rad(deg)),
          __scale(value, value)
        )
      );

      const container = canvas.current;

      container.style.webkitTransform = _transform;
      container.style.mozTransform = _transform;
      container.style.msTransform = _transform;
      container.style.oTransform = _transform;
      container.style.transform = _transform;
    }
  }, [canvas, scale, translate.x, translate.y, rotate, src]);
};

export default useTransform;

import { useEffect } from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import { useMouseMove, useEditorImg } from 'hooks';
import { $translate } from 'state';

const useTranslate = canvas => {
  const resetTranslate = useResetRecoilState($translate);
  const setTranslate = useSetRecoilState($translate);
  const [{ currentImg, src }] = useEditorImg();

  useEffect(() => {
    resetTranslate();
  }, [currentImg, resetTranslate]);

  const { x, y } = useMouseMove(canvas.current?.parentElement?.parentElement, [
    src,
    currentImg
  ]);

  useEffect(() => {
    setTranslate(prev => ({ x: prev.x + x, y: prev.y + y }));
  }, [x, y, currentImg, src, setTranslate]);
};

export default useTranslate;

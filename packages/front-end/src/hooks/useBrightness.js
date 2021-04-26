import { useEffect } from 'react';
import { useResetRecoilState } from 'recoil';

import { useEditorImg } from 'hooks';
import { $brightness } from 'state';

const useBrightness = () => {
  const resetBrightness = useResetRecoilState($brightness);
  const [{ currentImg }] = useEditorImg();

  useEffect(() => {
    resetBrightness();
  }, [currentImg, resetBrightness]);
};

export default useBrightness;

import { useEffect } from 'react';
import { useResetRecoilState } from 'recoil';

import { useEditorImg } from 'hooks';
import { $saturation } from 'state';

const useSaturation = () => {
  const resetSaturation = useResetRecoilState($saturation);
  const [{ currentImg }] = useEditorImg();

  useEffect(() => {
    resetSaturation();
  }, [currentImg, resetSaturation]);
};

export default useSaturation;

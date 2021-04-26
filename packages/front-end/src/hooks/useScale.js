import { useEffect } from 'react';
import { useResetRecoilState } from 'recoil';

import { useEditorImg } from 'hooks';
import { $scale } from 'state';

const useScale = canvas => {
  const resetScale = useResetRecoilState($scale);
  const [{ currentImg }] = useEditorImg();

  useEffect(() => {
    resetScale();
  }, [currentImg, resetScale]);
};

export default useScale;

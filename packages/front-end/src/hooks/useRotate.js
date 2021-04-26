import { useEffect } from 'react';
import { useResetRecoilState } from 'recoil';

import { useEditorImg } from 'hooks';
import { $rotate } from 'state';

const useRotate = () => {
  const resetRotate = useResetRecoilState($rotate);
  const [{ currentImg }] = useEditorImg();

  useEffect(() => {
    resetRotate();
  }, [currentImg, resetRotate]);
};

export default useRotate;

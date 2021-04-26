import { useEffect } from 'react';
import { useResetRecoilState } from 'recoil';

import { useEditorImg } from 'hooks';
import { $contrast } from 'state';

const useContrast = () => {
  const resetContrast = useResetRecoilState($contrast);
  const [{ currentImg }] = useEditorImg();

  useEffect(() => {
    resetContrast();
  }, [currentImg, resetContrast]);
};

export default useContrast;

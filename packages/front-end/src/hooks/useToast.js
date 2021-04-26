import { useSetRecoilState } from 'recoil';
import md5 from 'md5';

import { $toasts } from 'state';

const useToast = () => {
  const setToasts = useSetRecoilState($toasts);

  const addToast = toast => {
    const id = md5(JSON.stringify(toast));
    setToasts(state =>
      !state.find(prev => prev.id === id) ? [...state, { ...toast, id }] : state
    );
  };

  const removeToast = () => {
    setToasts(([first, ...rest]) => rest);
  };

  return { addToast, removeToast };
};

export default useToast;

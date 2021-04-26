import { useEffect, useState } from 'react';

const useInIframe = () => {
  const [bool, setBool] = useState(false);

  useEffect(() => {
    if (window.location !== window.parent.location) {
      setBool(true);
    } else {
      setBool(false);
    }
  }, []);

  return bool;
};

export default useInIframe;

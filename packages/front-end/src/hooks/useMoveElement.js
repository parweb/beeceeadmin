import { useState, useEffect } from 'react';

const useMoveElement = (ref, src) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (ref) {
      const handle = () => {
        setActive(true);
      };

      ref.addEventListener('mousedown', handle);
      return () => ref.removeEventListener('mousedown', handle);
    }
  }, [ref, src]);

  useEffect(() => {
    if (ref) {
      const handle = () => {
        setActive(false);
      };

      ref.addEventListener('mouseup', handle);
      return () => ref.removeEventListener('mouseup', handle);
    }
  }, [ref, src]);

  return active;
};

export default useMoveElement;

import { useState, useEffect } from 'react';

import { useMoveElement } from 'hooks';

const useMouseMove = (ref, src) => {
  const active = useMoveElement(ref, src);

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    if (active && ref) {
      const handle = ({ movementX, movementY }) => {
        setX(movementX);
        setY(movementY);
      };

      ref.addEventListener('mousemove', handle);
      return () => ref.removeEventListener('mousemove', handle);
    }
  }, [active, ref, src]);

  return { x, y };
};

export default useMouseMove;

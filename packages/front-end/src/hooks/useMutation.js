import { useState } from 'react';
import { useRecoilCallback } from 'recoil';

const useMutation = callback => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const setter = useRecoilCallback(props => async data => {
    setError(null);
    setLoading(true);

    try {
      await callback(props, data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  });

  return [setter, { error, loading }];
};

export default useMutation;

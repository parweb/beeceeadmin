import { Suspense, lazy } from 'react';

import { Spinner } from 'layout';
import { useParams } from 'hooks';

const sections = {
  clients: lazy(() => import('./client/Client'))
};

const BcasignHome = () => {
  const { section } = useParams();
  const Component = sections[section];

  return (
    <Suspense fallback={<Spinner />}>
      <Component />
    </Suspense>
  );
};

export default BcasignHome;

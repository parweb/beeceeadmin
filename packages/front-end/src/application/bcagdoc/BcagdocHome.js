import { lazy, Suspense } from 'react';

import { useParams } from 'hooks';
import { Spinner } from 'layout';

const sections = {
  courriers: lazy(() => import('./courrier/CourrierList')),
  extensions: lazy(() => import('./group/GroupList'))
};

const BcagdocHome = () => {
  const { section } = useParams();
  const Component = sections[section];

  return (
    <Suspense fallback={<Spinner />}>
      <Component />
    </Suspense>
  );
};

export default BcagdocHome;

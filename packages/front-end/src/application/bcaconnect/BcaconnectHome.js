import { Suspense, lazy } from 'react';

import { Spinner } from 'layout';
import { useParams } from 'hooks';

const sections = {
  users: lazy(() => import('./user/UserList')),
  roles: lazy(() => import('./role/RoleList')),
  permissions: lazy(() => import('./permission/PermissionList'))
};

const BcaconnectHome = () => {
  const { section } = useParams();
  const Component = sections[section];

  return (
    <Suspense fallback={<Spinner />}>
      <Component />
    </Suspense>
  );
};

export default BcaconnectHome;

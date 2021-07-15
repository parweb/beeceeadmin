import { useRecoilValue } from 'recoil';

import { $auth, $user } from 'states';

const useAccess = () => {
  const auth = useRecoilValue($auth);
  const user = useRecoilValue($user.read(auth.id));

  return operation => {
    if (auth?.isAuthenticated === false) return false;

    const [subject, action] = operation.split('.');

    const userAccess = user?.permissions?.find(
      permission =>
        permission.permission.subject === subject &&
        permission.permission.action === action
    );

    if (userAccess) {
      return userAccess.state;
    }

    const roleAccess = user?.role?.permissions?.find(
      permission =>
        permission.permission.subject === subject &&
        permission.permission.action === action
    );

    if (roleAccess) {
      return roleAccess.state;
    }

    return false;
  };
};

export default useAccess;

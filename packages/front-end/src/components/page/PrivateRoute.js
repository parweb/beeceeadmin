import { useRecoilValue } from 'recoil';
import { Route, Redirect } from 'react-router-dom';

import { $user } from 'state';

const PrivateRoute = ({ children, ...rest }) => {
  const { isAuthenticated } = useRecoilValue($user);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;

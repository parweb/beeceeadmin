import { useRecoilValue } from 'recoil';
import { Route, Redirect } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import { $user } from 'states';

const PrivateRoute = ({ children, ...rest }) => {
  let { isAuthenticated, token } = useRecoilValue($user);

  if (isAuthenticated === true) {
    const jwt = jwtDecode(token);
    const now = new Date();
    const expiration = new Date(jwt.exp * 1000);

    if (expiration.getTime() < now.getTime()) {
      isAuthenticated = false;
    }
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{ pathname: '/auth/login', state: { from: location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;

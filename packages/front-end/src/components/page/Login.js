import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { Input, Button, Spinner } from '@salesforce/design-system-react';
import { useHistory, useLocation } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import { $user } from 'state';
import { loginAuth } from 'services/auth';

const Login = () => {
  const [error, setError] = useState(null);
  const setUser = useSetRecoilState($user);

  const history = useHistory();
  const location = useLocation();
  const [displaySpinner, setDisplaySpinner] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm();

  const onSubmit = async ({ username, password }) => {
    try {
      setDisplaySpinner(true);
      const { accessToken } = await loginAuth({ username, password }).then(
        data => {
          setDisplaySpinner(false);
          return data;
        }
      );

      jwtDecode(accessToken);

      setUser({ isAuthenticated: true, username, password });

      const { from } = location.state || { from: { pathname: '/' } };
      history.replace(from);
    } catch (e) {
      setDisplaySpinner(false);
      setUser({ isAuthenticated: false });
      setError(
        e?.response?.data?.message ??
          'Une erreur est survenue veuillez réessayer'
      );
    }
  };

  const registerUsername = register('username', {
    required: { value: true, message: 'Ce champs est obligatoire' }
  });

  const registerPassword = register('password', {
    required: { value: true, message: 'Ce champs est obligatoire' }
  });

  return (
    <div
      style={{
        margin: '30px auto',
        padding: '50px',
        width: '400px',
        marginTop: '80px',
        background: '#fff'
      }}
      data-testid="location-display"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <center>{error}</center>
        {displaySpinner && (
          <Spinner
            style={{ position: 'inherit !important' }}
            size="small"
            variant="base"
            assistiveText={{ label: 'Recherche en cours' }}
          />
        )}

        <Input
          inputRef={registerUsername.ref}
          name={registerUsername.name}
          onBlur={registerUsername.onBlur}
          onChange={registerUsername.onChange}
          label="Nom d'utilisateur"
          placeholder="Nom d'utilisateur"
          errorText={errors?.username?.message}
        />

        <Input
          inputRef={registerPassword.ref}
          name={registerPassword.name}
          onBlur={registerPassword.onBlur}
          onChange={registerPassword.onChange}
          type="password"
          label="Mot de passe"
          placeholder="Mot de passe"
          errorText={errors?.password?.message}
        />

        <Button
          type="submit"
          label="Se connecter"
          variant="brand"
          style={{ marginTop: '20px', width: '100%' }}
        />
      </form>
    </div>
  );
};

export default Login;

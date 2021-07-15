import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { useHistory } from 'react-router-dom';
import { Spinner } from '@chakra-ui/spinner';

import { $auth } from 'states';
// import { useMutation } from 'hooks';
import { loginAuth } from 'services';
import { Input, Button } from 'layout';

const Login = () => {
  const [error, setError] = useState(null);
  const setAuth = useSetRecoilState($auth);
  const history = useHistory();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm();

  const onSubmit = async ({ username, password }) => {
    try {
      const response = await loginAuth({
        username,
        password
      });

      setAuth({ isAuthenticated: true, ...response });

      history.push('/');
    } catch (e) {
      setAuth({ isAuthenticated: false });
      setError(
        e?.response?.data?.message ??
          'Identifiant / Mot de passe est incorrecte'
      );
    }
  };

  return (
    <div style={{ margin: '50px auto', width: '400px' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <center style={{ color: 'red' }}>{error}</center>

        <div>
          <div>
            <label htmlFor="username">Identifiant</label>
            <Input
              id="username"
              {...register('username', {
                required: {
                  value: true,
                  message: 'Ce champs est obligatoire'
                }
              })}
              label="Nom d'utilisateur"
              placeholder="Votre identifiant"
              errorText={errors?.username?.message}
            />
          </div>

          <div>
            <label htmlFor="password">Mot de passe</label>

            <Input
              id="password"
              {...register('password', {
                required: {
                  value: true,
                  message: 'Ce champs est obligatoire'
                }
              })}
              type="password"
              label="Mot de passe"
              placeholder="Mot de passe"
              errorText={errors?.password?.message}
            />
          </div>
        </div>

        <Button type="submit" rightIcon={isSubmitting && <Spinner />}>
          Se connecter
        </Button>
      </form>
    </div>
  );
};

export default Login;

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Link, useHistory /*, useLocation*/ } from 'react-router-dom';
// import { useToast } from '@chakra-ui/toast';

import { Button, Input } from 'layout';
// import changePassword from 'services/auth/changePassword';

const StyledTitle = styled.h1`
  color: #0b519f;
  line-height: 2.5rem;
  margin-top: 30px;
  font-size: 2.375rem;
  font-weight: bold;
`;

const StyledBlock = styled.div`
  text-align: center;
  padding-bottom: 1.25em;
`;

const ErrorField = styled.p`
  color: ${({ color } = 'red') => color};
`;

const ChangePassword = () => {
  const submitRef = useRef();
  const [error, setError] = useState(null);

  const {
    register,
    formState: { errors, touchedFields },
    handleSubmit,
    watch
  } = useForm({
    criteriaMode: 'all',
    mode: 'onChange'
  });

  // const location = useLocation();

  // const token = decodeURIComponent(
  //   location?.search?.slice(
  //     location?.search?.indexOf('=') + 1,
  //     location?.search?.indexOf('%3')
  //   )
  // );
  // const toast = useToast();
  const history = useHistory();

  useEffect(() => {
    submitRef.current.click();
  }, []);

  const onSubmit = async ({ password, passwordConfirmation }) => {
    try {
      // await changePassword({
      //   password,
      //   passwordConfirmation,
      //   token
      // }).then(data => {
      //   toast({
      //     title: 'Modification de mot de passe',
      //     position: 'top-right',
      //     description: 'Mot de passe a été changé avec succès',
      //     status: 'success',
      //     color: 'yellow',
      //     duration: 9000,
      //     isClosable: true
      //   });
      // });

      history.push('/auth/login');
    } catch (e) {
      setError(e?.response?.data?.message ?? 'Une erreur est survenue');
    }
  };

  return (
    <>
      <StyledBlock>
        <StyledTitle>Modifier votre mot de passe</StyledTitle>
      </StyledBlock>

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
          <center style={{ color: 'red' }}>{error}</center>

          <Input
            name="password"
            type="password"
            {...register('password', {
              validate: {
                minLength: value =>
                  value?.length > 8 || '8 charactères minimum',
                lowerCase: value =>
                  /.*[a-z]+.*/.test(value) || '1 lettre miniscule minimum',
                upperCase: value =>
                  /.*[A-Z]+.*/.test(value) || '1 lettre majuscule minimum',
                specialCharacter: value =>
                  /.*[!@#$%^&*)(+=._-]+.*/.test(value) ||
                  '1 charactère spécial minimum'
              }
            })}
            placeholder="Nouveau mot de passe"
            variant="no-margin"
          />

          {Object.entries(errors?.password?.types ?? {}).map(
            ([type, message]) => (
              <ErrorField
                color={!touchedFields?.password ? '#bbb' : 'red'}
                key={`ErrorField-${type}`}
              >
                {message}
              </ErrorField>
            )
          )}

          <Input
            name="passwordConfirmation"
            type="password"
            {...register('passwordConfirmation', {
              validate: value =>
                value === watch('password') ||
                'Les mots de passe ne sont pas identiques',
              required: 'Mot de passe est obligatoire'
            })}
            onPaste={e => e.preventDefault()}
            placeholder="Confirmer votre mot de passe"
            errorText={
              touchedFields?.passwordConfirmation &&
              errors?.passwordConfirmation?.message
            }
          />

          <StyledBlock>
            <Button ref={submitRef} type="submit">
              Valider
            </Button>
          </StyledBlock>
        </form>
      </div>

      <StyledBlock>
        <Link style={{ color: '#2800a0' }} to="/auth/login">
          Retour à la page de connexion
        </Link>
      </StyledBlock>
    </>
  );
};

export default ChangePassword;

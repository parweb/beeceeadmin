import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
// import { useToast } from '@chakra-ui/toast';

import { Button, Input } from 'layout';
// import { forgetPassword } from 'services/auth';

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
  clear: left;
`;

const ForgotPassword = () => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm();

  // const toast = useToast();
  const [display /*, setDisplay*/] = useState(false);

  const onSubmit = async ({ email }) => {
    // await forgetPassword({ email }).then(data => {
    //   setDisplay(true);
    //   toast({
    //     title: 'Envoyer un email',
    //     position: 'top-right',
    //     description: 'Email a été envoyé avec succès',
    //     status: 'success',
    //     color: 'yellow',
    //     duration: 9000,
    //     isClosable: true
    //   });
    // });
  };

  return (
    <>
      <StyledBlock>
        <StyledTitle>Réinitialiser votre mot de passe</StyledTitle>
      </StyledBlock>
      <StyledBlock>
        <p>
          Saisissez votre adresse e-mail et vous recevrez en quelques minutes un
          lien qui vous permettra de choisir un nouveau mot de passe.
        </p>
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
        {!display && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register('email', {
                required: {
                  value: true,
                  message: 'Ce champs est obligatoire'
                }
              })}
              name="email"
              placeholder="Adresse e-mail"
              errorText={errors?.email?.message}
            />
            <StyledBlock>
              <Button type="submit">Envoyer un e-mail</Button>
            </StyledBlock>
          </form>
        )}
        <StyledBlock> {display && <div>Email a été envoyé </div>}</StyledBlock>
      </div>

      <StyledBlock>
        <Link style={{ color: '#2800a0' }} to="/auth/login">
          Retour à la page de connexion
        </Link>
      </StyledBlock>
    </>
  );
};

export default ForgotPassword;

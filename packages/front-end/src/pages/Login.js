import { useState } from 'react';
import { useForm } from 'react-hook-form';
// import { useSetRecoilState } from 'recoil';
import { useHistory, Link } from 'react-router-dom';
import styled from 'styled-components';
import useMedia from 'use-media';
import { Box } from '@chakra-ui/layout';
import { CgProfile } from 'react-icons/cg';
import { Spinner } from '@chakra-ui/spinner';

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel
} from '@chakra-ui/accordion';

// import { $user } from 'states';
// import { loginAuth } from 'services';
import { Input, Button } from 'layout';

const StyledBlock = styled.div`
  padding-bottom: 1.25em;
  margin: 0.625em 0;
  clear: left;
`;

const StyledDiv = styled.div`
  padding-right: 0.5em;
  padding-left: 0.5em;
  background-color: #44c0ff;
`;

const StyledIcon = styled(CgProfile)`
  font-size: 40px;
  color: white;
  top: calc(50% - 20px);
  position: relative;
`;

const StyledLink = styled(Link)`
  text-decoration: underline;
  background: none;
  margin: 0;
  padding: 0;
  border: 0;
  cursor: pointer;
  color: #2800a0;
  text-align: left;
  font-weight: bold;
`;

const StyledBox = styled(Box)`
  display: flex;
  margin: 1.875em 0;
`;

const StyledBlockText = styled.div`
  width: 100%;
  background: #fff;
  border: 1px solid #ccc;
  border-left: 0;
  color: #444;
  padding: 0.875em 1.5625em 0.9375em;
`;

const StyledTitle = styled.h1`
  margin-top: 30px;
  margin-bottom: 10px;
  font-size: 2.25em;
  letter-spacing: -0.002778em;
  line-height: 1.2778em;
  color: #5c596d;
`;

const StyledAhref = styled.a`
  border-bottom: 1px solid #ccc;
  color: #004fb6;
  font-weight: 700;
  padding-bottom: 1px;
  text-decoration: none;
`;

const StyledLeftBlock = styled.div`
  width: calc(66.667% - 1.875em);
`;

const StyledRightBlock = styled.div`
  width: calc(33.333% - 1.875em);
`;

const StyledGroup = styled(Box)`
  display: flex;
`;

const StyledSecondTitle = styled.h2`
  font-size: 1.75em;
  letter-spacing: -0.003571em;
  line-height: 1.2857;
  color: #5c596d;
`;

const StyledAccordionIcon = styled(AccordionIcon)`
  height: 1.5em !important;
  left: -1.75em !important;
  margin-right: 0.5em !important;
  width: 0.875em !important;
  font-size: 30px !important;
  color: #004fb6 !important;
`;

const StyledBlueLink = styled.a`
  border-bottom: 1px solid #004fb6;
  color: #004fb6;
  font-weight: 700;
  padding-bottom: 1px;
`;

const Login = () => {
  const [error, setError] = useState(null);

  // const setUser = useSetRecoilState($user);
  const setUser = () => {};
  const isSmall = useMedia({ maxWidth: '992px' });

  const history = useHistory();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm();

  const onSubmit = async ({ username, password }) => {
    try {
      // const response = await loginAuth({
      //   username,
      //   password
      // });

      // setUser({ isAuthenticated: true, ...response });

      history.push('/');
    } catch (e) {
      setUser({ isAuthenticated: false });
      setError(
        e?.response?.data?.message ??
          'Identifiant / Mot de passe est incorrecte'
      );
    }
  };

  return (
    <>
      <div style={{ padding: '0 1.875em' }}>
        <StyledTitle>Bienvenue sur votre espace BCA</StyledTitle>

        <StyledGroup style={{ display: isSmall && 'block' }}>
          <StyledLeftBlock style={{ width: isSmall && '100%' }}>
            <div style={{ width: isSmall ? '100%' : '80%' }}>
              <StyledBox>
                <StyledDiv>
                  <StyledIcon />
                </StyledDiv>

                <StyledBlockText>
                  <p>
                    Vous n’avez pas d’identifiant et de mot de passe provisoire
                    ?
                  </p>
                  <StyledAhref href="#">Inscrivez-vous</StyledAhref> simplement
                  avec votre numéro de téléphone.
                </StyledBlockText>
              </StyledBox>

              <form onSubmit={handleSubmit(onSubmit)}>
                <center style={{ color: 'red' }}>{error}</center>
                <label>Identifiant</label>

                <StyledBlock>
                  <strong>
                    <StyledLink to="">Identifiant oublié ?</StyledLink>
                  </strong>
                </StyledBlock>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Input
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

                  <label>Mot de passe</label>

                  <StyledBlock>
                    <p>
                      <StyledLink to="/auth/password/forgot">
                        Mot de passe oublié ?
                      </StyledLink>
                    </p>
                  </StyledBlock>

                  <Input
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

                <Button type="submit" rightIcon={isSubmitting && <Spinner />}>
                  Se connecter
                </Button>
              </form>
            </div>
          </StyledLeftBlock>

          <StyledRightBlock
            style={{
              width: isSmall && '100%',
              margin: isSmall && '1.875em 0 0'
            }}
          >
            <StyledSecondTitle>Besoin d'aide ?</StyledSecondTitle>

            <Accordion allowToggle borderColor="transparent">
              <AccordionItem>
                <h2>
                  <AccordionButton paddingLeft="0px">
                    <StyledAccordionIcon />
                    <Box flex="1" textAlign="left">
                      <StyledBlueLink href="#">
                        Suis-je sur le bon espace personnel ?
                      </StyledBlueLink>
                    </Box>
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}></AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton paddingLeft="0px">
                    <StyledAccordionIcon />
                    <Box flex="1" textAlign="left">
                      <StyledBlueLink href="#">
                        Que faire si j’ai plusieurs numéros de contrat ?
                      </StyledBlueLink>
                    </Box>
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}></AccordionPanel>
              </AccordionItem>
            </Accordion>

            <p>
              Pour plus de questions, rendez-vous sur notre FAQ.
              <br />
              Ou contactez-nous au : <br />
              0 805 200 512S <br />
              Du lundi au vendredi de 8h45 à 19h00.
              <br /> De 9h00 à 13h00 puis de 14h00 à 17h00 le samedi.
            </p>
          </StyledRightBlock>
        </StyledGroup>
      </div>
    </>
  );
};

export default Login;

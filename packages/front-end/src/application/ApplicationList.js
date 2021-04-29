import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon
} from '@chakra-ui/react';

const Link = styled(NavLink)`
  transition: all 1s ease;
  display: flex;
  gap: 10px;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;

  padding: 5px 10px;
  text-decoration: none;
  color: grey;
  transition: all 1s ease;

  &::before {
    content: '';

    display: block;
    background-color: transparent;
    width: 4px;
    height: 4px;
    border-radius: 50%;
  }

  &.active {
    color: black;
    text-decoration: none;

    &::before {
      background-color: black;
    }
  }
`;

const ApplicationList = () => {
  const { pathname } = useLocation();

  const index = pathname.includes('bcagdoc')
    ? 0
    : pathname.includes('bcasign')
    ? 1
    : pathname.includes('bcaconnect')
    ? 2
    : null;

  return (
    <>
      <Accordion defaultIndex={index}>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                BCAGDOC
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <ul>
              <li>
                <Link to={`/application/bcagdoc/extensions/`}>
                  Règles extensions
                </Link>
              </li>
              <li>
                <Link to={`/application/bcagdoc/courriers/`}>
                  Codes courriers
                </Link>
              </li>
            </ul>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                BCASIGN
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <ul>
              <li>
                <Link to={`/application/bcasign/clients/`}>Clients</Link>
              </li>
            </ul>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                BCACONNECT
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <ul>
              <li>
                <Link to={`/application/bcaconnect/roles/`}>Roles</Link>
              </li>
              <li>
                <Link to={`/application/bcaconnect/users/`}>Utilisateurs</Link>
              </li>
            </ul>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default ApplicationList;

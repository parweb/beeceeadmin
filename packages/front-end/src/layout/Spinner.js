import styled from 'styled-components';
import { Spinner as SpinnerUi } from '@chakra-ui/spinner';

const Container = styled.div`
  padding: 20px;
  position: relative;
  inset: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Spinner = () => {
  return (
    <Container>
      <SpinnerUi />
    </Container>
  );
};

export default Spinner;

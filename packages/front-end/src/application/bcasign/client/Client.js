import { Suspense } from 'react';
import styled from 'styled-components';

import { Grid, Sidebar, Main } from 'layout';
import { BcasignClientList, BcasignClientEditor } from 'application';

const Container = styled.div`
  background-color: #eee;
`;

const Client = () => {
  return (
    <Container>
      <Grid rows="1fr" columns="200px 1fr" style={{ height: '100vh' }}>
        <Sidebar>
          <Suspense fallback={<div>chargement</div>}>
            <BcasignClientList />
          </Suspense>
        </Sidebar>

        <Main>
          <Suspense fallback={<div>chargement</div>}>
            <BcasignClientEditor />
          </Suspense>
        </Main>
      </Grid>
    </Container>
  );
};

export default Client;

import { Suspense } from 'react';
import styled from 'styled-components';

import { Grid, Sidebar, Main } from 'layout';
import { BcasignClientList, BcasignClientEditor } from 'application';
import { useAccess } from 'hooks';

const Container = styled.div`
  background-color: #eee;
`;

const Client = () => {
  const can = useAccess();

  return (
    <Container>
      <Grid rows="1fr" columns="200px 1fr" style={{ height: '100vh' }}>
        <Sidebar>
          <Suspense fallback={<div>chargement</div>}>
            {can('client.view') && <BcasignClientList />}
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

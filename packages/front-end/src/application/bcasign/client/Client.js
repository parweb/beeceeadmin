import { Suspense } from 'react';
import { useRecoilValue } from 'recoil';

import styled from 'styled-components';

import { Grid, Sidebar, Main } from 'layout';
import { BcasignClientList, BcasignClientEditor } from 'application';
import { $environnement } from 'states';

const Container = styled.div`
  background-color: #eee;
`;

const Client = () => {
  const environnementId = useRecoilValue($environnement.selected);
  const environnement = useRecoilValue($environnement.read(environnementId));

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
            <pre>{JSON.stringify({ environnement }, null, 2)}</pre>
            <BcasignClientEditor />
          </Suspense>
        </Main>
      </Grid>
    </Container>
  );
};

export default Client;

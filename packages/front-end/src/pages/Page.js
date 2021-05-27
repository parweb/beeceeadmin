import { Suspense } from 'react';
// import { Box } from '@chakra-ui/react';
import styled from 'styled-components';

import { Toast, Modal, ModalConfirmation, Grid, Sidebar, Main } from 'layout';
import { ApplicationList } from 'application';

const Container = styled.div`
  background-color: #eee;
`;

const Page = ({ children }) => {
  return (
    <div>
      <div style={{ minHeight: 'calc(100vh - 63px)' }}>
        <Toast />

        <Container>
          <Grid rows="1fr" columns="200px 1fr" style={{ height: '100vh' }}>
            <Sidebar>
              <Suspense fallback={<div>chargement</div>}>
                <ApplicationList />
              </Suspense>
            </Sidebar>

            <Main>
              <Suspense fallback={<div>chargement</div>}>{children}</Suspense>
            </Main>
          </Grid>
        </Container>

        <Modal key="modal-primary" />
        <ModalConfirmation key="modal-secondary" />
      </div>
    </div>
  );
};

export default Page;

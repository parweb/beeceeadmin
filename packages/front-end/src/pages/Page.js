import { Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { Toast, Modal, ModalConfirmation, Grid, Sidebar, Main } from 'layout';
import { ApplicationList } from 'application';

const Container = styled.div`
  background-color: #eee;
`;

const noSidebarPages = ['/auth/login'];

const Page = ({ children }) => {
  const location = useLocation();

  return (
    <div>
      <div style={{ minHeight: 'calc(100vh - 63px)' }}>
        <Toast />

        <Container>
          {noSidebarPages.includes(location.pathname) ? (
            <Grid rows="1fr" columns="1fr" style={{ height: '100vh' }}>
              <Main>
                <Suspense fallback={<div>chargement</div>}>{children}</Suspense>
              </Main>
            </Grid>
          ) : (
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
          )}
        </Container>

        <Modal key="modal-primary" />
        <ModalConfirmation key="modal-secondary" />
      </div>
    </div>
  );
};

export default Page;

import { Suspense } from 'react';
// import { Box } from '@chakra-ui/react';
import styled from 'styled-components';

import {
  // Toast,
  Modal,
  ModalConfirmation,
  // Header,
  // Footer,
  Grid,
  Sidebar,
  Main
} from 'layout';
import { ApplicationList } from 'application';

const Container = styled.div`
  background-color: #eee;
`;

const Page = ({ children }) => {
  return (
    <div>
      <div style={{ minHeight: 'calc(100vh - 63px)' }}>
        {/*<Toast />*/}

        {/*<Header />*/}

        {/*<Box m={2}>{children}</Box>*/}
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

      {/*<Footer />*/}
    </div>
  );
};

export default Page;

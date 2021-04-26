import { Grid, Modal, ModalConfirmation, Toast } from 'components/layout';
import Menu from './Menu';

const Page = ({ children }) => {
  return (
    <div>
      <Toast />

      <div style={{ backgroundColor: '#eee' }}>
        <Grid rows="1fr" columns="200px 1fr" style={{ height: '100vh' }}>
          <div
            style={{
              backgroundColor: '#fff',
              borderRightColor: '#ccc',
              borderRightStyle: 'solid',
              borderRightWidth: '1px'
            }}
          >
            <Menu />
          </div>
          <div style={{ height: '100vh', overflowY: 'auto' }}>{children}</div>
        </Grid>
      </div>

      <Modal key="modal-primary" />
      <ModalConfirmation key="modal-secondary" />
    </div>
  );
};

export default Page;

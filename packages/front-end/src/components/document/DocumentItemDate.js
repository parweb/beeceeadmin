import { format } from 'date-fns';
import { Scrollbars } from 'react-custom-scrollbars';

import { useDocument } from 'hooks';
import { Grid } from 'components/layout';

const DocumentItemDate = ({ idDocNum }) => {
  const { dateCreation } = useDocument(idDocNum);

  return (
    <Grid
      rows="1fr"
      columns="40px auto"
      gap="2px"
      style={{
        padding: '5px',
        borderBottom: '1px solid #dddbda',
        maxWidth: '100%'
      }}
    >
      <div>Date</div>

      <Scrollbars autoHide>
        <div style={{ whiteSpace: 'nowrap' }}>
          {format(new Date(dateCreation), 'dd/MM/yyyy')}
        </div>
      </Scrollbars>
    </Grid>
  );
};

export default DocumentItemDate;

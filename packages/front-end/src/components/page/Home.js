import { useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Button } from '@salesforce/design-system-react';

import { useInIframe } from 'hooks';
import { DocumentError } from 'components/document';

const Home = () => {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (location?.search?.startsWith('?numMission=')) {
      history.push('/mission/' + location?.search?.split('?numMission=')[1]);
    }
  }, [history, location]);

  const inIframe = useInIframe();

  if (inIframe) {
    return (
      <div style={{ background: '#fff', margin: '20px' }}>
        <DocumentError />
      </div>
    );
  }

  return (
    <div
      style={{
        margin: '30px',
        padding: '50px',
        marginTop: '80px',
        background: '#fff'
      }}
    >
      <Link to="/documents">
        <Button
          iconCategory="standard"
          iconName="case"
          iconSize="large"
          inverse
          variant="icon"
          label="Documents"
          style={{
            backgroundColor: '#16325c',
            padding: '10px'
          }}
        />
      </Link>
    </div>
  );
};

export default Home;

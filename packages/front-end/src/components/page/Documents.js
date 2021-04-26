import { useState, Component } from 'react';
import { useSetRecoilState } from 'recoil';
import { Input, InputIcon } from '@salesforce/design-system-react';

import { DocumentCarousel } from 'components/document';
import { $mission } from 'state';

import 'components/document/Documents.css';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <h1>{this.state.error.message}</h1>
        </div>
      );
    }

    return this.props.children;
  }
}

const Document = () => {
  const [mission, setMission] = useState('');
  const setId = useSetRecoilState($mission);

  return (
    <div
      style={{
        margin: '30px',
        marginTop: '80px',
        padding: '10px',
        background: '#fff'
      }}
    >
      <ErrorBoundary>
        <Input
          id="input-search"
          label="numéro de mission: 96831564, 87987049"
          iconRight={
            <InputIcon
              data-testid="InputIcon"
              assistiveText={{
                icon: 'Search'
              }}
              name="search"
              category="utility"
              onClick={() => {
                setId(mission);
              }}
            />
          }
          name="mission"
          value={mission}
          onKeyDown={e => e.key === 'Enter' && setId(mission)}
          onChange={e => setMission(e.target.value)}
        />

        <br />

        <DocumentCarousel />
      </ErrorBoundary>
    </div>
  );
};

export default Document;

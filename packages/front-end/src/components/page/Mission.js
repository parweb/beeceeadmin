import { Component } from 'react';
import { useSetRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';

import { DocumentCarousel } from 'components/document';
import { $mission, $documentModal } from 'state';

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

const Mission = () => {
  const { idMiss, idDoc = null } = useParams();

  const setMission = useSetRecoilState($mission);
  const setDocumentModal = useSetRecoilState($documentModal);

  setMission(idMiss);
  if (idDoc !== null) setDocumentModal(parseInt(idDoc));

  return (
    <div
      style={{
        margin: '0',
        background: '#fff'
      }}
    >
      <ErrorBoundary>
        <DocumentCarousel />
      </ErrorBoundary>
    </div>
  );
};

export default Mission;

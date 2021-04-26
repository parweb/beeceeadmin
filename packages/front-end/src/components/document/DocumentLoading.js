import { Spinner } from '@salesforce/design-system-react';

const DocumentLoading = () => (
  <Spinner
    size="small"
    variant="base"
    assistiveText={{ label: 'Recherche en cours' }}
  />
);

export default DocumentLoading;

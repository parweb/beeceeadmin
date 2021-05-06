import { useState, lazy } from 'react';

import { ButtonGroup } from 'layout';

const editors = {
  json: lazy(() => import('./ClientEditorJson')),
  form: lazy(() => import('./ClientEditorForm'))
};

const ClientEditor = () => {
  const [editorType, setEditorType] = useState('form');
  const Component = editors[editorType];

  return (
    <>
      <ButtonGroup
        name={'type'}
        options={['form', 'json']}
        value={editorType}
        onChange={setEditorType}
      />

      <Component />
    </>
  );
};

export default ClientEditor;

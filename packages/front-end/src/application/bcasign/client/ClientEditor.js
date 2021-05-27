import { useState, lazy } from 'react';

import { BcasignClientToolbar } from 'application';

const editors = {
  json: lazy(() => import('./ClientEditorJson')),
  form: lazy(() => import('./ClientEditorForm'))
};

const ClientEditor = () => {
  const [editorType, setEditorType] = useState('form');
  const Component = editors[editorType];

  return (
    <>
      <BcasignClientToolbar {...{ editorType, setEditorType }} />
      <Component />
    </>
  );
};

export default ClientEditor;

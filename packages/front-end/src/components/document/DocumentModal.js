import { useParams } from 'react-router-dom';

import {
  EditorAdvanced,
  EditorExpanded,
  EditorSimple
} from 'components/editor';

const DocumentModal = () => {
  const isAdvanced = useParams().advanced === 'advanced';
  const isExpanded = useParams().advanced === 'expanded';

  if (isAdvanced) return <EditorAdvanced />;
  if (isExpanded) return <EditorExpanded />;

  return <EditorSimple />;
};

export default DocumentModal;

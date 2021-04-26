import { useRef } from 'react';
import { useRecoilValue } from 'recoil';

import { DocumentThumbnail } from 'components/document';
import { $documentsView } from 'state';

const EditorThumbnails = () => {
  const parent = useRef();
  const documents = useRecoilValue($documentsView);

  return (
    <div
      id="editor-thumbnails"
      ref={parent}
      style={{
        height: '100px',
        overflow: 'scroll',
        display: 'flex'
      }}
    >
      {[...documents]?.map(props => (
        <DocumentThumbnail
          key={`DocumentThumbnail-${props.idDocNum}`}
          parent={parent}
          {...props}
        />
      ))}
    </div>
  );
};

export default EditorThumbnails;

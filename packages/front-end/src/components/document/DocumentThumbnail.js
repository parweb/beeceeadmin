import { useEffect, useRef } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { $documentId, $documentModal } from 'state';

const DocumentThumbnail = ({
  parent,
  nomFichier,
  idDocNum,
  preview,
  onClick
}) => {
  const ref = useRef();
  const id = useRecoilValue($documentId);
  const setDocumentModal = useSetRecoilState($documentModal);

  useEffect(() => {
    if (idDocNum === id) {
      const boxCurrent = ref.current.getBoundingClientRect();
      const boxParent = parent.current.getBoundingClientRect();
      const x = boxCurrent.x - boxParent.x;
      const scrollLeft = parent.current.scrollLeft;

      parent.current.scrollTo({
        left: x + boxCurrent.width / 2 + scrollLeft - boxParent.width / 2,
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [parent, idDocNum, id]);

  return (
    <img
      alt={nomFichier}
      ref={ref}
      onClick={() => {
        setDocumentModal(idDocNum);
      }}
      style={{
        border: `3px solid ${idDocNum === id ? '#0070d2' : '#dddd'}`,
        display: 'inline-block',
        height: '100px',
        cursor: 'pointer'
      }}
      src={preview + '&height=100'}
    />
  );
};

export default DocumentThumbnail;

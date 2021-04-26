import { useRef, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { $document } from 'state';
import { useEditorImg } from 'hooks';

const EditorAttachments = () => {
  const container = useRef();

  const document = useRecoilValue($document);
  const [{ currentImg, src }, setCurrentImg] = useEditorImg();

  useEffect(() => {
    if (container?.current !== null) {
      try {
        const boxParent = container.current.getBoundingClientRect();
        const boxCurrent = Array.from(container.current.children)
          .find(
            el =>
              el.getAttribute('src').replace('&height=100', '') === currentImg
          )
          .getBoundingClientRect();

        const x = boxCurrent.x - boxParent.x;
        const scrollLeft = container.current.scrollLeft;

        container.current.scrollTo({
          left: x + boxCurrent.width / 2 + scrollLeft - boxParent.width / 2,
          top: 0,
          behavior: 'smooth'
        });
      } catch (_) {}
    }
  }, [currentImg]);

  return (document?.attachments ?? []).length > 0 ? (
    <div
      id="editor-attachments"
      ref={container}
      style={{
        height: '100px',
        overflow: 'scroll',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      {[{ preview: src }, ...document.attachments].map(
        ({ preview, nomFichier }) => (
          <img
            key={`attachments-${preview}`}
            onClick={() => setCurrentImg(preview)}
            style={{
              cursor: 'pointer',
              display: 'inline-block',
              height: '100px',
              border:
                preview === currentImg ? '2px solid #0070d2' : '2px solid #aaa',
              backgroundColor: '#fff',
              marginRight: '4px'
            }}
            alt={nomFichier}
            src={preview + '&height=100'}
          />
        )
      )}
    </div>
  ) : (
    <div />
  );
};

export default EditorAttachments;

import { useHistory, useParams } from 'react-router-dom';

import { EditorEmailHeader, EditorDownload } from 'components/editor';
import { useCanvas, useEditorImg, useDocument } from 'hooks';
import { format } from 'helpers';

const Loading = () => {
  const [{ isLoading }] = useEditorImg();

  return (
    isLoading && (
      <div
        className="loading-canvas"
        style={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <div>Chargement en cours ...</div>
      </div>
    )
  );
};

const EditorCanvas = () => {
  const history = useHistory();
  const params = useParams();
  const canvas = useCanvas();

  const doc = useDocument();

  const [{ currentImg, isLoading }] = useEditorImg();
  const extension = format(currentImg);

  if (['pdf', 'eml', 'html'].includes(extension)) {
    return (
      <>
        <Loading />
        <EditorEmailHeader />
        {!isLoading && (
          <embed
            title={currentImg}
            width="100%"
            height="100%"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
            scrolling="auto"
            style={{ border: 'none' }}
            src={currentImg}
          />
        )}
        <canvas style={{ display: 'none' }} ref={canvas} />
      </>
    );
  }

  return (
    <>
      <Loading />

      <div className="canvas-container" style={{ display: 'block' }}>
        <EditorEmailHeader />
        <EditorDownload url={doc.externalUrl} />
        <canvas
          ref={canvas}
          onDoubleClick={() =>
            params.advanced === 'expanded'
              ? history.goBack()
              : history.push(
                  `/mission/${params.idMiss}/document/${params.idDoc}/expanded`
                )
          }
          width="100%"
          height="100%"
        />
      </div>
    </>
  );
};

export default EditorCanvas;

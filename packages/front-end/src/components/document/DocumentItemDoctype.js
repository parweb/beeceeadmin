import { DocumentDoctype } from 'components/document';

const DocumentItemDoctype = ({ attachments, nomFichier }) => {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '0px',
        right: '0px',
        textAlign: 'right'
      }}
    >
      {attachments.length > 0 ? (
        <DocumentDoctype
          extension="attachment"
          size={2}
          style={{ margin: '0px' }}
        />
      ) : (
        <DocumentDoctype
          file={nomFichier}
          size={2}
          style={{ margin: '0px', padding: '0px' }}
        />
      )}
    </div>
  );
};

export default DocumentItemDoctype;

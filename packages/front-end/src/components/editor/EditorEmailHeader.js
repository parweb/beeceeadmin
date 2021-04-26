import { useDocument } from 'hooks';

const EditorEmailHeader = () => {
  const document = useDocument();
  return (
    <div
      style={
        document?.email ?? false
          ? {
              paddingBottom: '10px',
              borderBottom: '1px solid #ccc',
              marginBottom: '10px'
            }
          : {}
      }
    >
      {(document?.email ?? false) && (
        <>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ width: '50px', textAlign: 'right' }}>Pour</div>
            <div>
              {document?.email?.to?.value
                .map(
                  ({ address, name }) =>
                    ({ '': address }[name] ?? `${name} <${address}>`)
                )
                .join(', ')}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ width: '50px', textAlign: 'right' }}>De</div>
            <div>
              {document?.email?.from?.value
                .map(
                  ({ address, name }) =>
                    ({ '': address }[name] ?? `${name} <${address}>`)
                )
                .join(', ')}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ width: '50px', textAlign: 'right' }}>Sujet</div>
            <div>{document?.email?.subject}</div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ width: '50px', textAlign: 'right' }}>Date</div>
            <div>{new Date(document?.email?.date).toLocaleString()}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default EditorEmailHeader;

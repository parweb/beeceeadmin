import useMedia from 'use-media';

const useResponsiveDocument = () => {
  const xs = useMedia({ maxWidth: '450px' });
  const md = useMedia({ minWidth: '451px', maxWidth: '860px' });
  const lg = useMedia({ minWidth: '861px', maxWidth: '1024px' });
  const xl = useMedia({ minWidth: '1025px' });

  let documentSize = { rows: 1, columns: 2 };

  xs && (documentSize = { rows: 1, columns: 1 });
  md && (documentSize = { rows: 1, columns: 2 });
  lg && (documentSize = { rows: 1, columns: 2 });
  xl && (documentSize = { rows: 1, columns: 2 });

  return documentSize;
};

export default useResponsiveDocument;

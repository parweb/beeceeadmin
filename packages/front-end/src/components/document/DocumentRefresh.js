import { Button } from '@salesforce/design-system-react';
import useMedia from 'use-media';

const DocumentRefresh = () => {
  const isSmall = useMedia({ maxWidth: '710px' });

  return (
    <Button
      id="btn-refresh"
      onClick={() => {
        window.dispatchEvent(new CustomEvent('refresh-document'));
      }}
      style={{
        width: '100%',
        height: '2rem',
        justifyContent: 'center',
        fontSize: isSmall ? '10px' : '15px'
      }}
      iconCategory="utility"
      iconName="refresh"
    />
  );
};

export default DocumentRefresh;

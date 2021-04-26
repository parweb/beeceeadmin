import { Button } from '@salesforce/design-system-react';

const DocumentTag = ({ label, onClick, disabled = null, active = null }) => {
  return (
    <Button
      id={`tag-${label.toUpperCase()}`}
      label={label}
      onClick={onClick}
      style={{
        ...(disabled === null ? {} : { cursor: disabled && 'not-allowed' }),
        width: '100%',
        padding: '0px',
        margin: '0px'
      }}
      {...(active === null ? {} : { variant: active ? 'brand' : 'neutral' })}
      {...(disabled === null ? {} : { disabled })}
      {...(disabled === null
        ? {}
        : { variant: !disabled ? 'brand' : 'neutral' })}
    />
  );
};

export default DocumentTag;

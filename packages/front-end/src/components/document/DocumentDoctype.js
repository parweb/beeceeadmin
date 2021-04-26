import { Button } from '@salesforce/design-system-react';

import { getIcon } from 'helpers';

const DocumentDoctype = ({
  id = null,
  file,
  extension = null,
  size = 1,
  style,
  onClick,
  ...props
}) => {
  const icon = getIcon(extension ? 'file.' + extension : file);

  return (
    <div
      onClick={onClick}
      style={{
        display: 'inline-block',
        cursor: 'pointer',
        ...(size === 2 && {
          padding: '5px',
          margin: '11px'
        })
      }}
    >
      <div
        style={{
          transform: 'scale(' + size + ')',
          position: 'relative',
          display: 'inline-block'
        }}
      >
        <Button
          id={id}
          data-testid="DocumentDoctype"
          style={style}
          {...icon}
          iconSize="large"
          variant="icon"
          {...props}
        />
        {icon.iconName === 'unknown' && (
          <div
            style={{
              position: 'absolute',
              right: '0px',
              left: '0px',
              textAlign: 'center',
              bottom: '6px',
              fontWeight: 400,
              textTransform: 'uppercase',
              color: '#fff',
              fontSize: '7px'
            }}
          >
            {icon.extension}
          </div>
        )}
      </div>
    </div>
  );
};
export default DocumentDoctype;

import { useState } from 'react';

import { useAccess } from 'hooks';

import {
  BcagdocGroupAddExtension,
  BcagdocGroupExtensionList,
  BcagdocGroupActionDisplay,
  BcagdocGroupActionUpload,
  BcagdocGroupActionSize,
  BcagdocGroupActionDelete,
  BcagdocGroupExtensionListMore
} from 'application';

const GroupItem = ({ id, name, extensions, display, upload, size }) => {
  const can = useAccess();
  const [count, setCount] = useState(5);

  return (
    <div
      style={{
        borderBottom: '1px solid #000',
        margin: '10px',
        paddingBottom: '10px'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #ccc',
          marginBottom: '10px',
          paddingBottom: '10px',
          gap: '7px'
        }}
      >
        {can('extension.delete') && (
          <BcagdocGroupActionDelete groupId={id} name={name} />
        )}

        <h1
          style={{
            flex: 1,
            fontSize: '25px'
          }}
        >
          {name}
        </h1>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <BcagdocGroupActionDisplay groupId={id} value={display} />
          <BcagdocGroupActionUpload groupId={id} value={upload} />
          <BcagdocGroupActionSize groupId={id} value={size} />
        </div>
      </div>

      <ul
        style={{
          borderBottom: '1px solid #ccc',
          marginBottom: '10px',
          paddingBottom: '10px'
        }}
      >
        {extensions.slice(0, count).map(extension => (
          <BcagdocGroupExtensionList
            key={`BcagdocGroupExtensionList-${extension.id}`}
            groupId={id}
            {...extension}
          />
        ))}

        {extensions.length > 5 && (
          <BcagdocGroupExtensionListMore setCount={setCount} />
        )}
      </ul>

      {can('extension.add') && <BcagdocGroupAddExtension groupId={id} />}
    </div>
  );
};

export default GroupItem;

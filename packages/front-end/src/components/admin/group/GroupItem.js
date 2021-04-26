import { useState } from 'react';

import {
  AdminGroupAddExtension,
  AdminGroupExtensionList,
  AdminGroupActionDisplay,
  AdminGroupActionUpload,
  AdminGroupActionSize,
  AdminGroupActionDelete,
  AdminGroupExtensionListMore
} from 'components/admin';

const GroupItem = ({ id, name, extensions, display, upload, size }) => {
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
        <AdminGroupActionDelete groupId={id} name={name} />
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
          <AdminGroupActionDisplay groupId={id} value={display} />
          <AdminGroupActionUpload groupId={id} value={upload} />
          <AdminGroupActionSize groupId={id} value={size} />
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
          <AdminGroupExtensionList
            key={`AdminGroupExtensionList-${extension.id}`}
            groupId={id}
            {...extension}
          />
        ))}

        {extensions.length > 5 && (
          <AdminGroupExtensionListMore setCount={setCount} />
        )}
      </ul>
      <AdminGroupAddExtension groupId={id} />
    </div>
  );
};

export default GroupItem;

import { Badge } from '@chakra-ui/react';

import { BcagdocCourrierActionDelete } from 'application';
import { useAccess } from 'hooks';

const CourrierItem = ({ id, name }) => {
  const can = useAccess();

  return (
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
      {can('courrier.delete') && (
        <BcagdocCourrierActionDelete courrierId={id} name={name} />
      )}

      <h1
        style={{
          flex: 1,
          fontSize: '20px'
        }}
      >
        {name} <Badge colorScheme="green">{id}</Badge>
      </h1>
    </div>
  );
};

export default CourrierItem;

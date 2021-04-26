import { useQuery } from '@apollo/client';
import { ToastContainer, Toast } from '@salesforce/design-system-react';

import { GROUPS } from 'requests';

import { AdminGroupAdd, AdminGroupItem } from 'components/admin';

const GroupList = () => {
  const { loading, error, data } = useQuery(GROUPS);
  const upload = data?.groups.map(item => item.upload);
  const hasNoneUploadSelected = upload?.every(item => item === false);

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <>
        <p>Error :(</p>
        <p>{error.message}</p>
      </>
    );

  return (
    <>
      {hasNoneUploadSelected && (
        <ToastContainer>
          <Toast
            labels={{
              heading: "Veuillez cocher l'option charger pour un groupe !"
            }}
            variant="warning"
          />
        </ToastContainer>
      )}
      <div style={{ marginTop: hasNoneUploadSelected && '20px' }}>
        <AdminGroupAdd />
        {data.groups.map(props => (
          <AdminGroupItem key={`AdminGroupItem-${props.id}`} {...props} />
        ))}
      </div>
    </>
  );
};

export default GroupList;

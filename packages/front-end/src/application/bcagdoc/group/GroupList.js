import { useRecoilValue } from 'recoil';
import { ToastContainer, Toast } from '@salesforce/design-system-react';

import { BcagdocGroupAdd, BcagdocGroupItem } from 'application';
import { $group } from 'states';
import { useAccess } from 'hooks';

const GroupList = () => {
  const can = useAccess();

  const groups = useRecoilValue($group.list);
  const upload = groups.map(item => item.upload);
  const hasNoneUploadSelected = upload?.every(item => item === false);

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
        {can('extension.add') && <BcagdocGroupAdd />}

        {groups.map(props => (
          <BcagdocGroupItem key={`BcagdocGroupItem-${props.id}`} {...props} />
        ))}
      </div>
    </>
  );
};

export default GroupList;

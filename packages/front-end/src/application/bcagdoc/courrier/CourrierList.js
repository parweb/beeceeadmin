import { useRecoilValue } from 'recoil';

import { BcagdocCourrierAdd, BcagdocCourrierItem } from 'application';
import { $courrier } from 'states';
import { useAccess } from 'hooks';

const CourrierList = () => {
  const can = useAccess();
  const courriers = useRecoilValue($courrier.list);

  return (
    <>
      {can('courrier.add') && <BcagdocCourrierAdd />}

      <div style={{ margin: '10px' }}>
        {courriers?.map(props => (
          <BcagdocCourrierItem
            key={`BcagdocCourrierItem-${props.id}`}
            {...props}
          />
        ))}
      </div>
    </>
  );
};

export default CourrierList;

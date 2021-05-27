import { useRecoilValue } from 'recoil';

import { BcagdocCourrierAdd, BcagdocCourrierItem } from 'application';
import { $courrier } from 'states';

const CourrierList = () => {
  const courriers = useRecoilValue($courrier.list);

  return (
    <>
      <BcagdocCourrierAdd />

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

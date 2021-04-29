import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { BcagdocCourrierAdd, BcagdocCourrierActionDelete } from 'application';
import { $courrier } from 'states';

const Item = styled.div`
  display: flex;
  gap: 10px;

  align-items: center;
  justify-content: flex-start;

  font-size: 20px;

  actions {
  }

  header {
  }
`;

const CourrierList = () => {
  const courriers = useRecoilValue($courrier.list);

  return (
    <>
      <div>
        <BcagdocCourrierAdd />

        {courriers?.map(({ id, name }) => (
          <Item key={`BcagdocCourrierList-${id}`}>
            <BcagdocCourrierActionDelete courrierId={id} name={name} />
            <header>{name}</header>
          </Item>
        ))}
      </div>
    </>
  );
};

export default CourrierList;

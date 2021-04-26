import { useQuery } from '@apollo/client';
import styled from 'styled-components';

import { COURRIERS } from 'requests';

import { AdminCourrierAdd, AdminCourrierActionDelete } from 'components/admin';

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
  const { loading, error, data } = useQuery(COURRIERS);

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
      <div>
        <AdminCourrierAdd />

        {data?.courriers?.map(({ id, name }) => (
          <Item key={`AdminCourrierList-${id}`}>
            <AdminCourrierActionDelete courrierId={id} name={name} />
            <header>{name}</header>
          </Item>
        ))}
      </div>
    </>
  );
};

export default CourrierList;

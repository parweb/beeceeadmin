import styled from 'styled-components';

import { useMutation } from 'hooks';
import { $user } from 'states';

const Container = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: auto 1fr;
`;

const Page = ({ children }) => {
  const [createUsers, { loading }] = useMutation($user.create);

  return (
    <>
      <button
        disabled={loading}
        onClick={() =>
          createUsers({
            id: -1,
            email: `fake+${new Date().getTime()}@gmail.com`,
            name: 'fake',
            posts: []
          })
        }
      >
        fake user
      </button>

      <button
        disabled={loading}
        onClick={() =>
          createUsers({
            email: `gerard+${new Date().getTime()}@gmail.com`,
            name: 'gerard'
          })
        }
      >
        add user
      </button>

      <Container>{children}</Container>
    </>
  );
};

export default Page;

// import { useRecoilValue } from 'recoil';
import { FormControl, FormLabel } from '@chakra-ui/react';
// import produce from 'immer';

import { Input } from 'layout';
// import { useParams, useMutation } from 'hooks';
// import { $client } from 'states';

const ClientEssentials = () => {
  // const { id } = useParams();
  // const client = useRecoilValue($client.read(id));
  // const [updateClient] = useMutation($client.update(id));

  const onChange = e => {
    const { value, name } = e.target;

    debugger;
    // updateClient(
    //   produce(client, draft => {
    //     if (name === 'id') draft[name] = value;
    //     if (name === 'signedDocPattern') draft[name] = value;
    //   })
    // );
  };

  return (
    <>
      <FormControl id="adefinir">
        <FormLabel>adefinir</FormLabel>
        <Input
          id="adefinir"
          name="adefinir"
          placeholder="adefinir"
          // value={client?.adefinir}
          onChange={onChange}
        />
      </FormControl>

      <FormControl id="adefinir2">
        <FormLabel>adefinir</FormLabel>
        <Input
          id="adefinir2"
          name="adefinir"
          placeholder="adefinir"
          // value={client?.adefinir}
          onChange={onChange}
        />
      </FormControl>
    </>
  );
};

export default ClientEssentials;

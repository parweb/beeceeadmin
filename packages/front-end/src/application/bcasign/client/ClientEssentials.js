import { useRecoilValue } from 'recoil';
import { FormControl, FormLabel } from '@chakra-ui/react';
import produce from 'immer';

import { Input } from 'layout';
import { useParams, useMutation } from 'hooks';
import { $client } from 'states';

const ClientEssentials = () => {
  const { id } = useParams();
  const client = useRecoilValue($client.read(id));
  const [updateClient] = useMutation($client.update(id));

  const onChange = e => {
    const { value, name } = e.target;

    updateClient(
      produce(client, draft => {
        if (name === 'doc-num-api') {
          draft.callbackChannels[0].callbackUrl = `${value}/doc-num/api/v1/documents/upload`;
          draft.callbackChannels[0].callbackResponseHandlerParams.url = `${value}/doc-num/api/v1/documents/num-dos/`;
        }

        if (name === 'bca-task-api') {
          draft.callbackChannels[1].callbackUrl = `${value}/bca-tasks/v1/tasks`;
          draft.callbackChannels[2].callbackUrl = `${value}/bca-tasks/v1/tasks`;
        }

        if (name === 'xps-rabbitmq') {
          draft.callbackChannels[3].callbackUrl = value;
        }
      })
    );
  };

  const docnum_api = new URL(
    client?.callbackChannels?.find(({ code }) => code === 'DOC_NUM')
      ?.callbackUrl ?? ''
  ).origin;

  const bcatask_api = new URL(
    client?.callbackChannels?.find(({ code }) => code === 'GE')?.callbackUrl ??
      ''
  ).origin;

  const xpsrabbitmq_api =
    client?.callbackChannels?.find(({ code }) => code === 'XPS')?.callbackUrl ??
    '';

  return (
    <>
      <FormControl id="doc-num-api">
        <FormLabel>Docnum API</FormLabel>
        <Input
          id="doc-num-api"
          name="doc-num-api"
          placeholder="Docnum API"
          defaultValue={docnum_api}
          onChange={onChange}
        />
      </FormControl>

      <FormControl id="bca-task-api">
        <FormLabel>BCA task API</FormLabel>
        <Input
          id="bca-task-api"
          name="bca-task-api"
          placeholder="BCA task API"
          defaultValue={bcatask_api}
          onChange={onChange}
        />
      </FormControl>

      <FormControl id="xps-rabbitmq">
        <FormLabel>XPS rabbitMq</FormLabel>
        <Input
          id="xps-rabbitmq"
          name="xps-rabbitmq"
          placeholder="XPS rabbitMq"
          defaultValue={xpsrabbitmq_api}
          onChange={onChange}
        />
      </FormControl>
    </>
  );
};

export default ClientEssentials;

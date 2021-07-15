import { useRecoilValue } from 'recoil';
import { GrAdd } from 'react-icons/gr';
import produce from 'immer';

import { $client } from 'states';
import { BcasignNotificationItem } from 'application';
import { Button } from 'layout';
import { useMutation, useAccess } from 'hooks';

const NotificationList = ({ clientId }) => {
  const can = useAccess();

  const client = useRecoilValue($client.readWidthDefault(clientId));
  const [updateClient] = useMutation($client.update(clientId));

  return (
    <>
      {can('client.add') && (
        <Button
          onClick={() => {
            const code = prompt('Client code ?');

            updateClient(
              produce(client, draft => {
                draft.callbackChannels.push({
                  id: 0,
                  code,
                  description: '',
                  auto: false,
                  messagePerDoc: false,
                  notifyReception: false,
                  notifyResponse: false,
                  successOnly: false,
                  callbackUrl: '',
                  callbackDataType: '',
                  callbackResponseHandler: '',
                  callbackResponseHandlerParams: {
                    url: ''
                  },
                  username: null,
                  password: null,
                  authMethod: null,
                  callbackRequiredParams: [],
                  callbackData: {
                    documents: '',
                    codeQualification: '',
                    numDos: '',
                    typeDocument: ''
                  },
                  callbackDataTransform: [
                    {
                      dataId: '',
                      method: ''
                    }
                  ]
                });
              })
            );
          }}
          leftIcon={<GrAdd />}
          variant="solid"
        >
          Ajouter une notification
        </Button>
      )}

      <hr />

      {client?.callbackChannels?.map(({ id }) => (
        <BcasignNotificationItem
          key={`BcasignNotificationItem-${id}`}
          id={id}
        />
      ))}
    </>
  );
};

export default NotificationList;

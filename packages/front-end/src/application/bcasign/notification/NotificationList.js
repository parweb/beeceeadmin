import { useRecoilValue } from 'recoil';

import { $client } from 'states';
import { BcasignNotificationItem } from 'application';

const NotificationList = ({ clientId }) => {
  const client = useRecoilValue($client.read(clientId));

  return (
    <>
      {client?.callbackChannels?.map(({ code }) => (
        <BcasignNotificationItem
          key={`BcasignNotificationItem-${code}`}
          code={code}
        />
      ))}
    </>
  );
};

export default NotificationList;

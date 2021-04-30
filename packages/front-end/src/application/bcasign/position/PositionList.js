import { useRecoilValue } from 'recoil';

import { $client } from 'states';
import { BcasignPositionItem } from 'application';

const PositionList = ({ clientId }) => {
  const client = useRecoilValue($client.read(clientId));

  return (
    <>
      {client?.signPositions?.map(({ codeCourrier }) => (
        <BcasignPositionItem
          key={`BcasignPositionItem-${codeCourrier}`}
          codeCourrier={codeCourrier}
        />
      ))}
    </>
  );
};

export default PositionList;

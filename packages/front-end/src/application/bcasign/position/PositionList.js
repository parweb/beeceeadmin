import { useRecoilValue } from 'recoil';

import { $client } from 'states';
import { BcasignPositionItem } from 'application';

const PositionList = ({ clientId }) => {
  const client = useRecoilValue($client.read(clientId));

  return (
    <>
      {client?.signPositions?.map(({ code }) => (
        <BcasignPositionItem key={`BcasignPositionItem-${code}`} code={code} />
      ))}
    </>
  );
};

export default PositionList;

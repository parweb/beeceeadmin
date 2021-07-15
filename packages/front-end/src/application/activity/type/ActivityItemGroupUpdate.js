import { useRecoilValue } from 'recoil';

import { $activity } from 'states';

const ActivityItemGroupUpdate = ({ id }) => {
  const activity = useRecoilValue($activity.read(id));

  return <div>Modification du groupe {activity.type_id}</div>;
};

export default ActivityItemGroupUpdate;

import { useRecoilValue } from 'recoil';

import { ActivityItem } from 'application';
import { $activity } from 'states';

const ActivityList = () => {
  const activities = useRecoilValue($activity.list);

  return (
    <div>
      {activities.map(({ id }) => (
        <ActivityItem key={`ActivityItem-${id}`} id={id} />
      ))}
    </div>
  );
};

export default ActivityList;

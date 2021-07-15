import { Suspense, lazy } from 'react';
import { useRecoilValue } from 'recoil';
// import { Tabs } from '@chakra-ui/react';

import { Spinner } from 'layout';
import { $activity } from 'states';

const mapper = {
  'group.update': lazy(() => import('./type/ActivityItemGroupUpdate'))
};

const ActivityItem = ({ id }) => {
  const activity = useRecoilValue($activity.read(id));

  const Component =
    mapper[activity.type] ??
    (() => <pre>{JSON.stringify(activity, null, 2)}</pre>);

  return (
    <Suspense fallback={<Spinner />}>
      <Component id={id} />
    </Suspense>
  );
};

export default ActivityItem;

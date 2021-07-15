import { Suspense } from 'react';

import { Spinner } from 'layout';
import { ActivityList } from 'application';

const ActivityModal = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <ActivityList />
    </Suspense>
  );
};

export default ActivityModal;

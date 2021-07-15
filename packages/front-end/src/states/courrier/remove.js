import { $courrier, $service } from 'states';
import { removeCourrier, allCourriers, createActivity } from 'services';

const remove =
  id =>
  async ({ set, snapshot }) => {
    const service = await snapshot.getPromise(
      $service.current('bca-courrier-api')
    );

    await removeCourrier(service.url, id);
    await createActivity('courrier.remove', id);

    const courriers = await allCourriers(service.url);

    set($courrier.list, courriers);
  };

export default remove;

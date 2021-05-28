import { $courrier, $service } from 'states';
import { removeCourrier, allCourriers } from 'services';

const remove =
  id =>
  async ({ set, snapshot }) => {
    const service = await snapshot.getPromise(
      $service.current('bca-courrier-api')
    );

    await removeCourrier(service.url, id);
    const courriers = await allCourriers(service.url);

    set($courrier.list, courriers);
  };

export default remove;

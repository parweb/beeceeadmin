import { $courrier, $service } from 'states';
import { createCourrier, allCourriers } from 'services';

const create = async ({ set, snapshot }, courrier) => {
  const service = await snapshot.getPromise(
    $service.current('bca-courrier-api')
  );

  await createCourrier(service.url, courrier);
  const courriers = await allCourriers(service.url);

  set($courrier.list, courriers);
};

export default create;

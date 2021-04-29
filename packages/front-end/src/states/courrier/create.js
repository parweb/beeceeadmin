import { $courrier } from 'states';
import { createCourrier, allCourriers } from 'services';

const create = async ({ set }, courrier) => {
  await createCourrier(courrier);
  const courriers = await allCourriers();

  set($courrier.list, courriers);
};

export default create;

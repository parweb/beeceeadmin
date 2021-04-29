import { $courrier } from 'states';
import { removeCourrier, allCourriers } from 'services';

const remove = id => async ({ set }) => {
  await removeCourrier(id);
  const courriers = await allCourriers();

  set($courrier.list, courriers);
};

export default remove;

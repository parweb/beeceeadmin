import { $environnement } from 'states';
import { updateService, allEnvironnements } from 'services';

const update = id => async ({ set }, data) => {
  await updateService(id, data);
  const environnements = await allEnvironnements();

  set($environnement.list, environnements);
};

export default update;

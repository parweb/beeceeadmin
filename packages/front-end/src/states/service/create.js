import { $environnement } from 'states';
import { createService, allEnvironnements } from 'services';

const create = async ({ set }, service) => {
  await createService(service);
  const environnements = await allEnvironnements();

  set($environnement.list, environnements);
};

export default create;

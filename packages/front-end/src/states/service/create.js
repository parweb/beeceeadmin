import { $environnement } from 'states';
import { createService, allEnvironnements, createActivity } from 'services';

const create = async ({ set }, service) => {
  await createService(service);
  await createActivity('service.create', null, service);

  const environnements = await allEnvironnements();

  set($environnement.list, environnements);
};

export default create;

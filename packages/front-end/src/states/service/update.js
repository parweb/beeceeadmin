import { $environnement } from 'states';
import { updateService, allEnvironnements, createActivity } from 'services';

const update =
  id =>
  async ({ set }, data) => {
    await updateService(id, data);
    await createActivity('service.update', id, data);

    const environnements = await allEnvironnements();

    set($environnement.list, environnements);
  };

export default update;

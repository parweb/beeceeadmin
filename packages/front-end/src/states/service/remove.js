import { $environnement } from 'states';
import { removeService, allEnvironnements, createActivity } from 'services';

const remove =
  id =>
  async ({ set }) => {
    await removeService(id);
    await createActivity('service.remove', id);

    const environnements = await allEnvironnements();

    set($environnement.list, environnements);
  };

export default remove;

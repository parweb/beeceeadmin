import { $environnement } from 'states';
import { removeService, allEnvironnements } from 'services';

const remove = id => async ({ set }) => {
  await removeService(id);
  const environnements = await allEnvironnements();

  set($environnement.list, environnements);
};

export default remove;

import { $client, $service } from 'states';
import { updateClient, allClients, createActivity } from 'services';

const update =
  id =>
  async ({ set, snapshot }, data) => {
    const service = await snapshot.getPromise(
      $service.current('bca-admin-api')
    );

    await updateClient(service, id, data);
    await createActivity('client.update', id, data);

    const clients = await allClients(service);

    set($client.list, clients);
  };

export default update;

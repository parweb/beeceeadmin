import { $client, $service } from 'states';
import { createClient, allClients, createActivity } from 'services';

const duplicate =
  id =>
  async ({ set, snapshot }, data = {}) => {
    const service = await snapshot.getPromise(
      $service.current('bca-admin-api')
    );

    const client = await snapshot.getPromise($client.read(id));

    await createClient(service, { ...client, ...data });
    await createActivity('client.create', null, { ...client, ...data });

    const clients = await allClients(service);

    set($client.list, clients);
  };

export default duplicate;

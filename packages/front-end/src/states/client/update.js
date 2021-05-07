import { $client, $service } from 'states';
import { updateClient, allClients } from 'services';

const update = id => async ({ set, snapshot }, data) => {
  const service = await snapshot.getPromise($service.current('bca-admin-api'));

  // console.log({ data });

  await updateClient(service.url, id, data);
  const clients = await allClients(service.url);

  set($client.list, clients);
};

export default update;

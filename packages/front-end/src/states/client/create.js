import { $client, $service } from 'states';
import { createClient, allClients } from 'services';

const defaultClient = {
  id: '',
  signedDocPattern: '',
  callbackChannels: [],
  signPositions: [],
  defaultSignPosition: {
    rank: null,
    page: -1,
    x: 12,
    y: 4,
    height: 3.53,
    width: 5.29
  }
};

const create = async ({ set, snapshot }, client = defaultClient) => {
  const service = await snapshot.getPromise($service.current('bca-admin-api'));

  await createClient(service, client);
  const clients = await allClients(service);

  set($client.list, clients);
};

export default create;

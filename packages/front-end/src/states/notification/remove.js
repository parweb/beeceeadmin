import { $service, $client } from 'states';
import { updateClient, allClients } from 'services';

const remove =
  id =>
  async ({ set, snapshot }) => {
    const client = (await snapshot.getPromise($client.listWidthDefault)).find(
      ({ callbackChannels }) =>
        callbackChannels.find(notification => notification.id === id)
    );

    const newClient = Object.entries(client).reduce((carry, [key, value]) => {
      if (key === 'callbackChannels') {
        return {
          ...carry,
          callbackChannels: value.filter(notification => notification.id !== id)
        };
      }
      return { ...carry, [key]: value };
    }, {});

    const service = await snapshot.getPromise(
      $service.current('bca-admin-api')
    );

    await updateClient(service, client.id, newClient);
    const clients = await allClients(service);

    set($client.list, clients);
  };

export default remove;

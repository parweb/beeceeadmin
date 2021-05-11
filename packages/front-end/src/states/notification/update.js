import { $client, $service } from 'states';
import { updateClient, allClients } from 'services';

const update = id => async ({ set, snapshot }, data) => {
  const client = (
    await snapshot.getPromise($client.listWidthDefault)
  ).find(({ callbackChannels }) =>
    callbackChannels.find(notification => notification.id === id)
  );

  const newClient = Object.entries(client).reduce((carry, [key, value]) => {
    if (key === 'callbackChannels') {
      return {
        ...carry,
        callbackChannels: value.map(notification => {
          if (notification.id === id) {
            return data;
          }

          return notification;
        })
      };
    }
    return { ...carry, [key]: value };
  }, {});

  // TO-DO
  debugger;

  const service = await snapshot.getPromise($service.current('bca-admin-api'));

  await updateClient(service.url, client.id, newClient);
  const clients = await allClients(service.url);

  set($client.list, clients);
};

export default update;

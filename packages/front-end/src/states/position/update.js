import { $client, $service } from 'states';
import { updateClient, allClients, createActivity } from 'services';

const update =
  codeCourrier =>
  async ({ set, snapshot }, data) => {
    const client = (await snapshot.getPromise($client.listWidthDefault)).find(
      ({ signPositions }) =>
        signPositions.find(position => position.codeCourrier === codeCourrier)
    );

    const newClient = Object.entries(client).reduce((carry, [key, value]) => {
      if (key === 'signPositions') {
        return {
          ...carry,
          signPositions: value.map(position => {
            if (position.codeCourrier === codeCourrier) {
              return data;
            }

            return position;
          })
        };
      }
      return { ...carry, [key]: value };
    }, {});

    const service = await snapshot.getPromise(
      $service.current('bca-admin-api')
    );

    await updateClient(service, client.id, newClient);
    await createActivity('client.update', client.id, newClient);

    const clients = await allClients(service);

    set($client.list, clients);
  };

export default update;

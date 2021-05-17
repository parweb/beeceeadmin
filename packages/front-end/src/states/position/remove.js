import { $service, $client } from 'states';
import { updateClient, allClients } from 'services';

const remove =
  codeCourrier =>
  async ({ set, snapshot }) => {
    const client = (await snapshot.getPromise($client.listWidthDefault)).find(
      ({ signPositions }) =>
        signPositions.find(position => position.codeCourrier === codeCourrier)
    );

    const newClient = Object.entries(client).reduce((carry, [key, value]) => {
      if (key === 'signPositions') {
        return {
          ...carry,
          signPositions: value.filter(
            position => position.codeCourrier !== codeCourrier
          )
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

import { orderBy } from 'helpers';

const allClients = service =>
  fetch(
    `${service.url}/clients?environnement=${service.environnement.name}`
  ).then(async res => {
    const data = await res.json();

    if (res.status !== 200) {
      throw new Error(data.message);
    }

    return data.sort(orderBy('id', 'asc'));
  });

export default allClients;

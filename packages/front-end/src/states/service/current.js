import { selectorFamily } from 'recoil';

import { $environnement } from 'states';

const current = selectorFamily({
  key: 'service.current',
  get: name => ({ get }) => {
    const environnementId = get($environnement.selected);
    const environnement = get($environnement.read(environnementId));

    return environnement?.services?.find(service => service.name === name);
  }
});

export default current;

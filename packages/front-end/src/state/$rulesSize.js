import { selector } from 'recoil';

import { $rules } from 'state';

const $rulesSize = selector({
  key: 'rulesSize',
  get: ({ get }) => {
    const {
      data: { groups }
    } = get($rules);

    const result = groups
      .map(({ size, extensions }) => {
        return extensions.map(({ name }) => {
          return { name, size };
        });
      })
      .flatMap(item => item)
      .reduce((carry, { name, size }) => ({ ...carry, [name]: size }), {});

    return result;
  }
});

export default $rulesSize;

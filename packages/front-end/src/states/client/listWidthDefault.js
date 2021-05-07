import { selector } from 'recoil';

import { $client } from 'states';

const listWidthDefault = selector({
  key: 'client.listWidthDefault',
  get: ({ get }) =>
    get($client.list).map(
      ({ id, signPositions, defaultSignPosition, ...rest }) => ({
        ...rest,
        id,
        defaultSignPosition,
        signPositions: [
          {
            codeCourrier: 'default',
            positions: [defaultSignPosition]
          },
          ...signPositions
        ]
      })
    )
});

export default listWidthDefault;

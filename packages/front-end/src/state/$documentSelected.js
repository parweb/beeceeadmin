import { selector, atom, waitForAll } from 'recoil';

import { $documentFindById } from 'state';

const $list = atom({ key: 'list', default: [] });

const $documentSelected = selector({
  key: 'documentSelected',
  get: ({ get }) =>
    get(
      waitForAll(
        get($list).map(({ idDocNum }) => {
          return $documentFindById(idDocNum);
        })
      )
    ),
  set: ({ get, set, reset }, value) => {
    if (value === 'reset') {
      reset($list);
      return;
    }

    const list = get($list);

    if (list.some(({ idDocNum }) => idDocNum === value.idDocNum)) {
      set($list, list =>
        list.filter(({ idDocNum }) => idDocNum !== value.idDocNum)
      );
    } else {
      set($list, list => [...list, value]);
    }
  }
});

export default $documentSelected;

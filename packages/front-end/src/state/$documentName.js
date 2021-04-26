import { selectorFamily, atomFamily } from 'recoil';
import { getName } from 'helpers';

import { $documentFindById } from 'state';

const $name = atomFamily({ key: 'name', default: null });

const $documentName = selectorFamily({
  key: 'documentName',
  get: id => ({ get }) => {
    const name = get($name(id));
    const { typeDocument, codeQualification } = get($documentFindById(id));

    return name || getName(typeDocument, codeQualification);
  },
  set: id => ({ set, get }, value) => {
    if (value === 'reset') {
      set($name(id), null);
    } else {
      set($name(id), value);
    }
  }
});

export default $documentName;

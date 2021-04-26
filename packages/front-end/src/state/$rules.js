import { atom } from 'recoil';

import { allRules } from 'services/document';

const $rules = atom({
  key: 'rules',
  default: allRules()
});

export default $rules;

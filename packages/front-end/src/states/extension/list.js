import { atom } from 'recoil';

import { allExtensions } from 'services';

const list = atom({
  key: 'extension.list',
  default: allExtensions()
});

export default list;

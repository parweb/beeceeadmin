import { atom } from 'recoil';

const page = atom({
  key: 'permission.page',
  default: 1
});

export default page;

import { atom } from 'recoil';

const page = atom({
  key: 'role.page',
  default: 1
});

export default page;

import { atom } from 'recoil';

const page = atom({
  key: 'user.page',
  default: 1
});

export default page;

import { atom } from 'recoil';

const $sort = atom({
  key: 'sort',
  default: JSON.parse(
    localStorage.getItem('sortBy') ||
      JSON.stringify({ by: 'dateCreation', direction: 'desc' })
  )
});

export default $sort;

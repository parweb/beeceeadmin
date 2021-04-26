import { atomFamily } from 'recoil';

const $filters = atomFamily({
  key: 'filters',
  default: id =>
    JSON.parse(localStorage.getItem('filters-' + id) || JSON.stringify([]))
});

export default $filters;

const orFilter = (filter, callback, item) =>
  filter.length === 0
    ? true
    : filter.reduce((carry, search) => carry || callback(search)(item), false);

export default orFilter;

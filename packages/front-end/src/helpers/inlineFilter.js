const inlineFilter = (filters, section) =>
  filters
    .filter(({ type }) => type === section)
    .reduce((carry, filter) => [...carry, filter.value], []);

export default inlineFilter;

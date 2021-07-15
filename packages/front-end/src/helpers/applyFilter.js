import { orFilter, inlineFilter } from 'helpers';

const hasNoFilters = filters => {
  return filters.length === 0;
};

const applyFilter = (items, filters, criterias) =>
  hasNoFilters(filters)
    ? [...items]
    : items.filter(item =>
        criterias.reduce(
          (carry, [section, callback]) =>
            carry && orFilter(inlineFilter(filters, section), callback, item),
          true
        )
      );

export default applyFilter;

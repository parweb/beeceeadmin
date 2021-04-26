import {
  filterByExtension,
  filterByTag,
  filterByType,
  filterByDissociation,
  filterBySigned,
  filterByDocumentName,
  filterByPhotoName
} from 'helpers';

const orFilter = (filter, callback, item) =>
  filter.length === 0
    ? true
    : filter.reduce((carry, search) => carry || callback(search)(item), false);

const inlineFilter = (filters, section) =>
  filters
    .filter(({ type }) => type === section)
    .reduce((carry, filter) => [...carry, filter.value], []);

const hasNoFilters = filters => {
  const hasDocumentNameFilter =
    filters.find(({ type }) => type === 'documentName')?.value.length > 0;
  const hasPhotoNameFilter =
    filters.find(({ type }) => type === 'photoName')?.value.length > 0;

  const hasFilters =
    filters.filter(({ type }) => !['documentName', 'photoName'].includes(type))
      ?.length > 0;

  return (
    hasPhotoNameFilter === false &&
    hasDocumentNameFilter === false &&
    hasFilters === false
  );
};

const filterDocuments = (documents, filters) =>
  hasNoFilters(filters)
    ? [...documents]
    : documents.filter(document =>
        Object.entries({
          extension: filterByExtension,
          type: filterByType,
          tag: filterByTag,
          dissociation: filterByDissociation,
          signed: filterBySigned,
          documentName: filterByDocumentName,
          photoName: filterByPhotoName
        }).reduce(
          (carry, [section, callback]) =>
            carry &&
            orFilter(inlineFilter(filters, section), callback, document),
          true
        )
      );

export default filterDocuments;

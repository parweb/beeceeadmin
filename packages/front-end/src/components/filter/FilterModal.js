import {
  FilterExtension,
  FilterType,
  FilterTag,
  FilterDocumentName,
  FilterPhotoName
} from 'components/filter';

const FilterModal = () => {
  return (
    <div style={{ padding: '30px' }}>
      <FilterExtension />
      <FilterType />
      <FilterTag />
      <FilterDocumentName />
      <FilterPhotoName />
    </div>
  );
};

export default FilterModal;

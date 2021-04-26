import { useRecoilValue, useSetRecoilState } from 'recoil';

import { $filter, $documentExtensions } from 'state';

import { DocumentDoctype } from 'components/document';

const FilterExtension = () => {
  const extensions = useRecoilValue($documentExtensions);
  const setFilter = useSetRecoilState($filter);

  return (
    <section style={{ marginBottom: '20px' }}>
      <h3>Type</h3>

      <div>
        {extensions.map(({ type, isSelected }) => {
          return (
            <DocumentDoctype
              id={`filter-by-extension-${type}`}
              key={`DocumentFilter-extension-${type}`}
              size={2}
              extension={type}
              onClick={() => {
                setFilter({ type: 'extension', value: type });
              }}
              style={{
                padding: '2px',
                marginRight: '3px',
                border: isSelected
                  ? '2px solid #0070d2'
                  : '2px solid transparent'
              }}
            />
          );
        })}
      </div>
    </section>
  );
};

export default FilterExtension;

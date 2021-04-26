import { useRecoilState, useRecoilValue } from 'recoil';
import { ButtonGroup, Button } from '@salesforce/design-system-react';

import { $filter, $documentTypes } from 'state';

const FilterType = () => {
  const [filter, setFilter] = useRecoilState($filter);
  const types = useRecoilValue($documentTypes);

  return (
    <section style={{ marginBottom: '20px' }}>
      <h3>Affichage</h3>

      <ButtonGroup id="button-group-more-icon">
        {types.map(({ id, label, isSelected }) => (
          <Button
            id={`filter-by-type-${id}`}
            key={`DocumentFilter-type-${id}`}
            onClick={() => {
              filter
                .filter(({ type }) => type === 'type')
                .filter(({ value }) => value !== id)
                .forEach(item => setFilter(item));

              setFilter({ type: 'type', value: id });
            }}
            variant={isSelected ? 'brand' : 'neutral'}
            label={label}
          />
        ))}
      </ButtonGroup>
    </section>
  );
};

export default FilterType;

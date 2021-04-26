import { useRecoilState } from 'recoil';
import { ButtonGroup, Button } from '@salesforce/design-system-react';

import { $filter } from 'state';

const FilterTag = () => {
  const [filter, setFilter] = useRecoilState($filter);

  return (
    <section style={{ marginBottom: '20px' }}>
      <h3>Tag</h3>

      <ButtonGroup id="button-group-more-icon">
        {[
          { id: 'photoAO', label: 'AO' },
          { id: 'photoRapport', label: 'RA' },
          { id: 'photo418', label: 'CO' }
        ].map(tag => {
          const currentFilter = { type: 'tag', value: tag.id };
          const isSelected = filter.some(
            item =>
              item.type === currentFilter.type &&
              item.value === currentFilter.value
          );

          return (
            <Button
              id={`filter-by-tag-${tag.id}`}
              key={`DocumentFilter-tag-${tag.id}`}
              onClick={() => {
                setFilter({ type: 'tag', value: tag.id });
              }}
              variant={isSelected ? 'brand' : 'neutral'}
              label={tag.label}
            />
          );
        })}
      </ButtonGroup>
    </section>
  );
};

export default FilterTag;

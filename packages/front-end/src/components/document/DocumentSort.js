import { useSetRecoilState, useRecoilValue } from 'recoil';
import useMedia from 'use-media';
import {
  Dropdown,
  DropdownTrigger,
  Button,
  Icon
} from '@salesforce/design-system-react';

import { $sort } from 'state';

const SortLabel = ({ label, by }) => {
  const sort = useRecoilValue($sort);

  return sort.by === by ? (
    <Button
      style={{ width: '100%' }}
      iconCategory="utility"
      iconName={sort.direction === 'asc' ? 'arrowup' : 'arrowdown'}
      iconSize="medium"
      label={' ' + label}
      variant="icon"
    />
  ) : (
    <span style={{ marginLeft: '15px' }}>{label}</span>
  );
};

const sortOption = ({ label, by }) => ({
  label: <SortLabel label={label} by={by} />,
  value: by
});

const DocumentSort = () => {
  const setSort = useSetRecoilState($sort);
  const isSmall = useMedia({ maxWidth: '710px' });
  return (
    <Dropdown
      onSelect={item => {
        setSort(sort => {
          const by = item.value;
          const direction = sort.direction === 'asc' ? 'desc' : 'asc';

          localStorage.setItem('sortBy', JSON.stringify({ by, direction }));

          return { by, direction };
        });
      }}
      style={{ width: '100%' }}
      align="right"
      options={[
        sortOption({ label: 'Date', by: 'dateCreation' }),
        sortOption({ label: 'Nom', by: 'codeQualification' }),
        sortOption({ label: 'Type', by: 'url' })
      ]}
    >
      <DropdownTrigger>
        <Button
          style={{
            width: '100%',
            justifyContent: 'space-around',
            fontSize: isSmall ? '10px' : '15px'
          }}
          iconCategory="action"
          iconName="sort"
          label="Trier"
        >
          <Icon
            category="utility"
            size={isSmall ? 'xx-small' : 'x-small'}
            name="down"
          />
        </Button>
      </DropdownTrigger>
    </Dropdown>
  );
};

export default DocumentSort;

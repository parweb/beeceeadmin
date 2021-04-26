import { useRecoilValue, useRecoilState } from 'recoil';
import { Badge, Icon } from '@salesforce/design-system-react';
import useMedia from 'use-media';

import { $filter, $documentTypes, $documentsView } from 'state';

const FilterBadges = () => {
  const isSmall = useMedia({ maxWidth: '710px' });
  const documentTypes = useRecoilValue($documentTypes);
  const documents = useRecoilValue($documentsView);
  const [filter, setFilter] = useRecoilState($filter);

  const types = documentTypes.map(type => {
    const icon = { all: 'file', photos: 'photo', others: 'file' }[type.id];

    const text = {
      all: ' document',
      photos: ' photo',
      others: ' autre'
    }[type.id];

    const allText = ':count/:total:text:plural'
      .replace(':total', type.count)
      .replace(':count', documents.length)
      .replace(':plural', documents.length > 1 ? 's' : '')
      .replace(`${type.count}/${type.count}`, type.count);

    const textSmall = {
      all: allText,
      photos: ':count',
      others: ':count'
    }[type.id]
      .replace(':count', type.count)
      .replace(':text', text)
      .replace(':plural', type.count > 1 ? 's' : '');

    const textLarge = {
      all: allText,
      photos: ':count:text:plural',
      others: ':count:text:plural'
    }[type.id]
      .replace(':count', type.count)
      .replace(':text', text)
      .replace(':plural', type.count > 1 ? 's' : '');

    const color = {
      all: 'light',
      photos: type.isSelected ? 'inverse' : 'default',
      others: type.isSelected ? 'inverse' : 'default'
    }[type.id];

    const iconColor = {
      all: 'light',
      photos: type.isSelected ? { colorVariant: 'base' } : {},
      others: type.isSelected ? { colorVariant: 'base' } : {}
    }[type.id];

    return {
      ...type,
      icon,
      textSmall,
      textLarge,
      color,
      iconColor
    };
  });

  return types.map(
    ({
      id,
      label,
      isSelected,
      count,
      textSmall,
      textLarge,
      color,
      iconColor
    }) => (
      <div
        key={`Badge-${id}`}
        onClick={() => {
          if (id !== 'all') {
            filter
              .filter(({ type }) => type === 'type')
              .filter(({ value }) => value !== id)
              .forEach(item => setFilter(item));

            setFilter({ type: 'type', value: id });
          }
        }}
        style={id === 'all' ? {} : { cursor: 'pointer' }}
      >
        <Badge
          className={`Badge-${id}`}
          content={isSmall ? textSmall : textLarge}
          color={color}
          icon={
            <Icon
              category="utility"
              name={id === 'photos' ? 'image' : 'file'}
              size="xx-small"
              {...iconColor}
            />
          }
        />
      </div>
    )
  );
};

export default FilterBadges;

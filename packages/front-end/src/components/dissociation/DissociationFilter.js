import { useEffect } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import useMedia from 'use-media';
import { Button } from '@salesforce/design-system-react';

import {
  $filter,
  $isDissociationActive,
  $isSignedActive,
  $documentSelected
} from 'state';

const DissociationFilter = () => {
  const isSmall = useMedia({ maxWidth: '1087px' });
  const setFilter = useSetRecoilState($filter);
  const isDissociationActive = useRecoilValue($isDissociationActive);
  const isSignedActive = useRecoilValue($isSignedActive);
  const setSelect = useSetRecoilState($documentSelected);

  useEffect(() => {
    if (isDissociationActive === false) {
      setSelect('reset');
    }
  }, [isDissociationActive, setSelect]);

  return (
    <Button
      id="document-filter-dissociation"
      style={{
        width: '100%',
        height: '100%',
        fontSize: isSmall ? '10px' : '15px'
      }}
      label={
        isSmall ? (
          ''
        ) : (
          <span
            style={{
              margin: '0 auto'
            }}
          >
            Documents dissociable
          </span>
        )
      }
      title="Documents dissociable"
      onClick={() => {
        if (isSignedActive === true) {
          setFilter({ type: 'signed', value: true });
        }

        setFilter({ type: 'dissociation', value: true });
      }}
      iconCategory="utility"
      iconName="remove_link"
      variant={isDissociationActive ? 'brand' : 'neutral'}
    />
  );
};

export default DissociationFilter;

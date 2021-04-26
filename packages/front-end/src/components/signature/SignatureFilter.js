import { useEffect } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import useMedia from 'use-media';
import { Button } from '@salesforce/design-system-react';

import {
  $filter,
  $isSignedActive,
  $isDissociationActive,
  $documentSelected,
  $documents
} from 'state';

import { filterBySigned } from 'helpers';

const SignatureFilter = () => {
  const isSmall = useMedia({ maxWidth: '1087px' });
  const setFilter = useSetRecoilState($filter);
  const isSignedActive = useRecoilValue($isSignedActive);
  const isDissociationActive = useRecoilValue($isDissociationActive);
  const setSelect = useSetRecoilState($documentSelected);
  const documents = useRecoilValue($documents);

  useEffect(() => {
    if (isSignedActive === false) {
      setSelect('reset');
    }
  }, [isSignedActive, setSelect]);

  const documentsSignable = (documents || []).filter(filterBySigned(true));
  if (documentsSignable.length === 0) {
    return null;
  }

  return (
    <Button
      id="document-filter-signing"
      iconPath="iconPath"
      style={{
        width: isSmall ? '100%' : '100%',
        height: '100%',
        fontSize: isSmall ? '10px' : '15px',
        backgroundImage: `url(/doc-num-front/sign-doc-${
          isSignedActive ? 'white' : 'blue'
        }.svg)`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: isSmall ? 'center center' : '12px center',
        backgroundSize: '14px',

        borderColor: isSignedActive && '#0070d2'
      }}
      label={isSmall ? '' : 'Signature'}
      title="Signature"
      onClick={() => {
        if (isDissociationActive === true) {
          setFilter({ type: 'dissociation', value: true });
        }

        setFilter({ type: 'signed', value: true });
      }}
      variant={isSignedActive ? 'brand' : 'neutral'}
    ></Button>
  );
};

export default SignatureFilter;

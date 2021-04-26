import { useState, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';

import { Select } from 'components/layout';
import { $filter, $filtersHasDocument, $filtersHasPhoto } from 'state';
import qualifications from 'state/qualifications';

const FilterDocumentName = () => {
  const filtersHasDocument = useRecoilValue($filtersHasDocument);
  const filtersHasPhoto = useRecoilValue($filtersHasPhoto);

  const [filter, setFilter] = useRecoilState($filter);

  const [documentName, setDocumentName] = useState(
    [...filter].find(({ type }) => type === 'documentName')?.value
  );

  useEffect(() => {
    if (filtersHasDocument === false && filtersHasPhoto === true) {
      setFilter({ type: 'documentName', value: [] });
      setDocumentName([]);
    }
  }, [filtersHasDocument, filtersHasPhoto, setFilter, setDocumentName]);

  return (
    (filtersHasDocument || (!filtersHasDocument && !filtersHasPhoto)) && (
      <section style={{ marginBottom: '20px' }}>
        <h3>Nom du document</h3>

        <Select
          id="filter-by-documentName"
          multiple
          value={documentName}
          onChange={value => {
            setDocumentName(value);
            setFilter({ type: 'documentName', value });
          }}
          options={qualifications['document']()}
          labels={{ placeholder: 'Faites votre sélection' }}
        />
      </section>
    )
  );
};

export default FilterDocumentName;

import { useState, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';

import { Select } from 'components/layout';
import { $filter, $filtersHasDocument, $filtersHasPhoto } from 'state';
import qualifications from 'state/qualifications';

const FilterPhotoName = () => {
  const filtersHasDocument = useRecoilValue($filtersHasDocument);
  const filtersHasPhoto = useRecoilValue($filtersHasPhoto);

  const [filter, setFilter] = useRecoilState($filter);

  const [photoName, setPhotoName] = useState(
    [...filter].find(({ type }) => type === 'photoName')?.value
  );

  useEffect(() => {
    if (filtersHasPhoto === false && filtersHasDocument === true) {
      setFilter({ type: 'photoName', value: [] });
      setPhotoName([]);
    }
  }, [filtersHasPhoto, filtersHasDocument, setFilter, setPhotoName]);

  return (
    (filtersHasPhoto || (!filtersHasPhoto && !filtersHasDocument)) && (
      <section style={{ marginBottom: '20px' }}>
        <h3>Nom de la photo</h3>

        <Select
          id="filter-by-photoName"
          multiple
          value={photoName}
          onChange={value => {
            setPhotoName(value);
            setFilter({ type: 'photoName', value });
          }}
          options={qualifications['photo']()}
          labels={{ placeholder: 'Faites votre sélection' }}
        />
      </section>
    )
  );
};

export default FilterPhotoName;

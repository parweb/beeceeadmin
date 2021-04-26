import { useMemo } from 'react';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { Button } from '@salesforce/design-system-react';
import useMedia from 'use-media';

import { $filter, $filters, $modal, $mission } from 'state';
import { FilterModal } from 'components/filter';

const DocumentFilter = () => {
  const isSmall = useMedia({ maxWidth: '710px' });

  const idMission = useRecoilValue($mission);
  const [modal, setModal] = useRecoilState($modal);
  const filter = useRecoilValue($filter);
  const setFilters = useSetRecoilState($filters(idMission));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initialFilter = useMemo(() => filter, [modal.isOpen]);

  const onClose = () => {
    setFilters(initialFilter);
    setModal({ isOpen: false });
  };

  const onDone = () => {
    setModal({ isOpen: false });
  };

  return (
    <Button
      id="btn-filter"
      label={
        <span
          style={{
            margin: '0 auto'
          }}
        >
          Filtrer
        </span>
      }
      onClick={() =>
        setModal({
          onClose,
          isOpen: true,
          content: <FilterModal />,
          heading: 'Filtres',
          footer: [
            <Button id="cancel-filter" label="Annuler" onClick={onClose} />,
            <Button
              id="apply-filter"
              label="Appliquer"
              variant="brand"
              onClick={onDone}
            />
          ],
          directional: true,
          size: 'small'
        })
      }
      style={{
        width: '100%',
        height: '2rem',
        justifyContent: 'start',
        fontSize: isSmall ? '10px' : '15px'
      }}
      iconCategory="standard"
      iconName="filter"
    />
  );
};

export default DocumentFilter;

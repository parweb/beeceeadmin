import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Button } from '@salesforce/design-system-react';

import {
  $documentSelected,
  $mission,
  $documents,
  $isDissociationActive
} from 'state';

import { useConfirmation, useToast } from 'hooks';
import { dissociateDocument } from 'services/document';
import { getName } from 'helpers';

const DissociationToolbar = () => {
  const isDissociationActive = useRecoilValue($isDissociationActive);
  const [selected, setSelect] = useRecoilState($documentSelected);
  const setDocuments = useSetRecoilState($documents);
  const idMiss = useRecoilValue($mission);
  const { addToast } = useToast();

  const name = getName(
    selected[0]?.typeDocument,
    selected[0]?.codeQualification
  );

  const onDone = async () => {
    try {
      await dissociateDocument(selected);

      setSelect('reset');

      setDocuments(documents =>
        documents.filter(
          document =>
            !selected
              .reduce((carry, { idDocNum }) => [...carry, idDocNum], [])
              .includes(document.idDocNum)
        )
      );

      addToast({
        type: 'success',
        heading:
          selected.length === 1
            ? `Le document ${name.label} a bien été dissocié.`
            : `les ${selected?.length} documents sélectionnés ont été dissocié.`
      });
    } catch (e) {
      setSelect('reset');

      addToast({
        type: 'error',
        heading:
          selected.length === 1
            ? `Le document ${name.label} n'a pas pu être dissocié.`
            : `les ${selected?.length} documents sélectionnés n'ont pas pu être dissocié.`
      });
    }
  };

  const openConfirmation = useConfirmation({
    onDone,
    heading: 'Confirmation dissociation',
    message:
      selected.length === 1
        ? `Voulez-vous dissocier ${name.label} de la mission ${idMiss}`
        : `Voulez-vous dissocier les ${selected?.length} documents sélectionnés de la mission ${idMiss}?`
  });

  if (selected.length === 0 || !isDissociationActive) return null;

  return (
    <div
      id="dissociation-actions"
      style={{
        margin: '-10px -10px 0 -10px',
        background: '#f3f2f2',
        position: 'sticky',
        bottom: '0px',
        zIndex: 1,
        padding: '16px',
        textAlign: 'center'
      }}
    >
      <Button onClick={() => setSelect('reset')} label="Annuler" />
      <Button onClick={openConfirmation} label="Dissocier" variant="brand" />
    </div>
  );
};

export default DissociationToolbar;

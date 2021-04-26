import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { Button } from '@salesforce/design-system-react';
import styled from 'styled-components';

import { $mission, $documentSelected, $documents } from 'state';
import { useDocument, useConfirmation, useToast } from 'hooks';
import { dissociateDocument } from 'services/document';

const StyledButton = styled(Button)`
  color: #fff !important;
  background: rgba(0, 0, 0, 0.18);

  &:hover {
    background: ${({ disabled }) => (disabled ? '0000002e' : '#c23934')};
  }
`;

const DocumentItemDissociate = ({ idDocNum, name }) => {
  const idMiss = useRecoilValue($mission);
  const { dissociable, numDos } = useDocument(idDocNum);
  const [select, setSelect] = useRecoilState($documentSelected);
  const setDocuments = useSetRecoilState($documents);
  const { addToast } = useToast();

  const isSelected = select.some(item => item.idDocNum === idDocNum);

  const onDone = async () => {
    try {
      await dissociateDocument({ idDocNum, numDos });

      setDocuments(documents =>
        documents.filter(document => document.idDocNum !== idDocNum)
      );

      addToast({
        type: 'success',
        heading: `Le document ${name.label} a bien été dissocié.`
      });
    } catch (e) {
      addToast({
        type: 'error',
        heading: `Le document ${name.label} n'a pas pu être dissocié.`
      });
    } finally {
      setSelect('reset');
    }
  };

  const openConfirmation = useConfirmation({
    onDone,
    heading: 'Confirmation dissociation',
    message: `Voulez-vous dissocier ${name.label} de la mission ${idMiss} ?`
  });

  return (
    dissociable &&
    !isSelected && (
      <StyledButton
        id="dissociate-item"
        title="Dissocier le document"
        iconSize="large"
        iconCategory="utility"
        iconName="remove_link"
        variant="icon"
        onClick={openConfirmation}
      />
    )
  );
};

export default DocumentItemDissociate;

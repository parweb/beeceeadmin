import { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Button } from '@salesforce/design-system-react';

import { useDocument, useConfirmation, useToast } from 'hooks';
import { $documentName, $documents, $documentTag } from 'state';
import { editDocument } from 'services/document';

const DocumentItemActions = ({ idDocNum, editMode, setEditMode }) => {
  const document = useDocument(idDocNum);

  const [photoAO] = useState(document?.photoAO);
  const [photo418] = useState(document?.photo418);
  const [photoRapport] = useState(document?.photoRapport);

  const { typeDocument, numDos } = useDocument(idDocNum);

  const [name, setName] = useRecoilState($documentName(idDocNum));
  const [documentTag, setDocumentTag] = useRecoilState($documentTag(idDocNum));
  const setDocuments = useSetRecoilState($documents);
  const { addToast } = useToast();

  const onClose = () => {
    setDocumentTag({ photoAO, photo418, photoRapport });
    setName('reset');
    setEditMode(false);
  };

  const onDone = async () => {
    try {
      await editDocument({
        typeDocument,
        idDocNum,
        numDos,
        codeQualification: name.id,
        ...documentTag
      });

      setDocuments(documents =>
        documents.map(document =>
          idDocNum === document.idDocNum
            ? {
                ...document,
                ...documentTag,
                codeQualification: name.id
              }
            : document
        )
      );

      addToast({
        type: 'success',
        heading: `L'édition du document a bien été réalisée.`
      });
    } catch (e) {
      addToast({
        type: 'error',
        heading: `L'édition du document n'a pas pu aboutir.`
      });
    } finally {
      setEditMode(false);
    }
  };

  const openConfirmation = useConfirmation({
    heading: 'Confirmation de modification du document',
    message: 'Voulez-vous confirmer la modification du document ?',
    onClose,
    onDone
  });

  return editMode ? (
    <center>
      <Button onClick={onClose} label="Annuler" />
      <Button onClick={openConfirmation} label="Enregistrer" variant="brand" />
    </center>
  ) : null;
};

export default DocumentItemActions;

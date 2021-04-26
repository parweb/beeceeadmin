import { useCallback } from 'react';
import { Button } from '@salesforce/design-system-react';
import styled from 'styled-components';

import {
  useRecoilValue,
  useSetRecoilState,
  useResetRecoilState,
  useRecoilState
} from 'recoil';

import {
  $mission,
  $documentSelected,
  $documentsCourriers,
  $roleSelected,
  $modal,
  $isRoleValid,
  $recordType
} from 'state';

import { sign } from 'services/signature';
import { useDocument, useConfirmation, useToast } from 'hooks';
import { SignatureModal, SignatureConfirmation } from 'components/signature';
import { getName } from 'helpers';

const StyledButton = styled(Button)`
  color: #fff;
  width: 26px;
  height: 26px;
  background: url('/doc-num-front/sign-doc-white.svg') center center / 20px
    no-repeat #0000002e;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? '0000002e' : '#c23934')};
  }
`;

const Done = ({ idDocNum }) => {
  const roles = useRecoilValue($roleSelected);
  const missionId = useRecoilValue($mission);
  const recordType = useRecoilValue($recordType);
  const document = useDocument(idDocNum);
  const resetRole = useResetRecoilState($roleSelected);
  const setModal = useSetRecoilState($modal);
  const [documentsCourriers, setDocumentsCourriers] = useRecoilState(
    $documentsCourriers
  );
  const isRoleValid = useRecoilValue($isRoleValid);
  const { addToast } = useToast();

  const name = getName(document.typeDocument, document.codeQualification);

  const onDone = useCallback(
    async (roles, documentsCourriers) => {
      try {
        const result = await sign({
          missionId,
          roles,
          recordType,
          documentsCourriers,
          documents: [document]
        });

        if (result === null) {
          throw new Error();
        }

        if (roles.length === 1) {
          addToast({
            type: 'success',
            heading: `Votre demande de Signature est bien traitée, une notification est envoyée à ${roles[0].Name} pour signer les documents sélectionnés.`
          });
        } else {
          addToast({
            type: 'success',
            heading: `Votre demande de Signature est bien traitée, une notification est envoyée à ${roles.length} personnes pour signer les documents sélectionnés.`
          });
        }
      } catch (e) {
        addToast({
          type: 'error',
          heading: `Votre demande de Signature n'a pas pu aboutir.`
        });
      } finally {
        resetRole();
        setDocumentsCourriers({});
        setModal(state => ({
          isOpen: false
        }));
      }
    },
    [
      document,
      addToast,
      missionId,
      recordType,
      resetRole,
      setModal,
      setDocumentsCourriers
    ]
  );

  const openConfirm = useConfirmation({
    labelDone: 'Envoi pour signature',
    onDone,
    message: <SignatureConfirmation documents={[document]} />,
    heading: `Envoyer le document ${name.label} de la mission ${missionId} pour Signature`
  });

  return (
    <Button
      disabled={!isRoleValid}
      id="apply-sign"
      label="Préparer l'envoi"
      variant="brand"
      onClick={() => openConfirm(roles, documentsCourriers)}
    />
  );
};

const DocumentItemSignature = ({ idDocNum, name }) => {
  const idMiss = useRecoilValue($mission);
  const document = useDocument(idDocNum);
  const select = useRecoilValue($documentSelected);
  const resetRole = useResetRecoilState($roleSelected);
  const setModal = useSetRecoilState($modal);

  const isSelected = select.some(item => item.idDocNum === idDocNum);

  const onClose = async () => {
    resetRole();
    setModal(state => ({
      isOpen: false
    }));
  };

  const openModal = () => {
    setModal({
      onClose,
      isOpen: true,
      content: <SignatureModal />,
      heading: `Envoyer le document ${name.label} de la mission ${idMiss} pour Signature`,
      contentStyle: { height: '40vh' },
      footer: [
        <Button id="cancel-sign" label="Annuler" onClick={onClose} />,
        <Done idDocNum={idDocNum} />
      ],
      directional: true,
      size: 'small'
    });
  };

  if (document.signed) {
    return null;
  }

  return document.signable && !isSelected ? (
    <StyledButton
      title="Préparer l'envoi pour signature"
      id="sign-item"
      onClick={openModal}
      variant="icon"
    />
  ) : null;
};

export default DocumentItemSignature;

import {
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
  useResetRecoilState
} from 'recoil';
import { Button } from '@salesforce/design-system-react';

import {
  $documentSelected,
  $documentsCourriers,
  $mission,
  $isSignedActive,
  $modal,
  $roleSelected,
  $isRoleValid,
  $recordType
} from 'state';

import { sign } from 'services/signature';
import { getName } from 'helpers';
import { useConfirmation, useToast } from 'hooks';
import { SignatureModal, SignatureConfirmation } from 'components/signature';

const Done = () => {
  const [selected, setSelect] = useRecoilState($documentSelected);
  const setModal = useSetRecoilState($modal);
  const resetRole = useResetRecoilState($roleSelected);
  const isRoleValid = useRecoilValue($isRoleValid);
  const missionId = useRecoilValue($mission);
  const recordType = useRecoilValue($recordType);
  const setDocumentsCourriers = useSetRecoilState($documentsCourriers);

  const { addToast } = useToast();

  const name = getName(
    selected[0]?.typeDocument,
    selected[0]?.codeQualification
  );

  const openConfirm = useConfirmation({
    labelDone: 'Envoi pour signature',
    onDone: async (roles, documentsCourriers) => {
      try {
        const result = await sign({
          missionId,
          recordType,
          roles,
          documentsCourriers,
          documents: selected
        });

        if (result === null) {
          throw new Error();
        }

        resetRole();
        setSelect('reset');

        setModal(state => ({
          isOpen: false
        }));

        if (roles.length === 1) {
          addToast({
            type: 'success',
            heading: `Votre demande de Signature est bien traitée, une notification est envoyée a ${roles[0].Name} pour signer les documents sélectionnés.`
          });
        } else {
          addToast({
            type: 'success',
            heading: `Votre demande de Signature est bien traitée, une notification est envoyée à ${roles.length} personnes pour signer les documents sélectionnés.`
          });
        }
      } catch (e) {
        resetRole();
        setDocumentsCourriers({});
        setSelect('reset');

        setModal(state => ({
          isOpen: false
        }));

        addToast({
          type: 'error',
          heading: `Votre demande de Signature n'a pas pu aboutir.`
        });
      }
    },
    message: <SignatureConfirmation documents={selected} />,
    heading:
      selected.length === 1
        ? `Envoyer le document ${name.label} de la mission ${missionId} pour Signature`
        : `Envoyer les ${selected?.length} documents sélectionnés de la mission ${missionId} pour Signature`
  });

  return (
    <Button
      disabled={!isRoleValid}
      id="apply-sign"
      label="Préparer l'envoi"
      variant="brand"
      onClick={openConfirm}
    />
  );
};

const SignatureToolbar = () => {
  const isSignedActive = useRecoilValue($isSignedActive);
  const [selected, setSelect] = useRecoilState($documentSelected);
  const idMiss = useRecoilValue($mission);
  const setModal = useSetRecoilState($modal);
  const resetRole = useResetRecoilState($roleSelected);

  const name = getName(
    selected[0]?.typeDocument,
    selected[0]?.codeQualification
  );

  const onClose = () => {
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
      heading:
        selected.length === 1
          ? `Envoyer le document ${name.label} de la mission ${idMiss} pour Signature`
          : `Envoyer les ${selected?.length} documents sélectionnés de la mission ${idMiss} pour Signature`,
      contentStyle: { height: '40vh' },
      footer: [
        <Button id="cancel-sign" label="Annuler" onClick={onClose} />,
        <Done />
      ],
      directional: true,
      size: 'small'
    });
  };

  if (selected.length === 0 || !isSignedActive) return null;

  return (
    <div
      id="signature-actions"
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
      <Button
        onClick={openModal}
        label="Envoi pour signature"
        variant="brand"
      />
    </div>
  );
};

export default SignatureToolbar;

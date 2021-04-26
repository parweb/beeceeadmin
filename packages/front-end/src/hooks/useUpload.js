import { useCallback, useRef } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';

import { $mission, $uploadable, $upload, $documents } from 'state';
import { useToast } from 'hooks';
import { UploadInProgress } from 'components/upload';
import { uploadDocument, getLastDocument } from 'services/document';

const useUpload = () => {
  const ref = useRef();
  const numMis = useRecoilValue($mission);
  const uploadable = useRecoilValue($uploadable);
  const [upload, setUpload] = useRecoilState($upload);
  const [documents, setDocuments] = useRecoilState($documents);
  const { addToast } = useToast();

  ref.current = useCallback(
    callback => {
      if (uploadable) {
        setUpload(list =>
          list.map(item => ({
            ...item,
            delete: <UploadInProgress />,
            state: 'uploading'
          }))
        );

        Promise.all(
          upload
            .filter(({ state }) => state === 'waiting')
            .map(item => {
              uploadDocument({
                mission: parseInt(numMis),
                form: item.file,
                type: item.typeDocument,
                codeQualification: item.qualification.id
              });

              return item;
            })
        )
          .then(async documentsUploaded => {
            const newDocuments = await getLastDocument({
              missionId: numMis,
              previousDocuments: documents,
              documentsUploaded
            });

            setDocuments(documents => [...documents, ...newDocuments]);

            addToast({
              type: 'success',
              heading: `Document ajouté avec succès.`
            });
          })
          .catch(() => {
            addToast({
              type: 'error',
              heading: `Échec d'ajout du document.`
            });
          })
          .finally(() => {
            setUpload([]);
            callback();
          });
      }
    },
    [numMis, uploadable, upload, setUpload, setDocuments, documents, addToast]
  );

  return ref;
};

export default useUpload;

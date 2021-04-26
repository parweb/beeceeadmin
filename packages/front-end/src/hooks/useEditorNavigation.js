import { useHistory, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { $document, $mission, $documentsView } from 'state';

const useEditorNavigation = () => {
  const history = useHistory();
  const isAdvanced = useParams().advanced === 'advanced';

  const idMiss = useRecoilValue($mission);
  const document = useRecoilValue($document);
  const documents = useRecoilValue($documentsView);

  const prev = () => {
    let item;
    for (let i = 0; documents.length >= i; i++) {
      if (documents[i]?.idDocNum === document.idDocNum) {
        item = documents[i - 1]?.idDocNum ?? null;

        break;
      }
    }

    item &&
      history.push(
        `/mission/${idMiss}/document/${item}${isAdvanced ? '/advanced' : ''}`
      );
  };

  const next = () => {
    let item;
    for (let i = 0; documents.length >= i; i++) {
      if (documents[i]?.idDocNum === document.idDocNum) {
        item = documents[i + 1]?.idDocNum ?? null;

        break;
      }
    }
    item &&
      history.push(
        `/mission/${idMiss}/document/${item}${isAdvanced ? '/advanced' : ''}`
      );
  };

  return { prev, next };
};

export default useEditorNavigation;

import { useRecoilValue } from 'recoil';

import { $documentFindById, $documentId } from 'state';

const useDocument = (_id = null) => {
  const id = useRecoilValue($documentId);
  return useRecoilValue($documentFindById(_id || id));
};

export default useDocument;

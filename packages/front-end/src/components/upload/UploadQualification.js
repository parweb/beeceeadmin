import { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { getTypeDocumentFromForm } from 'helpers';
import { $uploadQualification, $uploadFile, $uploadError } from 'state';
import qualifications from 'state/qualifications';
import { Select } from 'components/layout';

const UploadQualification = () => {
  const error = useRecoilValue($uploadError);
  const [errorText, setErrorText] = useState(null);
  const file = useRecoilValue($uploadFile);
  const [qualificationsValue, setUploadQualification] = useRecoilState(
    $uploadQualification
  );

  useEffect(() => {
    if (error && !qualificationsValue) {
      setErrorText('Veuillez sélectionner une qualification');
    } else {
      setErrorText(null);
    }
  }, [qualificationsValue, error, setErrorText]);

  if (file === null) return null;

  const labels =
    getTypeDocumentFromForm(file) === 'photo'
      ? 'Qualification photo'
      : 'Qualification document';

  return (
    <Select
      required
      errorText={errorText}
      value={qualificationsValue}
      onChange={setUploadQualification}
      labels={{ label: labels, placeholder: labels }}
      options={qualifications[getTypeDocumentFromForm(file)]()}
      variant="readonly"
    />
  );
};

export default UploadQualification;

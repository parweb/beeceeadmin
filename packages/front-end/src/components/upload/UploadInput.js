import { useState, useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { $uploadFile, $uploadError, $rulesUpload, $rulesSize } from 'state';

import { format } from 'helpers';

const UploadInput = () => {
  const inputRef = useRef();

  const [errorText, setErrorText] = useState(null);
  const [form, setFormData] = useRecoilState($uploadFile);
  const error = useRecoilValue($uploadError);
  const rulesUpload = useRecoilValue($rulesUpload);
  const rulesSize = useRecoilValue($rulesSize);

  useEffect(() => {
    if (error && !form) {
      setErrorText('Veuillez sélectionner un fichier');
    }
  }, [form, error, setErrorText]);

  useEffect(() => {
    if (!form) {
      inputRef.current.value = '';
    }
  }, [form]);

  const onFileUpload = e => {
    try {
      const file = e.target.files[0];

      const { size, name } = file;
      const rule = rulesSize[format(name)] * 1024 * 1024;

      if (!rulesUpload.includes(format(name))) {
        setErrorText(`le fichier ${name} n'est pas authorisé`);
      } else if (!(rule >= size) && rule !== 0) {
        setErrorText(
          `La taille limit du fichier est de ${
            rule / 1024 / 1024
          } Mb, le votre est de: ${(size / 1024 / 1024).toFixed(2)} Mb`
        );
      } else {
        setErrorText(null);

        const form = new FormData();
        form.append('documents', file);

        setFormData(file ? form : null);
      }
    } catch (_) {
      setFormData(null);
      setErrorText(null);
    }
  };

  return (
    <div className={`slds-form-element ${errorText ? 'slds-has-error' : ''}`}>
      <div className="slds-form-element__control">
        <input
          ref={inputRef}
          onChange={onFileUpload}
          className="slds-input"
          type="file"
          accept={rulesUpload.map(item => `.${item}`).join(',')}
        />
      </div>

      {errorText && <div class="slds-form-element__help">{errorText}</div>}
    </div>
  );
};

export default UploadInput;

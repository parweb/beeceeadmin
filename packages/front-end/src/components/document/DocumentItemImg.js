import { useRecoilValue, useRecoilState } from 'recoil';
import { Link } from 'react-router-dom';
import { Button } from '@salesforce/design-system-react';
import { format } from 'date-fns';

import {
  $mission,
  $documentSelected,
  $isDissociationActive,
  $isSignedActive
} from 'state';

import { DocumentItemDoctype } from 'components/document';
import { useDocument } from 'hooks';

const DocumentItemImg = ({ idDocNum }) => {
  const {
    numDos,
    preview,
    attachments,
    nomFichier,
    signed,
    signedAt
  } = useDocument(idDocNum);
  const isDissociationActive = useRecoilValue($isDissociationActive);
  const isSignedActive = useRecoilValue($isSignedActive);
  const idMiss = useRecoilValue($mission);
  const [select, setSelect] = useRecoilState($documentSelected);

  const isSelected = select.some(item => item.idDocNum === idDocNum);

  return (
    <div
      className="document-item-image"
      onClick={() =>
        (isDissociationActive || isSignedActive) &&
        setSelect({ idDocNum, numDos })
      }
      style={{
        position: 'relative',
        width: '100%',
        paddingTop: '75%',
        cursor: 'pointer',
        borderRadius: '4px 4px 0px 0px',
        background: `url(${preview}&width=350) top center / auto no-repeat`,
        ...(isSelected
          ? { border: '1px solid #0070d2' }
          : { border: '1px solid #dddbda' })
      }}
    >
      {!isDissociationActive && !isSignedActive && (
        <Link to={`/mission/${idMiss}/document/${idDocNum}`}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              textAlign: 'center',
              fontSize: '20px',
              color: 'white'
            }}
          ></div>
        </Link>
      )}

      <DocumentItemDoctype {...{ attachments, nomFichier }} />

      <div style={{ position: 'absolute', bottom: '5px', left: '5px' }}>
        {signed && (
          <Button
            title={`Signé le ${format(signedAt, 'dd/MM/yyyy à HH:mm:ss')}`}
            id="signed-item"
            variant="icon"
            style={{
              width: '40px',
              height: '40px',
              color: '#fff',
              background:
                'url("/doc-num-front/sign-doc-white.svg") center center / 25px no-repeat #0070d2'
            }}
          />
        )}
      </div>
    </div>
  );
};

export default DocumentItemImg;

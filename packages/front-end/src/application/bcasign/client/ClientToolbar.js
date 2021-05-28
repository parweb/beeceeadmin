// import { useRecoilValue } from 'recoil';
import { AiOutlineSave, AiOutlineDownload } from 'react-icons/ai';
// import { VscJson } from 'react-icons/vsc';
// import { BsBraces, BsCardHeading, BsCodeSlash } from 'react-icons/bs';

import { ButtonGroup, Button } from 'layout';

import { $client } from 'states';
import { useParams, useMutation, useToast } from 'hooks';

const ClientToolbar = ({ editorType, setEditorType }) => {
  const { id } = useParams();
  const { addToast } = useToast();
  const [downloadClient] = useMutation($client.download(id));

  if (!id) return null;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between'
      }}
    >
      <div>
        {false && (
          <Button
            onClick={() => {
              addToast({
                type: 'success',
                heading: `Les modification du client sont enregistrer.`
              });
            }}
            leftIcon={<AiOutlineSave />}
          >
            Enregistrer
          </Button>
        )}

        <Button onClick={downloadClient} leftIcon={<AiOutlineDownload />}>
          Télécharger
        </Button>
      </div>

      <div>
        <ButtonGroup
          name="type"
          options={['form', 'json']}
          value={editorType}
          onChange={setEditorType}
        />
      </div>
    </div>
  );
};

export default ClientToolbar;

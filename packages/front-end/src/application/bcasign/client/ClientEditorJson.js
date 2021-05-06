import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import AceEditor from 'react-ace';
import Beautify from 'ace-builds/src-noconflict/ext-beautify';

import { $client } from 'states';
import { useParams } from 'hooks';

import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-monokai';

const ClientEditorJson = () => {
  const { id } = useParams();
  const client = useRecoilValue($client.read(id));
  const [input, setInput] = useState(client);
  const json = JSON.stringify(input, null, 2);

  if (!id) return null;

  return (
    <AceEditor
      commands={Beautify.commands}
      mode="json"
      theme="monokai"
      onChange={value => {
        setInput(JSON.parse(value));
      }}
      name="editor-json"
      width="100%"
      height="100%"
      fontSize={14}
      showPrintMargin={false}
      showGutter={true}
      highlightActiveLine={false}
      value={json}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: false,
        enableSnippets: false,
        showLineNumbers: true,
        tabSize: 2
      }}
    />
  );

  // return (
  //   <textarea
  //     style={{ width: '100%', height: '100%' }}
  //     onChange={e => setInput(JSON.parse(e.target.value))}
  //     value={json}
  //   />
  // );
};

export default ClientEditorJson;

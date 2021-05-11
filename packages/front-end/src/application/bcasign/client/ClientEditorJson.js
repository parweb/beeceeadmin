import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import AceEditor from 'react-ace';
import Beautify from 'ace-builds/src-noconflict/ext-beautify';

import { $client } from 'states';
import { useParams /*, useMutation*/ } from 'hooks';

import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-monokai';

const ClientEditorJson = () => {
  const { id } = useParams();
  const data = useRecoilValue($client.read(id));
  // const [updateClient] = useMutation($client.update(id));

  const client = Object.entries(data).reduce(
    (carry, [key, value]) =>
      key === 'callbackChannels'
        ? {
            ...carry,
            [key]: value.map(({ id, ...props }) => ({ ...props }))
          }
        : { ...carry, [key]: value },
    {}
  );

  const [json, setJson] = useState('');

  useEffect(() => {
    setJson(JSON.stringify(client, null, 2));
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!id) return null;

  return (
    <AceEditor
      commands={Beautify.commands}
      mode="json"
      theme="monokai"
      onChange={value => {
        setJson(value);
        // updateClient(JSON.parse(value));
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

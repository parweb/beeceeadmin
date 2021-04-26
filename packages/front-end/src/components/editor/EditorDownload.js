import { Icon } from '@salesforce/design-system-react';
import axios from 'axios';
import fileDownload from 'js-file-download';

const EditorDownload = ({ url }) => {
  const download = (url, filename) => e => {
    e.preventDefault();

    axios
      .get(url.replace('http', 'https'), {
        responseType: 'blob'
      })
      .then(res => {
        fileDownload(res.data, filename);
      });
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        borderRadius: '50%',
        alignItems: 'center',
        position: 'absolute',
        top: 20,
        right: 10,
        background: '#aaa',
        width: 50,
        height: 50,
        zIndex: 10
      }}
    >
      <a
        style={{ padding: 10 }}
        onClick={download(url, url.split('/').reverse()[0])}
        href={url}
      >
        <Icon
          category="utility"
          size="small"
          name="download"
          colorVariant="base"
        />
      </a>
    </div>
  );
};

export default EditorDownload;

import { $client } from 'states';

const downloadFile = (filename, text) => {
  var element = document.createElement('a');
  element.setAttribute(
    'href',
    'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
  );
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};

const download =
  id =>
  async ({ set, snapshot }, data) => {
    const client = await snapshot.getPromise($client.read(id));

    downloadFile(`client-${id}.json`, JSON.stringify(client, null, 2));
  };

export default download;

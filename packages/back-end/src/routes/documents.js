const axios = require('axios').default;
const handleDocument = require('../documents/handleDocument');
const FormData = require('form-data');

const format = input => input && input.split('.').reverse()[0].toLowerCase();

module.exports = (app, opts, next) => {
  app.get('/documents', async (request, reply) => {
    try {
      const { id: mission } = request.query;

      const [documents, groups] = await Promise.all([
        axios
          .get(`${process.env.API_DOC_NUM}/documents/${mission}`)
          .then(({ data }) => data),
        axios
          .post(`${process.env.API_PREVIEW}/graphql`, {
            query: `{
              groups {
                id
                display
                extensions {
                  id
                  name
                  description
                }
              }
            }`
          })
          .then(({ data }) =>
            data?.errors?.length > 0 ? [] : data?.data?.groups ?? []
          )
      ]);

      const rulesDisplay = groups
        .filter(({ display }) => display === false)
        .flatMap(({ extensions }) => extensions)
        .map(({ name }) => name);

      reply.send(
        await Promise.all(
          documents
            .filter(
              ({ externalUrl }) => !rulesDisplay.includes(format(externalUrl))
            )
            .map(handleDocument)
        )
      );
    } catch (error) {
      console.error(error);
      reply
        .code(error?.response?.status ?? 500)
        .send(error?.response?.data ?? 'something went wrong');
    }
  });

  app.post('/documents/upload', (request, reply) => {
    const { typeDocument, numMission, codeQualification } = request.query;
    const documents = request.body.documents;

    const form = new FormData();
    form.append('documents', Buffer.from(documents.data), {
      filepath: new Date().getTime() + '-' + documents.name,
      contentType: documents.mimetype
    });

    axios
      .post(
        `${process.env.API_DOC_NUM}/documents/upload` +
          `?typeDocument=${typeDocument}` +
          `&numMission=${numMission}` +
          `&codeQualification=${codeQualification}`,
        form,
        { headers: form.getHeaders() }
      )
      .then(({ data }) => {
        reply.code(200).send(data);
      })
      .catch(({ response }) => {
        console.error(response);
        reply.code(response.status).send(response.data);
      });
  });

  app.patch('/document/photo', (request, reply) => {
    const {
      idDocNum,
      numDos,
      codeQualification,
      photoAO,
      photo418,
      photoRapport
    } = request.body;

    axios
      .post(`${process.env.API_DOC_NUM}/photos/`, {
        idDocNum,
        numDos,
        codeQualification,
        photoAO,
        photo418,
        photoRapport
      })
      .then(({ data }) => {
        reply.code(200).send(data);
      })
      .catch(({ response }) => {
        console.error(response);
        reply.code(response.status).send(response.data);
      });
  });

  app.patch('/document/document', (request, reply) => {
    const { idDocNum, numDos, codeQualification } = request.body;

    axios
      .post(`${process.env.API_DOC_NUM}/documents/`, {
        idDocNum,
        numDos,
        codeQualification
      })
      .then(({ data }) => {
        reply.code(200).send(data);
      })
      .catch(({ response }) => {
        console.error(response);
        reply.code(response.status).send(response.data);
      });
  });

  app.post('/document/dissociate', (request, reply) => {
    const { numDos, idDocNum } = request.query;

    axios
      .delete(
        `${process.env.API_DOC_NUM}/dossiers/${numDos}/documents/${idDocNum}`
      )
      .then(({ data }) => {
        reply.code(200).send(data);
      })
      .catch(({ response }) => {
        console.error(response);
        reply.code(response.status).send(response.data);
      });
  });

  app.post('/document/sign', (request, reply) => {
    const body = request.body;

    axios
      .post(`${process.env.API_BCA_SIGN}/sign`, body)
      .then(({ data }) => {
        reply.code(200).send(data);
      })
      .catch(({ response }) => {
        console.error(response);
        reply.code(response.status).send(response.data);
      });
  });

  app.post('/document/notification', (request, reply) => {
    const body = request.body;

    axios
      .post(`${process.env.API_MULSOFT}/doc/signing/activities`, body, {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Basic ${process.env.API_MULSOFT_BASIC}`
        }
      })
      .then(({ data }) => {
        reply.code(200).send(data);
      })
      .catch(({ response }) => {
        console.error(response);
        reply.code(response.status).send(response.data);
      });
  });

  next();
};

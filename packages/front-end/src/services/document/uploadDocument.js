import axios from 'axios';

const uploadDocument = ({ type, mission, form, codeQualification }) =>
  axios.post(
    `${process.env.REACT_APP_API}/documents/upload` +
      `?typeDocument=${type}` +
      `&numMission=${mission}` +
      `&codeQualification=${codeQualification}`,
    form
  );

export default uploadDocument;

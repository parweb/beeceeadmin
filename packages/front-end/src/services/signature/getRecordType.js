import axios from 'axios';

const getRecordType = async ({ dossierId }) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/record/?dossier=${dossierId}`
    );

    return data.RecordType;
  } catch (_) {
    return null;
  }
};

export default getRecordType;

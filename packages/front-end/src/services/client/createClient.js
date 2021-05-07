import axios from 'axios';

const createClient = async (url, data) => {
  try {
    await axios.post(`${url}/clients`, data);
  } catch (_) {
    return null;
  }
};

export default createClient;

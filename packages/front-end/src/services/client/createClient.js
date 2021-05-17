import axios from 'axios';

const createClient = async (service, data) => {
  try {
    await axios.post(`${service.url}/clients`, data);
  } catch (_) {
    return null;
  }
};

export default createClient;

import axios from 'axios';

const allRules = async () => {
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_API}/graphql`, {
      query: `{
        groups {
          id
          display
          size
          upload
          extensions {
            id
            name
            description
          }
        }
      }`
    });

    return data;
  } catch (_) {
    return null;
  }
};

export default allRules;

import axios from 'axios';

const loginAuth = async ({ username, password }) =>
  axios
    .post(process.env.REACT_APP_API + '/auth/login', {
      username,
      password
    })
    .then(({ data }) => data);

export default loginAuth;

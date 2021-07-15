import axios from 'axios';

import { createActivity } from 'services';

const loginAuth = async ({ username, password }) => {
  try {
    return await axios
      .post(`${process.env.REACT_APP_API}/auth/login`, {
        username,
        password
      })
      .then(async ({ data }) => {
        await createActivity('user.login', data.id, data, data.id);
        return data ?? null;
      });
  } catch (error) {
    throw error;
  }
};

export default loginAuth;

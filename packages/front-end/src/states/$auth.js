import { atom } from 'recoil';

import { persistState } from 'helpers';

const $auth = atom({
  key: 'auth',
  default: { isAuthenticated: false },
  effects_UNSTABLE: [persistState('auth')]
});

export default $auth;

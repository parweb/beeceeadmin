import { atomFamily } from 'recoil';

import { persistState } from 'helpers';

const $value = atomFamily({
  key: 'value',
  default: null,
  effects_UNSTABLE: id => [persistState('value_' + id)]
});

export default $value;

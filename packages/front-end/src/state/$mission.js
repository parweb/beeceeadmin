import { atom, selector } from 'recoil';

const $missionId = atom({
  key: 'missionId',
  default: ''
});

const $mission = selector({
  key: 'mission',
  get: ({ get }) => get($missionId),
  set: ({ set, reset, get }, value) => {
    set($missionId, value);
  }
});

export default $mission;

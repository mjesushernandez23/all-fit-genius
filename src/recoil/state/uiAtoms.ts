import { atom } from 'recoil';

export const isLoadingAtom = atom<boolean>({
  key: 'isLoadingAtom',
  default: false,
});

import { atom } from 'recoil';
import type { UserProps } from '@models';

interface UserInfoAtom extends Omit<UserProps, 'password'> {}

export const userInfoAtom = atom<UserInfoAtom | null>({
  key: 'userInfoAtom',
  default: null,
});

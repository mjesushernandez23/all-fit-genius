import { AlertProps } from '@mui/material';
import { atom } from 'recoil';

export const isLoadingAtom = atom<boolean>({
  key: 'isLoadingAtom',
  default: false,
});

interface MessageSnackBar {
  message: string;
  severity: AlertProps['severity'];
  timeout?: number;
}
export const messageSnackBarAtom = atom<MessageSnackBar | null>({
  key: 'messageSnackBarAtom',
  default: null,
});

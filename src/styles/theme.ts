import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { blue, red } from '@mui/material/colors';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: blue,
    secondary: red,
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;

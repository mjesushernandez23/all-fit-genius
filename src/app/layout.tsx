//dependencies
import type { Metadata } from 'next';
//state
import RecoilProvider from 'src/recoil/RecoilProvider';
//hooks
//material
import ThemeRegistry from '@styles/ThemeRegistry';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
//interfaces
//utils
//styles
import '@styles/globals.css';

export const metadata: Metadata = {
  title: '',
  description: '',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <RecoilProvider>
          <ThemeRegistry>
            <AppBar position="fixed" sx={{ zIndex: 2000 }}>
              <Toolbar >
                <Typography variant="h6" noWrap component="div">
                  Next.js App Router
                </Typography>
              </Toolbar>
            </AppBar>
            {children}
          </ThemeRegistry>
        </RecoilProvider>
      </body>
    </html>
  );
}

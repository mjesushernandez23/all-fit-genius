'use client';
//dependencies
import { useState } from 'react';
import Link from 'next/link';
//state
import RecoilProvider from '@/recoil/RecoilProvider';
//hooks
//material
import ThemeRegistry from '@styles/ThemeRegistry';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
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
import type { Metadata } from 'next';
import type { ReactNode, FC } from 'react';
//utils
//styles
import '@styles/globals.css';
import Loading from '@/components/Ui/Loading';
import SnackBar from '@/components/Ui/SnackBar';
import SessionAuthProvider from '@/utils/SessionAuthProvider';

interface RootLayoutProps {
  children: ReactNode;
  window?: Window;
}

const navItems = [
  { route: '/', title: 'Home' },
  { route: '/auth/login', title: 'Entrar' },
];

const RootLayout: FC<RootLayoutProps> = ({ children, window }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);

  const container = window !== undefined ? () => window.document.body : undefined;

  return (
    <html lang="es" id="__next">
      <body>
        <SessionAuthProvider>
          <RecoilProvider>
            <ThemeRegistry>
              <Box className="flex">
                <AppBar position="fixed" className="z-[2000]">
                  <Toolbar>
                    <IconButton className="text-inherit mr-2 sm:hidden" aria-label="open drawer" edge="start" onClick={handleDrawerToggle}>
                      <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" className="flex-grow hidden sm:block">
                      All Fit Genius
                    </Typography>
                    <Box className="hidden sm:block">
                      {navItems.map(({ route, title }, i) => (
                        <Button href={route} LinkComponent={Link} key={`desktop-link-${i}`} variant="text" className="text-white">
                          {title}
                        </Button>
                      ))}
                    </Box>
                  </Toolbar>
                </AppBar>
                <nav>
                  <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    className="sm:hidden"
                    classes={{ paper: 'w-[240px]' }}
                  >
                    <Box className="text-center" onClick={handleDrawerToggle}>
                      <Typography variant="h6" className="my-2">
                        All Fit Genius
                      </Typography>
                      <Divider />
                      <List>
                        {navItems.map(({ route, title }, i) => (
                          <ListItem key={`mobile-link-${i}`} disablePadding>
                            <ListItemButton href={route} className="text-center" LinkComponent={Link} sx={{ textAlign: 'center' }}>
                              <ListItemText primary={title} />
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  </Drawer>
                </nav>
                <Box component="main" className="p-4">
                  <Toolbar />
                  {children}
                </Box>
                <Loading />
                <SnackBar />
              </Box>
            </ThemeRegistry>
          </RecoilProvider>
        </SessionAuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;

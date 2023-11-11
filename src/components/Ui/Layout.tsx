'use client';
//dependencies
//state
import RecoilProvider from '@/recoil/RecoilProvider';
//hooks
//material

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
//interfaces
import type { Metadata } from 'next';
import type { ReactNode, FC } from 'react';
//utils
import { navLinksPublic } from '@constants';
//styles
import Loading from '@/components/Ui/Loading';
import SnackBar from '@/components/Ui/SnackBar';
import NavBar from '@/components/Ui/NavBar';

interface RootLayoutProps {
  children: ReactNode;
  window?: Window;
}

const RootLayout: FC<RootLayoutProps> = ({ children, window }) => {
  return (
    <RecoilProvider>
      <Box className="flex">
        <NavBar window={window} links={navLinksPublic} />
        <Box component="main" className="p-4">
          <Toolbar />
          {children}
        </Box>
        <Loading />
        <SnackBar />
      </Box>
    </RecoilProvider>
  );
};

export default RootLayout;

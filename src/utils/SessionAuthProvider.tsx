'use client';
//dependencies
import { SessionProvider } from 'next-auth/react';
import { FC, ReactNode } from 'react';
//state
//hooks
//material
//utils
//interfaces
//others
interface SessionAuthProviderProps {
  children: ReactNode;
}
const SessionAuthProvider: FC<SessionAuthProviderProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionAuthProvider;

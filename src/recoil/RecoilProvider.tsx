'use client';
import { RecoilRoot } from 'recoil';
import type { ReactNode } from 'react';

interface RecoilProviderProps {
  children: ReactNode;
}

const RecoilProvider = ({ children }: RecoilProviderProps) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export default RecoilProvider;

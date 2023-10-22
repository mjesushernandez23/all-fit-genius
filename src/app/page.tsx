'use client';
import { useRecoilValue } from 'recoil';
import { isLoadingAtom } from '@atoms';

export default function Home() {
  const isLoading = useRecoilValue(isLoadingAtom);
}

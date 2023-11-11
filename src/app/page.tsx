'use client';
import { useRecoilValue } from 'recoil';
import { isLoadingAtom } from '@atoms';
import LoginButton from '@/components/Ui/LoginButton';

export default function Home() {
  const isLoading = useRecoilValue(isLoadingAtom);
  return (
    <div>
      rtes
      <LoginButton></LoginButton>
    </div>
  );
}

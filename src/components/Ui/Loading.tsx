//dependencies
import { FC } from 'react';
//state
//hooks
import { useRecoilValue } from 'recoil';
import { isLoadingAtom } from '@/recoil/state';
//material
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
//utils
//interfaces
//others
interface LoadingProps {}
const Loading: FC<LoadingProps> = (props) => {
  const isLoading = useRecoilValue(isLoadingAtom);

  return (
    <Backdrop className="text-white z-[20001]" open={isLoading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loading;

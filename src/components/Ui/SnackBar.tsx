//dependencies
import { FC, forwardRef } from 'react';
//state
import { useRecoilState } from 'recoil';
import { messageSnackBarAtom } from '@/recoil/state';
//hooks
//material
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
//utils
//interfaces
//others

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface SnackBarProps {}
const SnackBar: FC<SnackBarProps> = (props) => {
  const [message, setMessage] = useRecoilState(messageSnackBarAtom);

  const handleClose = () => {};

  return (
    <Snackbar open={Boolean(message)} autoHideDuration={message?.timeout ?? 6000} onClose={handleClose}>
      <Alert severity={message?.severity} className="w-full">
        {message?.message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;

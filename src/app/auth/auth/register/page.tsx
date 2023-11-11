import RegisterForm from '@/components/Auth/RegisterForm';
import Typography from '@mui/material/Typography';
import type { NextPage } from 'next';

const Page: NextPage = () => {
  return (
    <>
      <Typography className="mb-4" component={"h3"} variant='h5'>Regístrate</Typography>
      <RegisterForm />
    </>
  );
};

export default Page;

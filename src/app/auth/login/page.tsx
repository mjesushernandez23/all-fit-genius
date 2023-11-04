'use client';
//dependencies
//state
//hooks
//material

import LoginForm from '@/components/Auth/LoginForm';
import Typography from '@mui/material/Typography';
//utils
//interfaces
import { NextPage } from 'next';
//others

const Login: NextPage = () => {
  return (
    <>
      <Typography className="mb-4" component={"h3"} variant='h5'>Ingresa</Typography>
      <LoginForm />
    </>
  );
};

export default Login;

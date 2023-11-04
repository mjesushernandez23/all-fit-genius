'use client';
//dependencies
import { FC } from 'react';
import { useFormik } from 'formik';
import Link from 'next/link';
//state
import { useSetRecoilState } from 'recoil';
import { userInfoAtom, isLoadingAtom, messageSnackBarAtom } from '@atoms';
//hooks
//material
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
//utils
import { loginUserValidation } from '@validations';
import { myFetch } from '@/utils';
//interfaces
import type { ResponseLogin } from '@models';

//others

interface LoginFormProps {}
const LoginForm: FC<LoginFormProps> = (props) => {
  const setLoading = useSetRecoilState(isLoadingAtom);
  const setMessage = useSetRecoilState(messageSnackBarAtom);
  const setUserInfo = useSetRecoilState(userInfoAtom);

  const { values, errors, handleChange, handleBlur, handleSubmit, resetForm } = useFormik({
    ...loginUserValidation,
    onSubmit: async (values) => {
      setLoading(true);
      await myFetch
        .put<ResponseLogin>('auth', values)
        .then(({ data }) => {
          setMessage({ message: 'Se ingreso correctamente', severity: 'success' });
          setUserInfo(data.user);
        })
        .catch(() => {
          setMessage({ message: 'Ops! ocurrió un error inesperado, vuelve a intentarlo', severity: 'error' });
          resetForm();
        });
      setLoading(false);
    },
  });

  return (
    <Paper className="p-4 flex flex-wrap gap-4" component={'form'} onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Correo"
        name="email"
        type="email"
        placeholder="email@correo.com"
        error={Boolean(errors.email)}
        helperText={errors.email}
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <TextField
        fullWidth
        label="Contraseña"
        name="password"
        type="password"
        error={Boolean(errors.password)}
        value={values.password}
        helperText={errors.password}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Box className="w-full flex-col flex gap-4 items-center justify-center">
        <Button type="submit">Entrar</Button>
        <Button className="text-white" variant="text" href="/auth/register" LinkComponent={Link}>
          No tienes una cuenta?
        </Button>
      </Box>
    </Paper>
  );
};

export default LoginForm;

'use client';
//dependencies
import { FC } from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
//state
import { useSetRecoilState } from 'recoil';
import { isLoadingAtom, messageSnackBarAtom } from '@/recoil/state';
//hooks
//material
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
//utils
import { myFetch } from '@utils';
import { registerUserValidation } from '@validations';
import Link from 'next/link';
//interfaces
//others

interface RegisterFormProps {}
const RegisterForm: FC<RegisterFormProps> = (props) => {
  const setLoading = useSetRecoilState(isLoadingAtom);
  const setMessage = useSetRecoilState(messageSnackBarAtom);

  const router = useRouter();

  const { values, errors, handleChange, handleBlur, handleSubmit } = useFormik({
    ...registerUserValidation,
    onSubmit: async (values) => {
      setLoading(true);
      await myFetch
        .post('auth', { ...values, role: 2 })
        .then(() => {
          setMessage({ message: 'Se creo la cuenta correctamente', severity: 'success' });
          router.push('/auth/login');
        })
        .catch(() => setMessage({ message: 'Ops! ocurrió un error inesperado, vuelve a intentarlo', severity: 'error' }));
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
      <Box className="flex flex-col justify-center mx-auto">
        <Button type="submit">Registrarse</Button>
        <Button href="/auth/login" LinkComponent={Link} variant="text">
          Ya tienes cuenta?
        </Button>
      </Box>
    </Paper>
  );
};

export default RegisterForm;

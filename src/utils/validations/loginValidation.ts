import { object, string } from 'yup';

export const loginUserValidation = {
  initialValues: {
    email: '',
    password: '',
  },
  validationSchema: object({
    email: string().email('Introduce un correo valido').required('El correo es obligatorio'),
    password: string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('El correo es obligatorio'),
  }),
};

export const registerUserValidation = {
  initialValues: {
    email: '',
    password: '',
  },
  validationSchema: object({
    email: string().email('Introduce un correo valido').required('El correo es obligatorio'),
    password: string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .required('La contraseña es obligatorio')
      .max(40, 'La contraseña debe tener menos de 40 caracteres'),
  }),
};

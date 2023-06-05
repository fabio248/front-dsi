import * as yup from 'yup';

export function initialValues() {
  return {
    firstName: '',
    lastName: '',
    email: '',
    birthday: '',
    password: '',
    role: '',
  };
}

export function validationSchemaRegister() {
  return yup.object({
    firstName: yup.string().required('campo obligatorio'),
    lastName: yup.string().required('campo obligatorio'),
    email: yup
      .string()
      .email('El email no es válido')
      .required('campo obligatorio'),
    birthday: yup.string().required('campo obligatorio'),
    password: yup.string().required('campo obligatorio'),
    role: yup.string().required('campo obligatorio'),
  });
}

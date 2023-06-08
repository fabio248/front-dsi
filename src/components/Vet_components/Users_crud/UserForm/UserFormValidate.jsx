import * as yup from 'yup';

export function initialValues(user) {
  if (user) {
    const { birthday } = user;
    const newBirthday = birthday.split('T');
  }
  return {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    birthday: user?.birthday || '',
    password: '',
    role: user?.role || '',
    phone: user?.phone || '',
    direction: user?.direction || '',
    DUI: user?.dui || '',
  };
}

export function validationSchemaRegister(user) {
  return yup.object({
    firstName: yup.string().required('campo obligatorio'),
    lastName: yup.string().required('campo obligatorio'),
    email: yup
      .string()
      .email('El email no es válido')
      .required('campo obligatorio'),
    birthday: yup.string().required('campo obligatorio'),
    password: user ? yup.string() : yup.string().required('campo obligatorio'),
    role: yup.string().required('campo obligatorio'),
    phone: yup.string().required('campo obligatorio'),
    direction: yup.string().required('campo obligatorio'),
    DUI: yup.string().required('campo obligatorio'),
  });
}

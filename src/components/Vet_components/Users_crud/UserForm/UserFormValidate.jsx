import * as yup from 'yup';
import { format } from 'date-fns';

export function initialValues(user) {
  let newBirthday;
  if (user) {
    newBirthday = user.birthday.split('T')[0];
    const [year, month, day] = newBirthday.split('-');
    newBirthday = `${day}/${month}/${year}`;
  }

  return {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    birthday: user ? newBirthday : '',
    password: '',
    role: user?.role || '',
    phone: user?.phone || '',
    direction: user?.direction || '',
    dui: user?.dui || '',
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
    dui: yup.string().required('campo obligatorio'),
  });
}

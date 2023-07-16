import * as yup from 'yup';
import { format, parse } from 'date-fns';
import { isValid } from 'date-fns';

export function initialValues(user) {
  let newBirthday, dateObject;
  if (user) {
    newBirthday = user.birthday.split('T')[0];
    const [year, month, day] = newBirthday.split('-');
    newBirthday = `${day}/${month}/${year}`;
    dateObject = parse(newBirthday, 'dd/MM/yyyy', new Date());
  }

  return {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    birthday: user ? dateObject : null,
    password: '',
    role: user?.role || '',
    phone: user?.phone || '',
    direction: user?.direction || '',
    dui: user?.dui || '',
  };
}

export function validationSchemaRegister(user) {
  return yup.object({
    firstName: yup.string().required('El nombre es obligatorio'),
    lastName: yup.string().required('El apellido es obligatorio'),
    email: yup
      .string()
      .email('El email no es válido')
      .required('El email obligatorio'),
    birthday: yup
      .date()
      .max(new Date(), 'La fecha no puede ser posterior al día de hoy')
      .transform((value, originalValue) => {
        if (originalValue) {
          const date = new Date(originalValue);
          return isValid(date) ? date : new Date('invalid');
        }
        return null;
      })
      .required('La fecha es requerida')
      .typeError('Ingrese una fecha válida'),
    password: user
      ? yup.string()
      : yup.string().required('La contraseña es obligatoria'),
    role: yup
      .string()
      .oneOf(['admin', 'client'])
      .required('El campo de rol solo acepta admin o client'),
    phone: yup
      .string()
      .matches(/^\d{4}-\d{4}$/, 'El teléfono debe tener el formato 0000-0000')
      .required('El teléfono es obligatorio'),
    direction: yup
      .string()
      .min(5, 'La dirección debe ser válida')
      .required('La dirección es obligatoria'),
    dui: yup
      .string()
      .matches(/^\d{8}-\d$/, 'El DUI debe tener el formato 00000000-0')
      .required('El DUI es obligatorio'),
  });
}

import * as yup from 'yup';
import { format, parse } from 'date-fns';
import { isValid } from 'date-fns';

export function initialValues(user) {
  let dateObject;
  if (user) {
    dateObject = parse(user.birthday, 'dd/MM/yyyy', new Date());
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
      .trim()
      .email('El email no es válido')
      .notRequired(),
    birthday: yup
      .date()
      .nullable()
      .max(new Date(), 'La fecha no puede ser posterior al día de hoy')
      .transform((value, originalValue) => {
        if (originalValue) {
          const date = new Date(originalValue);
          return isValid(date) ? date : new Date('invalid');
        }
        return null;
      })
      .notRequired(),
    password: yup.string().notRequired(),
    role: yup
      .string()
      .oneOf(['admin', 'client'], 'El campo de rol solo acepta admin o client')
      .notRequired(),
    phone: yup
      .string()
      .matches(/^\d{4}-\d{4}$/, 'El teléfono debe tener el formato 0000-0000')
      .required('El teléfono es obligatorio'),
    direction: yup
      .string()
      .min(5, 'La dirección debe ser válida')
      .notRequired(),
    dui: yup
      .string()
      .matches(/^\d{8}-\d$/, {
        message: 'El DUI debe tener el formato 00000000-0',
        excludeEmptyString: true,
      })
      .notRequired(),
  });
}

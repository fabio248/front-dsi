import * as yup from 'yup';
import { format, isValid } from 'date-fns';

export function initialValues(event) {
  let newStartdate;
  if (event) {
    newStartdate = event.startdate.split('T');
    newStartdate = format(new Date(newStartdate[0]), 'dd-MM-yyyy HH:mm');
  }
  return {
    startdate: event ? newStartdate : '',
    endDate: event ? newEndDate : '',
    nameEvent: event?.nameEvent || '',
    descripcion: event?.descripcion || '',
    firstName: event?.firstName || '',
    lastName: event?.lastName || '',
    email: event?.email || '',
  };
}

export function validationSchemaRegister(event) {
  return yup.object({
    startdate: yup
      .date()
      .min(new Date(), 'La fecha no puede ser anterior al día de hoy')
      .transform((value, originalValue) => {
        if (originalValue) {
          const date = new Date(originalValue);
          return isValid(date) ? date : new Date('invalid');
        }
        return null;
      })
      .required('La fecha es requerida')
      .typeError('Ingrese una fecha válida'),
    nameEvent: yup.string().required('campo obligatorio'),
    descripcion: yup.string().required('campo obligatorio'),
    firstName: yup.string().required('campo obligatorio'),
    lastName: yup.string().required('campo obligatorio'),
    email: yup
      .string()
      .email('El email no es válido')
      .required('campo obligatorio'),
  });
}

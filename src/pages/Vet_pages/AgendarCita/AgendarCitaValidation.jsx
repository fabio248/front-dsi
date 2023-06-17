import * as yup from 'yup';
import { format, isValid } from 'date-fns';

export function initialValues(event) {
  let newStartDate;
  if (event) {
    newStartDate = event.startdate.split('T');
    newStartDate = format(new Date(newStartDate[0]), 'dd/MM/yyyy HH:mm');
  }
  return {
    startDate: event ? newStartDate : '',
    endDate: event ? newEndDate : '',
    name: event?.name || '',
    descripcion: event?.descripcion || '',
    firstName: event?.firstName || '',
    lastName: event?.lastName || '',
    emailClient: event?.emailClient || '',
  };
}

export function validationSchemaRegister(event) {
  return yup.object({
    startDate: yup
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
    name: yup.string().required('campo obligatorio'),
    descripcion: yup.string().required('campo obligatorio'),
    firstName: yup.string().required('campo obligatorio'),
    lastName: yup.string().required('campo obligatorio'),
    emailClient: yup
      .string()
      .email('El email no es válido')
      .required('campo obligatorio'),
  });
}

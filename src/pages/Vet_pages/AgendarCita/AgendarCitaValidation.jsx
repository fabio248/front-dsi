import * as yup from 'yup';
import { format, isValid } from 'date-fns';

export function initialValues(event) {
  let newStartDate, newEndDate;
  if (event) {
    newStartDate = format(new Date(event.startDate), 'dd/MM/yyyy hh:mm a');
    startDateObject = parse(newStartDate, 'dd/MM/yyyy hh:mm a', new Date());

    newEndDate = format(new Date(event.endDateate), 'dd/MM/yyyy hh:mm a');
    endDateObject = parse(newEndDate, 'dd/MM/yyyy hh:mm a', new Date());
  }
  return {
    startDate: event? startDateObject : null,
    endDate: event? endDateObject : null,
    name: event?.name || '',
    descripcion: event?.descripTion || '',
    firstName: event?.firstName || '',
    lastName: event?.lastName || '',
    emailClient: event?.email || '',
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
      .matches(/^[A-Za-z0-9._%+-]+@gmail\.com$/, 'La creación de citas es exclusiva para cliente con una cuenta de Google')
      .required('campo obligatorio'),
  });
}

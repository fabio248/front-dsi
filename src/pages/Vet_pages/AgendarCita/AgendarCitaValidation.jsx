import * as yup from 'yup';
import { format, isValid } from 'date-fns';


export const typesAppointments = [
  { label: 'Consulta General', value: 'Consulta General' },
  { label: 'Cirugía General', value: 'Cirugía General' },
  { label: 'Esterilización',value: 'Esterilización' },
  { label: 'Vacunación',value: 'Vacunación' },
  { label: 'Limpieza Dental', value: 'Limpieza Dental' },
  { label: 'Desparacitación',value: 'Desparacitación' },
];
export const initialValues = {
    startDate:  null,
    endDate: null,
    name: null,
    description: '',
    firstName: '',
    lastName:  '',
    emailClient: null,
}

export const validationSchemaRegister= yup.object({
    startDate: yup
      .date()
      .required('La fecha es requerida'),

      endDate: yup
      .date()
      .required('La fecha es requerida'),

    name: yup.object().required('El motivo de la Consulta es obligatorio'),
    description: yup.string().required('campo obligatorio'),
    firstName: yup.string().required('campo obligatorio'),
    lastName: yup.string().required('campo obligatorio'),
    emailClient: yup
      .object()
      .required('Correo obligatorio'),
});



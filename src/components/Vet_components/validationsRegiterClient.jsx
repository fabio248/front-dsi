import * as yup from 'yup';

export function RegisterClientValidations() {
  return yup.object({
    firstName: yup.string().required('Campo obligatorio'),
    lastName: yup.string().required('Campo obligatorio'),
    Direction: yup.string().required('Campo obligatorio'),
    DUI: yup.string().required('Campo obligatorio'),
    nacionalidad: yup.string().required('Campo obligatorio'),
  });
}

export function initialData() {
  return {
    firstName: '',
    lastName: '',
    password: '',
    email: '',
    repeatPassword: '',
    fechaNacimiento: '',
  };
}

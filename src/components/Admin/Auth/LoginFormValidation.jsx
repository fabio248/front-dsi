import * as yup from 'yup';

//para la validacion de los datos del formulario se uso yup
export function LoginFormvalidations() {
  return yup.object({
    email: yup
      .string().trim()
      .email('El email no es válido')
      .required('Campo obligatorio'),
    password: yup.string().required('Campo obligatorio'),
  });
}

export function initialData() {
  return {
    email: '',
    password: '',
  };
}

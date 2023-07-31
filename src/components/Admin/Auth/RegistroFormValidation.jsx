import * as yup from "yup";
import { format, parse } from 'date-fns';
import { isValid } from 'date-fns';

//para la validacion de los datos del formulario se uso yup
export function RegisterFormvalidations() {
  return yup.object({
    firstName: yup.string().required("Campo nombre obligatorio"),
    lastName: yup.string().required("Campo apellido obligatorio"),
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
    email: yup
      .string().trim()
      .email("El email no es válido")
      .required("Campo obligatorio"),
    password: yup.string().required("Campo obligatorio"),
    repeatPassword: yup
      .string()
      .required("Campo obligatorio")
      .oneOf([yup.ref("password")], "Las contraseñas no coinciden"),
});
}

export function initialData(){
  return {
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    repeatPassword: "",
    birthday: null };
}
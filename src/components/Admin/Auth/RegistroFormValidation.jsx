import * as yup from "yup";

//para la validacion de los datos del formulario se uso yup
export function RegisterFormvalidations() {
  return yup.object({
    firstName: yup.string().required("Campo obligatorio"),
    lastName: yup.string().required("Campo obligatorio"),
    fechaNacimiento: yup.date().required("La fecha es obligatoria"),
    email: yup
      .string()
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
    fechaNacimiento: "" };
}
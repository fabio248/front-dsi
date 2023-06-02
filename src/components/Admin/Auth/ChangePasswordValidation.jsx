import * as yup from "yup";

//para la validacion de los datos del formulario se uso yup
export function ForgotPasswordValidation() {
    return yup.object({
        email: yup
      .string()
      .email("El email no es válido")
      .required("Campo obligatorio")
    });
}

export function ForgotPassInitialData(){
    return {
      email: ""
    };
}

export function ChangePasswordValidation() {
    return yup.object({
      password: yup.string().required("Campo obligatorio"),
      repeatPassword: yup
        .string()
        .required("Campo obligatorio")
        .oneOf([yup.ref("password")], "Las contraseñas no coinciden"),
  });
}

export function ChangePassInitialData(){
    return {
      password: "",
      repeatPassword: ""
    };
}

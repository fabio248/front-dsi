import * as yup from 'yup';

export const initialValuesBills = {

        clientId:"",
        billsDetails: [
        {
            quantity: "",
            productId:""
        }
      ]
}

export const validateBillsCreate = yup.object({
    clientId: yup.string().required('El cliente es requerido'),
    billsDetails: yup.array().of(yup.object().shape({
        quantity: yup.string().required('La cantidad es requerido'),
        productId: yup.string().required('El producto es requerido'),
    })),
})
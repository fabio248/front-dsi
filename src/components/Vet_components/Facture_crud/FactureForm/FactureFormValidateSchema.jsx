import * as yup from 'yup';

export const initialValuesBills = {

        clientId: 0,
        billsDetails: [
        {
            quantity: 0,
            productId: 0
        }
      ]
}

export const validateBillsCreateSchema = yup.object({
    clientId: yup.number().integer().required('El cliente es requerido'),
    billsDetails: yup.array().of(yup.object().shape({
        quantity: yup.number().integer().required('La cantidad es requerido'),
        productId: yup.number().integer().required('El producto es requerido'),
    })),
})
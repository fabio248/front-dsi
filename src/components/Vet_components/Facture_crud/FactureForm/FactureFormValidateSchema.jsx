import * as yup from 'yup';

export const initialValuesBills = {
        clientId: null,
        firstName: '',
        lastName: '',
        billsDetails: [
        {
            quantity: null,
            productId: null,
        }
      ]
}

export const validateBillsCreateSchema = yup.object({
    clientId: yup.object().required('El cliente es requerido'),
    firstName: yup.string().optional(),
    lastName: yup.string().optional(),
    billsDetails: yup.array().of(yup.object().shape({
        quantity: yup.number().integer().required('Cantidad requerida'),
        productId: yup.object().required('El producto es requerido')
    })).min(1, 'Debe agregar al menos un producto')
})
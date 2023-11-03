import * as yup from 'yup';
import {isValid} from "date-fns";

export const initialValuesHealthCertificatePdf = {
    destinationAdress: '',
    codePostal: '',
    vaccines: [
        {
            dayAplication: null,
            vaccineName: '',
            BrandAndLot: ''
        }
    ],
    dateJourney: null,
}

export const validateHealthCertificatePdfSchema = yup.object({
    destinationAdress: yup.string().required('La dirección destino es requerido'),
    codePostal: yup.string().required('El codigo postal es requerido'),
    dateJourney: yup
        .date()
        .transform((value, originalValue) => {
            if (originalValue) {
                const date = new Date(originalValue);
                return isValid(date) ? date : new Date('invalid');
            }
            return null;
        })
        .required('La fecha de viaje es requerida')
        .typeError('Ingrese una fecha válida'),
    vaccines: yup.array().of(yup.object().shape({
        dayAplication: yup
            .date()
            .transform((value, originalValue) => {
                if (originalValue) {
                    const date = new Date(originalValue);
                    return isValid(date) ? date : new Date('invalid');
                }
                return null;
            })
            .required('La fecha aplicación es requerida')
            .typeError('Ingrese una fecha válida'),
        vaccineName: yup.string().required('Nombre de la vacuna es requerido'),
        BrandAndLot: yup.string().required('Este campo es requerido')
    })),
})
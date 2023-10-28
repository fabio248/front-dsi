import * as yup from 'yup';

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
    dateJourney: yup.string().required('La fecha de viaje es requerido'),
    vaccines: yup.array().of(yup.object().shape({
        dayAplication: yup.string().required('Dia de aplicación es requerido'),
        vaccineName: yup.string().required('Nombre de la vacuna es requerido'),
        BrandAndLot: yup.string().required('Este campo es requerido')
    })),
})
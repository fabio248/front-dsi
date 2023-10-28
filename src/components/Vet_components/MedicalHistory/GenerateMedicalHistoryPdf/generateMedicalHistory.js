import * as yup from "yup";

export const initialValuesMedicalHistoryPdf = {
    clinicalNumber: "",
    moreImportsData: "",
    deworming: [
        {
            dayAplicationInitDeworming: null,
            dayAplicationFinalDeworming: null,
            dewormingName: '',
            dose: '',
        }
    ],
    vaccines: [
        {
            dayAplicationInit: null,
            dayAplicationfinal: null,
            vaccineName: '',
        }
    ],
    celos: [
        {
            dayAplicationInitCelos: null,
            dayAplicationFinalCelos: null
        }
    ]
}

export const validateMedicalHistoryPdfSchema = yup.object({
    clinicalNumber: yup.string().required('El número clínico es requerido'),
    moreImportsData: yup.string(),
    deworming: yup.array().of(yup.object().shape({
        dayAplicationInitDeworming: yup.string().required('Dia de aplicación es requerido'),
        dayAplicationFinalDeworming: yup.string().required('Dia de próximo refuerzo es requerido'),
    })),
    vaccines: yup.array().of(yup.object().shape({
        dayAplicationInit: yup.string().required('Dia de aplicación es requerido'),
        dayAplicationfinal: yup.string().required('Dia de próximo refuerzo es requerido'),
        vaccineName: yup.string().required('Nombre de la vacuna es requerido'),
    })),
    celos: yup.array().of(yup.object().shape({
        dayAplicationInitCelos: yup.string(),
        dayAplicationFinalCelos: yup.string(),
    }))
})
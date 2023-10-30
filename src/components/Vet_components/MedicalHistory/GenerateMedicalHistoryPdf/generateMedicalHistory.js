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
            dayAplicationInitCelos: '',
            dayAplicationFinalCelos: ''
        }
    ]
}

export const validateMedicalHistoryPdfSchema = yup.object({
    clinicalNumber: yup.string().required('El número clínico es requerido'),
    moreImportsData: yup.string(),
    deworming: yup.array().of(yup.object().shape({
        dayAplicationInitDeworming: yup.string().required('Dia de aplicación es requerido'),
        dayAplicationFinalDeworming: yup.string().required('Dia de próximo refuerzo es requerido'),
        dewormingName: yup.string().required('Desparasitante es requerido'),
        dose: yup.string().required('Dosis es requerido'),
    })).min(1, 'Debe agregar al menos un desparasitante'),
    vaccines: yup.array().of(yup.object().shape({
        dayAplicationInit: yup.string().required('Dia de aplicación es requerido'),
        dayAplicationfinal: yup.string().required('Dia de próximo refuerzo es requerido'),
        vaccineName: yup.string().required('Nombre de la vacuna es requerido'),
    })).min(1, 'Debe agregar al menos una vacuna'),
    celos: yup.array().of(yup.object().shape({
        dayAplicationInitCelos: yup.string().test(
            'conditional-validation',
            'Dia de aplicación es requerido',
            function (value) {
                const dayAplicationFinalCelos = this.parent.dayAplicationFinalCelos;
                if (dayAplicationFinalCelos !== undefined && dayAplicationFinalCelos !== '' && dayAplicationFinalCelos !== null) {
                    return value !== undefined && value !== '';
                }
                return true; // If dayAplicationFinalCelos is not provided, no validation is required.
            }
        ),
        dayAplicationFinalCelos: yup.string().test(
            'conditional-validation',
            'Dia de finalización de celos es requerido',
            function (value) {
                const dayAplicationInitCelos = this.parent.dayAplicationInitCelos;
                if (dayAplicationInitCelos !== undefined && dayAplicationInitCelos !== '' && dayAplicationInitCelos !== null) {
                    return value !== undefined && value !== '' && value !== null;
                }
                return true; // If dayAplicationInitCelos is not provided, no validation is required.
            }),
    }))
})
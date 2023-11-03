import * as yup from "yup";
import {isValid} from "date-fns";

export const initialValuesMedicalHistoryPdf = {
    moreImportsData: "",
    deworming: [],
    vaccines: [],
    celos: []
}

export const validateMedicalHistoryPdfSchema = yup.object({
    moreImportsData: yup.string(),
    deworming: yup.array().of(yup.object().shape({
        dayAplicationInitDeworming: yup
            .date()
            .transform((value, originalValue) => {
                if (originalValue) {
                    const date = new Date(originalValue);
                    return isValid(date) ? date : new Date('invalid');
                }
                return null;
            })
            .test(
                'conditional-validation',
                'Dia de inicio debe ser menor que finalización',
                function (value) {
                    const dayAplicationFinalDeworming = this.parent.dayAplicationFinalDeworming;

                    if (dayAplicationFinalDeworming !== undefined && dayAplicationFinalDeworming !== '' && dayAplicationFinalDeworming !== null) {
                        return value < dayAplicationFinalDeworming;
                    }
                    return true; // If dayAplicationFinalDeworming is not provided, no validation is required.
                }
            )
            .required('La fecha es requerida')
            .typeError('Ingrese una fecha válida'),
        dayAplicationFinalDeworming: yup
            .date()
            .transform((value, originalValue) => {
                if (originalValue) {
                    const date = new Date(originalValue);
                    return isValid(date) ? date : new Date('invalid');
                }
                return null;
            })
            .test(
                'conditional-validation',
                'Dia de finalización debe ser mayor que inicio',
                function (value) {
                    const dayAplicationInitDeworming = this.parent.dayAplicationInitDeworming;

                    if (dayAplicationInitDeworming !== undefined && dayAplicationInitDeworming !== '' && dayAplicationInitDeworming !== null) {
                        return value > dayAplicationInitDeworming;
                    }
                    return true; // If dayAplicationInitDeworming is not provided, no validation is required.
                }
            )
            .required('La fecha es requerida')
            .typeError('Ingrese una fecha válida'),
        dewormingName: yup.string().required('Desparasitante es requerido'),
        dose: yup.string().required('Dosis es requerido'),
    })),
    vaccines: yup.array().of(yup.object().shape({
        dayAplicationInit: yup
            .date()
            .transform((value, originalValue) => {
                if (originalValue) {
                    const date = new Date(originalValue);
                    return isValid(date) ? date : new Date('invalid');
                }
                return null;
            })
            .test(
                'conditional-validation',
                'Dia de aplicación debe ser menor que refuerzo',
                function (value) {
                    const dayAplicationfinal = this.parent.dayAplicationfinal;

                    if (dayAplicationfinal !== undefined && dayAplicationfinal !== '' && dayAplicationfinal !== null) {
                        return value < dayAplicationfinal;
                    }
                    return true; // If dayAplicationfinal is not provided, no validation is required.
                }
            )
            .required('La fecha es requerida')
            .typeError('Ingrese una fecha válida'),
        dayAplicationfinal: yup
            .date()
            .transform((value, originalValue) => {
                if (originalValue) {
                    const date = new Date(originalValue);
                    return isValid(date) ? date : new Date('invalid');
                }
                return null;
            })
            .test(
                'conditional-validation',
                'Dia de refuerzo debe ser mayor que aplicación',
                function (value) {
                    const dayAplicationInit = this.parent.dayAplicationInit;

                    if (dayAplicationInit !== undefined && dayAplicationInit !== '' && dayAplicationInit !== null) {
                        return value > dayAplicationInit;
                    }
                    return true; // If dayAplicationInit is not provided, no validation is required.
                }
            )
            .required('La fecha es requerida')
            .typeError('Ingrese una fecha válida'),
        vaccineName: yup.string().required('Nombre de la vacuna es requerido'),
    })),
    celos: yup.array().of(yup.object().shape({
        dayAplicationInitCelos: yup
            .date()
            .transform((value, originalValue) => {
                if (originalValue) {
                    const date = new Date(originalValue);
                    return isValid(date) ? date : new Date('invalid');
                }
                return null;
            }).test(
                'conditional-validation',
                'Dia de incio debe ser menor a finalizacion',
                function (value) {
                    const dayAplicationFinalCelos = this.parent.dayAplicationFinalCelos;

                    if (dayAplicationFinalCelos !== undefined && dayAplicationFinalCelos !== '' && dayAplicationFinalCelos !== null) {
                        return value < dayAplicationFinalCelos;
                    }
                    return true; // If dayAplicationFinalCelos is not provided, no validation is required.
                }
            )
            .required('La fecha es requerida')
            .typeError('Ingrese una fecha válida'),
        dayAplicationFinalCelos: yup
            .date()
            .transform((value, originalValue) => {
                if (originalValue) {
                    const date = new Date(originalValue);
                    return isValid(date) ? date : new Date('invalid');
                }
                return null;
            }).test(
                'conditional-validation',
                'Dia de finalización debe ser mayor a inicio',
                function (value) {
                    const dayAplicationInitCelos = this.parent.dayAplicationInitCelos;

                    if (dayAplicationInitCelos !== undefined && dayAplicationInitCelos !== '' && dayAplicationInitCelos !== null) {
                        return value > dayAplicationInitCelos;
                    }
                    return true; // If dayAplicationInitCelos is not provided, no validation is required.
                }
            )
            .required('La fecha es requerida')
            .typeError('Ingrese una fecha válida'),
    }))
})
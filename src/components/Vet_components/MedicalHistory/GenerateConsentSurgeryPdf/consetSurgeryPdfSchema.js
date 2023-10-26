import * as yup from "yup";

export function validateConsentSurgeryPdfSchema() {
    return yup.object({
        intervention: yup.string().required("Tipo de intervención es requerido"),
    })
}
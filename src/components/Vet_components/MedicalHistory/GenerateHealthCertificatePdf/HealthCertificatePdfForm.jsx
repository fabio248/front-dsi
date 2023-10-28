import { GeneratePdfApi } from "../../../../api/Generate-Pdf.api.js";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import {initialValuesHealthCertificatePdf, validateHealthCertificatePdfSchema} from "./healthCertificatePdfSchema.js";
import {Button, Grid} from "@mui/material";
import React from "react";
import { HealthCertificationPdfFields } from "./HealthCertificationPdfFields.jsx";


export const HealthCertificationPdfForm = (props) => {
    const {petId, petName, onClose} = props
    const generatePdfController = new GeneratePdfApi();

    const generatePdf = useMutation({
        mutationFn: async ({formValues}) => {
            return await generatePdfController.generateHealthCertificatesPdf(formValues, petId, petName)
        }
    })

    const formik = useFormik({
        initialValues: initialValuesHealthCertificatePdf,
        validationSchema: validateHealthCertificatePdfSchema,
        validateOnChange: false,
        onSubmit: async (formValues) => {
            await generatePdf.mutate({formValues});
        }
    })

    return <>
        <div className="health-certificates-pdf-form">
           <form onSubmit={formik.handleSubmit}>
               <br />
               <HealthCertificationPdfFields formik={formik}/>
               <Grid
                   sx={{
                       display: 'flex',
                       flexDirection: 'row',
                       justifyContent: 'center',
                       margin: '0 auto',
                   }}
               >
                   <Button
                       color='error'
                       onClick={onClose}
                       size='medium'
                       sx={{ mx: 2, marginTop: '12px' }}
                   >
                       Cancelar
                   </Button>
                   <Button
                       type='submit'
                       size='medium'
                       sx={{ mx: 2, marginTop: '12px' }}
                   >
                       Generar
                   </Button>
               </Grid>
           </form>
        </div>
    </>
}
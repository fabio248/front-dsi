// import { GeneratePdfApi } from "../../../../api/Generate-Pdf.api.js";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import {validateBillsCreateSchema, initialValuesBills} from "./FactureFormValidateSchema.jsx";
import {Button, CircularProgress, Grid} from "@mui/material";
import React from "react";
import { FactureFormFields } from "./FactureFormsFields.jsx";


export const FactureForm = (props) => {
    const {petId, petName, close} = props
    // const generatePdfController = new GeneratePdfApi();

    const generatePdf = useMutation({
        mutationFn: async ({formValues}) => {
            // return await generatePdfController.generateHealthCertificatesPdf(formValues, petId, petName)
        }
    })

    const formik = useFormik({
        initialValues: initialValuesBills,
        validationSchema: validateBillsCreateSchema,
        validateOnChange: false,
        onSubmit: async (formValues) => {
          console.log(formValues);
            // await generatePdf.mutate({formValues});
        }
    })

    return <>
        <div className="health-certificates-pdf-form">
           <form onSubmit={formik.handleSubmit}>
               <br />
               <FactureFormFields formik={formik}/>
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
                       onClick={close}
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
                       {generatePdf.isLoading ? <CircularProgress /> :`Generar`}
                   </Button>
               </Grid>
           </form>
        </div>
    </>
}
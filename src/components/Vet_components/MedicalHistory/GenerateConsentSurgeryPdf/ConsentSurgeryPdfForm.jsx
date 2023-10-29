import React from "react";
import { validateConsentSurgeryPdfSchema } from "./consetSurgeryPdfSchema.js";
import { useFormik } from "formik";
import {Button, CircularProgress, Grid, TextField} from "@mui/material";
import { useMutation } from '@tanstack/react-query';
import { GeneratePdfApi } from "../../../../api/Generate-Pdf.api.js";

const generatePdfApi = new GeneratePdfApi();
export const ConsentSurgeryPdfForm = (props) => {
    const { onClose, petId, petName} = props
    const generatePdf = useMutation({
        mutationFn: async ({formValues}) => {
            return generatePdfApi.generateConsentPdf(formValues, petId, petName)
        },
    })


    const formik = useFormik({
        initialValues: {
            intervention: '',
        },
        validationSchema: validateConsentSurgeryPdfSchema,
        validateOnChange: false,
        onSubmit: async (formValues) => {
            await generatePdf.mutate({ formValues });
            setTimeout(() => {
                onClose();
            }, 1500);
        }

    });

  return <>
    <div className="consent-surgery-pdf-form">
        <form onSubmit={formik.handleSubmit}>
            <br />
            <Grid container spacing={3} justifyContent="center">
                <Grid item>
                    <TextField
                        fullWidth
                        name='intervention'
                        label='Tipo de intervención'
                        variant='outlined'
                        size='small'
                        sx={{ width: '300px' }}
                        onChange={formik.handleChange}
                        value={formik.values.intervention}
                        error={formik.touched.intervention && Boolean(formik.errors.intervention)}
                        helperText={formik.touched.intervention && formik.errors.intervention}
                    />
                </Grid>
            </Grid>
            <br />
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
                    {generatePdf.isLoading ? <CircularProgress /> :`Generar`}
                </Button>
            </Grid>
        </form>
    </div>
  </>
}
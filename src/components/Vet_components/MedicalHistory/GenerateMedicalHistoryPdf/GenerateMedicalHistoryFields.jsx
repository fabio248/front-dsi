import {Grid, TextField} from "@mui/material";
import {useEffect} from "react";
import {VaccinesFields} from "./VaccinesFields.jsx";

export function GenerateMedicalHistoryFields({formik}) {
    useEffect(() => {
        console.log({touched: formik.touched, values: formik.values, errors: formik.errors, formik: formik})
    }, [formik]);

    return (
        <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid item xs={2} sm={4} md={6}>
                <TextField
                    fullWidth
                    sx={{mb:2}}
                    type="number"
                    name="clinicalNumber"
                    label='Numero de clinica'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.clinicalNumber && Boolean(formik.errors.clinicalNumber)}
                    helperText={formik.touched.clinicalNumber && formik.errors.clinicalNumber}
                />
                <TextField
                    fullWidth
                    type="text"
                    name="moreImportsData"
                    label='Mas datos importantes'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.moreImportsData && Boolean(formik.errors.moreImportsData)}
                    helperText={formik.touched.moreImportsData && formik.errors.moreImportsData}
                />
                <VaccinesFields formik={formik} />
            </Grid>

            <Grid item xs={2} sm={4} md={6}>
            </Grid>
            <Grid item xs={2} sm={4} md={6}>
            </Grid>
        </Grid>
    )
}
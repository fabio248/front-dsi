import { useFormik } from "formik";
import { initialValuesMedicalHistoryPdf, validateMedicalHistoryPdfSchema } from "./generateMedicalHistory.js";
import { GenerateMedicalHistoryFields } from "./GenerateMedicalHistoryFields.jsx";
import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function GenerateMedicalHistoryForm(){
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: initialValuesMedicalHistoryPdf,
        validationSchema: validateMedicalHistoryPdfSchema,
        onSubmit: (values) => {
            console.log(values)
        }
    })


    return (
        <div className="medical-history-pdf-form">
            <form onSubmit={formik.handleSubmit}>
                <GenerateMedicalHistoryFields formik={ formik } />
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
                        onClick={()=> navigate(-1)}
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
    )
}
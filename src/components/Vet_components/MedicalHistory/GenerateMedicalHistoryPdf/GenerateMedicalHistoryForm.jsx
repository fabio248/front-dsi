import { useFormik } from "formik";
import { initialValuesMedicalHistoryPdf, validateMedicalHistoryPdfSchema } from "./generateMedicalHistory.js";
import { GenerateMedicalHistoryFields } from "./GenerateMedicalHistoryFields.jsx";
import {Button, CircularProgress, Grid} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import {GeneratePdfApi} from "../../../../api/Generate-Pdf.api.js";
import {useMutation, useQuery} from "@tanstack/react-query";
import {Pets} from "../../../../api/Pets.api.jsx";
import {ApiAuth} from "../../../../api/Auth.api.jsx";
import {useAuth} from "../../../../hooks/index.jsx";

const generatePdfController = new GeneratePdfApi()
const petController = new Pets()
const authController = new ApiAuth()
export function GenerateMedicalHistoryForm() {
    const navigate = useNavigate();
    const { accessToken } = useAuth()
    const { petId, medicalHistoryId} = useParams();

    const { data: pet } = useQuery({
        queryKey: ['pets', petId],
        queryFn: async () => await petController.getPetById(authController.getAccessToken(), petId),
    })

    const generatePdf = useMutation({
        mutationFn: async ({formValues}) => {
            return generatePdfController.generateMedicalHistoryPdf({data: formValues, petId, petName: pet.name, medicalHistoryId, accessToken})
        },
    })

    const formik = useFormik({
        initialValues: initialValuesMedicalHistoryPdf,
        validationSchema: validateMedicalHistoryPdfSchema,
        onSubmit: async (formValues) => {
            await generatePdf.mutate({formValues})
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
                        {generatePdf.isLoading ? <CircularProgress /> :`Generar`}
                    </Button>
                </Grid>
            </form>
        </div>
    )
}
import { Header } from "../../../shared/components/Header.jsx";
import {useParams} from "react-router-dom";
import {Container, Typography, Grid, TextField} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import {Pets} from "../../../api/Pets.api.jsx";
import {
    GenerateMedicalHistoryForm
} from "../../../components/Vet_components/MedicalHistory/GenerateMedicalHistoryPdf/GenerateMedicalHistoryForm.jsx";

const petController = new Pets()
export function GenerateMedicalHistory() {
    const {petId, medicalHistoryId} = useParams();

    const {data: medicalHistory, isLoading} = useQuery({
        queryKey: ['medical-history', medicalHistoryId],
        queryFn: async () => {
            return await petController.getMedicalHistoryById(medicalHistoryId)
        }
    })

    return (
        <div>
            <Header />
            <Container maxWidth='xl' sx={{ mt: 4, mb: 4 }}>
                <Typography variant='h4' sx={{mb:4}}>Generar PDF Hoja Clinica</Typography>
                <GenerateMedicalHistoryForm />
            </Container>
        </div>
    )
}
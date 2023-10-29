import { Header } from "../../../shared/components/Header.jsx";
import { Container, Typography } from "@mui/material";
import {
    GenerateMedicalHistoryForm
} from "../../../components/Vet_components/MedicalHistory/GenerateMedicalHistoryPdf/GenerateMedicalHistoryForm.jsx";
export function GenerateMedicalHistory() {
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
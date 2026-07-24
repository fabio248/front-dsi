import { Header } from "../../../shared/components/Header.jsx";
import { Box, Container, Typography } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
    GenerateMedicalHistoryForm
} from "../../../components/Vet_components/MedicalHistory/GenerateMedicalHistoryPdf/GenerateMedicalHistoryForm.jsx";
import { Breadcrumbs } from "../../../shared/components/Breadcrumbs.jsx";
import { Pets } from "../../../api/Pets.api.jsx";
import { ApiAuth } from "../../../api/Auth.api.jsx";

const petsController = new Pets();
const apiAuthController = new ApiAuth();

export function GenerateMedicalHistory() {
    const { petId } = useParams();
    const location = useLocation();

    // Misma queryKey que usa el formulario: la mascota se pide una sola vez y
    // aquí solo se lee del caché para poner su nombre en la miga de pan.
    const { data: pet } = useQuery({
        queryKey: ['pets', petId],
        queryFn: async () =>
            await petsController.getPetById(apiAuthController.getAccessToken(), petId),
    });

    return (
        <div>
            <Header />
            <Container maxWidth='xl' sx={{ mt: 4, mb: 4 }}>
                <Box sx={{ mb: 2 }}>
                    <Breadcrumbs
                        items={[
                            ...(location.state?.trail ?? [
                                { label: 'Mascotas', to: '/admin/userAndPets' },
                                { label: pet?.name, to: `/admin/pets/${petId}` },
                            ]),
                            { label: 'Hoja clínica' },
                        ]}
                    />
                </Box>
                <Typography variant='h4' sx={{mb:4}}>Generar PDF Hoja Clinica</Typography>
                <GenerateMedicalHistoryForm />
            </Container>
        </div>
    )
}

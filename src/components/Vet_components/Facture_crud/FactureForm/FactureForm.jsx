import {useMutation, useQueryClient} from "@tanstack/react-query";
import { useFormik } from "formik";
import {validateBillsCreateSchema, initialValuesBills} from "./FactureFormValidateSchema.jsx";
import { Button, CircularProgress, Grid} from "@mui/material";
import { FactureFormFields } from "./FactureFormsFields.jsx";
import {BillsApi} from "../../../../api/Bills.api.js";
import {useAuth} from "../../../../hooks/index.jsx";


export const FactureForm = (props) => {
    const { close, setShowAlert } = props
    const billsController = new BillsApi();
    const { accessToken } = useAuth();
    const queryClient = useQueryClient();


    const generatePdf = useMutation({
        mutationFn:  ({ formValues }) => {
            return billsController.createFacture(accessToken, formValues)
        },
        onSuccess: async () => {
            setShowAlert(true)
            await queryClient.invalidateQueries(['bills'])
            close()
        }
    })

    const formik = useFormik({
        initialValues: initialValuesBills,
        validationSchema: validateBillsCreateSchema,
        validateOnChange: false,
        onSubmit: async (formValues) => {
          await generatePdf.mutate({ formValues });
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
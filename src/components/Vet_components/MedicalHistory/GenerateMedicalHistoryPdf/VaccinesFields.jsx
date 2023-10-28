import { useEffect, useState } from "react";
import { Button, Card, CardContent, Grid, TextField, Typography } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DeleteButton } from "../../../../shared/components/DeleteButton.jsx";

export function VaccinesFields({ formik }) {
    const [vaccines, setVaccines] = useState([])

    const handleDateVaccinesChange = (date, index, type) => {
        formik.setFieldValue(`vaccines[${index}].${type}`, date);
    }

    const addVaccine = () => {
        const newVaccines = [...formik.values.vaccines, { dayAplicationInit: null, vaccineName: '', dayAplicationfinal: null }];
        setVaccines(newVaccines);
        formik.setFieldValue('vaccines', newVaccines);
    };

    const removeVaccine = (index) => {
        const newVaccines = formik.values.vaccines.filter((_, i) => i !== index)
        const newErrorsVaccines = formik.errors.vaccines.filter((_, i) => i !== index)
        formik.setFieldError('vaccines', newErrorsVaccines);
        formik.setFieldValue('vaccines', newVaccines);

        if(formik.touched.vaccines.length > 0){
            const newTouchedVaccines = formik.touched.vaccines.filter((_, i) => i !== index)
            formik.setFieldTouched('vaccines', newTouchedVaccines);
        }
        setVaccines(newVaccines);
    }

    useEffect(() => {
        setVaccines(formik.initialValues.vaccines)
    },[])

    return (
       <Card className="vaccines-fields" sx={{mt:1}}>
           {vaccines && vaccines.map((vaccine, index) => {
               return (
                   <Card variant="outlined" sx={{ width: "95%", maxWidth: '95%', mt:2, ml: 1.5 }} key={index}>
                       <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                           <Grid container spacing={1} justifyContent="space-between" alignItems="center" sx={{ mb:1 }}>
                               <Typography variant="h6" gutterBottom sx={{ ml:5 }}>
                                   Vacuna {index + 1}
                               </Typography>
                               <DeleteButton action={() => removeVaccine(index)} />
                           </Grid>
                           <Grid container rowSpacing={1} spacing={1}>
                               <Grid item xs={12} sm={12} md={12}>
                                   <TextField
                                       fullWidth
                                       name={`vaccines[${index}].vaccineName`}
                                       label='Nombre de la vacuna'
                                       variant='outlined'
                                       size='small'
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                       value={formik.values.vaccines[index]?.vaccineName || ''}
                                       error={
                                           (formik.touched.vaccines &&
                                               formik.touched.vaccines[index] &&
                                               formik.errors.vaccines &&
                                               Boolean(formik.errors.vaccines[index]?.vaccineName)) ?? false
                                       }
                                       helperText={
                                           formik.touched.vaccines &&
                                           formik.errors.vaccines &&
                                           formik.errors.vaccines[index] &&
                                           formik.errors.vaccines[index]?.vaccineName
                                       }
                                   />
                               </Grid>
                               <Grid item xs={12} sm={6} md={6}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                   <DatePicker
                                       label='Día aplicación'
                                       name={`vaccines[${index}].dayAplicationInit`}
                                       value={formik.values.vaccines[index].dayAplication}
                                       onBlur={formik.handleBlur}
                                       onChange={(date)=>handleDateVaccinesChange(date, index, 'dayAplicationInit')}
                                       slotProps={{
                                           textField: {
                                               size: 'small',
                                               fullWidth: true,
                                               error: ((formik.touched.vaccines &&
                                                   formik.touched.vaccines[index] &&
                                                   formik.errors.vaccines &&
                                                   Boolean(formik.errors.vaccines[index]?.dayAplicationInit)) ?? false),
                                               helperText: (formik.touched.vaccines &&
                                                   formik.errors.vaccines &&
                                                   formik.errors.vaccines[index] &&
                                                   formik.errors.vaccines[index]?.dayAplicationInit)
                                           }
                                        }}
                                       showTodayButton
                                       format='dd/MM/yyyy'
                                   />
                               </LocalizationProvider>
                               </Grid>
                               <Grid item xs={12} sm={6} md={6}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                   <DatePicker
                                       label='Día de proximo refuerzo'
                                       name={`vaccines[${index}].dayAplicationfinal`}
                                       value={formik.values.vaccines[index].dayAplicationfinal}
                                       onBlur={formik.handleBlur}
                                       onChange={(date)=>handleDateVaccinesChange(date, index, 'dayAplicationfinal')}
                                       slotProps={{
                                           textField: {
                                               size: 'small',
                                               fullWidth: true,
                                               error: ((formik.touched.vaccines &&
                                                   formik.touched.vaccines[index] &&
                                                   formik.errors.vaccines &&
                                                   Boolean(formik.errors.vaccines[index]?.dayAplicationfinal)) ?? false),
                                               helperText: (formik.touched.vaccines &&
                                                   formik.errors.vaccines &&
                                                   formik.errors.vaccines[index] &&
                                                   formik.errors.vaccines[index]?.dayAplicationfinal)
                                           }
                                        }}
                                       showTodayButton
                                       format='dd/MM/yyyy'
                                   />
                               </LocalizationProvider>
                               </Grid>
                           </Grid>
                       </CardContent>
                   </Card>
                )
           })}
           <Grid item xs={4} sm={8} md={12} sx={{textAlign:"center", mt:1, mb:1}}>
               <Button
                   type="button"
                   onClick={addVaccine}
               >
                   Añadir vacuna
               </Button>
           </Grid>
       </Card>
    )
}
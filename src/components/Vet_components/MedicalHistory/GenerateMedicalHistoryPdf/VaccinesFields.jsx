import {useEffect, useState} from "react";
import {Button, Card, CardContent, FormHelperText, Grid, TextField, Typography} from "@mui/material";
import {DeleteOutline} from "@mui/icons-material";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import * as _ from "lodash";

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
        setVaccines(newVaccines);
    }

    useEffect(() => {
        setVaccines(formik.initialValues.vaccines)
    },[])

    useEffect(() => {
        const x = (formik.touched.vaccines &&
            formik.touched.vaccines[0] &&
            // _.isEmpty(formik.touched.vaccines[0]?.dayAplicationInit) &&
            formik.touched.vaccines[0]?.dayAplicationInit &&
            formik.errors.vaccines &&
            formik.errors.vaccines[0] &&
            Boolean(formik.errors.vaccines[0]?.dayAplicationInit)) ?? false
        console.log({x})
    },[formik])


    return (
       <div>
           {vaccines && vaccines.map((vaccine, index) => {
               return (
                   <Card variant="outlined" sx={{ width: "95%", maxWidth: '95%', mt:2, ml: 1.5 }}>
                       <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                           <Grid container spacing={1} justifyContent="space-between" alignItems="center" sx={{ mb:1 }}>
                               <Typography variant="h6" gutterBottom sx={{ ml:5 }}>
                                   Vacuna {index + 1}
                               </Typography>
                               <Button
                                   variant="contained"
                                   color="error"
                                   type="button"
                                   onClick={() => removeVaccine(index)}
                               >
                                   <DeleteOutline color="action" />
                               </Button>
                           </Grid>
                           <TextField
                               fullWidth
                               name={`vaccines[${index}].vaccineName`}
                               label='Nombre de la vacuna'
                               variant='outlined'
                               size='small'
                               sx={{ minWidth: '250px' }}
                               onChange={formik.handleChange}
                               onBlur={formik.handleBlur}
                               value={formik.values.vaccines[index]?.vaccineName || ''}
                               error={
                                   (formik.touched.vaccines &&
                                       formik.touched.vaccines[index] &&
                                       formik.touched.vaccines[index]?.vaccineName &&
                                       formik.errors.vaccines &&
                                       formik.errors.vaccines[index] &&
                                       Boolean(formik.errors.vaccines[index]?.vaccineName)) ?? false
                               }
                               helperText={
                                   formik.touched.vaccines &&
                                   formik.touched.vaccines[index] &&
                                   formik.errors.vaccines &&
                                   formik.errors.vaccines[index] &&
                                   formik.errors.vaccines[index]?.vaccineName
                               }
                           />
                           <LocalizationProvider dateAdapter={AdapterDateFns}>
                               <DatePicker
                                   label='Día aplicación'
                                   name={`vaccines[${index}].dayAplicationInit`}
                                   sx={{ mt:2, minWidth: '225px' }}
                                   value={formik.values.vaccines[index].dayAplication}
                                   onBlur={formik.handleBlur}
                                   onChange={(date)=>handleDateVaccinesChange(date, index, 'dayAplicationInit')}
                                   slotProps={{ textField: { size: 'small', fullWidth: true } }}
                                   renderInput={(params) => (
                                       <TextField
                                           {...params}
                                           error={
                                               (formik.touched.vaccines &&
                                                   formik.touched.vaccines[index] &&
                                                   formik.touched.vaccines[index]?.dayAplicationInit &&
                                                   formik.errors.vaccines &&
                                                   formik.errors.vaccines[index] &&
                                                   Boolean(formik.errors.vaccines[index]?.dayAplicationInit)) ?? false}
                                       />
                                   )}
                                   showTodayButton
                                   format='dd/MM/yyyy'
                               />
                               {(formik.touched.vaccines &&
                                       formik.touched.vaccines[index] &&
                                       formik.touched.vaccines[index].dayAplicationInit) &&
                                   formik.errors.vaccines &&
                                   formik.errors.vaccines[index] &&
                                   formik.errors.vaccines[index].dayAplicationInit &&
                                   (
                                       <FormHelperText error>{formik.errors.vaccines[index].dayAplicationInit}</FormHelperText>
                                   )}
                           </LocalizationProvider>
                           <LocalizationProvider dateAdapter={AdapterDateFns}>
                               <DatePicker
                                   label='Día de proximo refuerzo'
                                   name={`vaccines[${index}].dayAplicationfinal`}
                                   sx={{ mt:2, minWidth: '225px' }}
                                   value={formik.values.vaccines[index].dayAplicationfinal}
                                   onBlur={formik.handleBlur}
                                   onChange={(date)=>handleDateVaccinesChange(date, index, 'dayAplicationfinal')}
                                   slotProps={{ textField: { size: 'small', fullWidth: true } }}
                                   renderInput={(params) => (
                                       <TextField
                                           {...params}
                                           error={
                                               (formik.touched.vaccines &&
                                                   formik.touched.vaccines[index] &&
                                                   formik.touched.vaccines[index]?.dayAplicationfinal &&
                                                   formik.errors.vaccines &&
                                                   formik.errors.vaccines[index] &&
                                                   Boolean(formik.errors.vaccines[index]?.dayAplicationfinal)) ?? false}
                                       />
                                   )}
                                   showTodayButton
                                   format='dd/MM/yyyy'
                               />
                               {(formik.touched.vaccines &&
                                       formik.touched.vaccines[index] &&
                                       formik.touched.vaccines[index].dayAplicationfinal) &&
                                   formik.errors.vaccines &&
                                   formik.errors.vaccines[index] &&
                                   formik.errors.vaccines[index].dayAplicationfinal &&
                                   (
                                       <FormHelperText error>{formik.errors.vaccines[index].dayAplicationfinal}</FormHelperText>
                                   )}
                           </LocalizationProvider>
                       </CardContent>
                   </Card>
                )
           })}
           <Grid item xs={4} sm={8} md={12} sx={{textAlign:"center", mt:1}}>
               <Button
                   type="button"
                   onClick={addVaccine}

               >
                   Añadir vacuna
               </Button>
           </Grid>
       </div>
    )
}
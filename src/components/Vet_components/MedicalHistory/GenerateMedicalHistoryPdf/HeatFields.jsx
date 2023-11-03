import { useEffect, useState} from "react";
import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { DeleteButton } from "../../../../shared/components/DeleteButton.jsx";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

export function HeatFields({ formik, disabled }) {
    const [heats, setHeats] = useState([])

    const handleDateHeatsChange = (date, index, type) => {
        formik.setFieldValue(`celos[${index}].${type}`, date);
    }

    const addHeats = () => {
        const newHeats = [
            ...formik.values.celos,
            {
                dayAplicationInitCelos: null,
                dayAplicationFinalCelos: null,
            }
        ];
        setHeats(newHeats);
        formik.setFieldValue('celos', newHeats);
    };

    const removeHeats = (index) => {
        const newHeats = formik.values.celos.filter((_, i) => i !== index)
        formik.setFieldValue('celos', newHeats);
        setHeats(newHeats);

        if(formik.errors.celos && formik.errors.celos.length > 0) {
            const newErrorsHeats = formik.errors.celos.filter((_, i) => i !== index)
            formik.setFieldError('celos', newErrorsHeats);
        }

        if(formik.touched.celos && formik.touched.celos.length > 0) {
            const newTouchedHeats = formik.touched.celos.filter((_, i) => i !== index)
            formik.setFieldTouched('celos', newTouchedHeats);
        }
    }

    useEffect(() => {
        setHeats(formik.initialValues.celos)
    }, []);

    return (
        <Card className="heats-fields" sx={{mt:1, opacity: disabled ? 0.5 : 1}}>
            {heats && heats.map((heat, index) => {
               return (
                   <Card variant="outlined" sx={{ width: "95%", maxWidth: '95%', mt:2, ml: 1.5 }} key={index}>
                       <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                           <Grid container spacing={1} justifyContent="space-between" sx={{ mb:1, mt:1 }}>
                               <Typography variant="h6" gutterBottom sx={{ ml:3 }}>
                                   Celos {index + 1}
                               </Typography>
                               <DeleteButton action={() => removeHeats(index)} disabled={disabled} />
                           </Grid>

                            <Grid container rowSpacing={1} spacing={1}>
                           <Grid item xs={12} sm={6} md={6}>
                               <LocalizationProvider dateAdapter={AdapterDateFns}>
                                   <DatePicker
                                       label='Fecha inicio'
                                       disabled={disabled}
                                       name={`celos[${index}].dayAplicationInitCelos`}
                                       value={formik.values.celos[index]?.dayAplicationInitCelos}
                                       onBlur={formik.handleBlur}
                                       onChange={(date)=>handleDateHeatsChange(date, index, 'dayAplicationInitCelos')}
                                       slotProps={{
                                           textField: {
                                               size: 'small',
                                               fullWidth: true,
                                               error: (formik.touched.celos &&
                                                   formik.touched.celos[index] &&
                                                   formik.touched.celos[index]?.dayAplicationInitCelos &&
                                                   formik.errors.celos &&
                                                   formik.errors.celos[index] &&
                                                   Boolean(formik.errors.celos[index]?.dayAplicationInitCelos)) ?? false,
                                               helperText: (formik.touched.celos &&
                                                   formik.touched.celos[index] &&
                                                   formik.touched.celos[index].dayAplicationInitCelos &&
                                                   formik.errors.celos &&
                                                   formik.errors.celos[index] &&
                                                   formik.errors.celos[index]?.dayAplicationInitCelos)
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
                                       disabled={disabled}
                                       label='Día de finalización'
                                       name={`celos[${index}].dayAplicationFinalCelos`}
                                       value={formik.values.celos[index]?.dayAplicationFinalCelos}
                                       onBlur={formik.handleBlur}
                                       onChange={(date)=>handleDateHeatsChange(date, index, 'dayAplicationFinalCelos')}
                                       slotProps={{
                                           textField: {
                                               size: 'small',
                                               fullWidth: true,
                                               error: ((formik.touched.celos &&
                                                   formik.touched.celos[index] &&
                                                   formik.touched.celos[index]?.dayAplicationFinalCelos &&
                                                   formik.errors.celos &&
                                                   formik.errors.celos[index] &&
                                                   Boolean(formik.errors.celos[index]?.dayAplicationFinalCelos)) ?? false),
                                               helperText: (formik.touched.celos &&
                                                   formik.touched.celos[index] &&
                                                   formik.touched.celos[index].dayAplicationFinalCelos &&
                                                   formik.errors.celos &&
                                                   formik.errors.celos[index] &&
                                                   formik.errors.celos[index]?.dayAplicationFinalCelos)
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
                    disabled={disabled}
                    type="button"
                    onClick={addHeats}
                >
                    Añadir celo
                </Button>
            </Grid>
        </Card>

    )
}
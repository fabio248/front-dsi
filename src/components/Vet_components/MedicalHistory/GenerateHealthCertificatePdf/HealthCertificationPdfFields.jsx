import { Button, Card, CardContent, FormHelperText, Grid, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useEffect, useRef, useState } from "react";
import { DeleteOutline } from "@mui/icons-material";

export const HealthCertificationPdfFields = ({ formik }) => {
    const [vaccines, setVaccines] = useState([])
    const lastVaccineCardRef = useRef(null);
    const handleDateChange = (date) => {
        formik.setFieldValue('dateJourney', date);
        formik.setFieldTouched('dateJourney', false);
    };

    const handleDateVaccinesChange = (date, index) => {
        formik.setFieldTouched(`vaccines[${index}].dayAplication`, false);
        formik.setFieldValue(`vaccines[${index}].dayAplication`, date);
    }

    const addVaccine = () => {
        const newVaccines = [...formik.values.vaccines, { dayAplication: null, vaccineName: '', BrandAndLot: '' }];
        setVaccines(newVaccines);
        formik.setFieldValue('vaccines', newVaccines);

        if (lastVaccineCardRef.current) {
            lastVaccineCardRef.current.scrollIntoView({ behavior: 'smooth' });
        }
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
        console.log({touched: formik.touched, values: formik.values, errors: formik.errors, formik: formik})
    }, [formik]);

    return (
    <Grid container spacing={1} justifyContent="space-between" textAlign="center" columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid item xs={4} sm={8} md>
            <TextField
                autoFocus
                fullWidth
                name='destinationAdress'
                label='Dirección de destino'
                variant='outlined'
                size='small'
                sx={{ minWidth: '350px',  }}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.destinationAdress}
                error={formik.touched.destinationAdress && Boolean(formik.errors.destinationAdress)}
                helperText={formik.touched.destinationAdress && formik.errors.destinationAdress}
            />
        </Grid>
        <Grid item xs={4} sm={8} md>
            <TextField
                fullWidth
                name='codePostal'
                label='Código postal'
                variant='outlined'
                size='small'
                type="number"
                sx={{ minWidth: '250px' }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.codePostal}
                error={formik.touched.codePostal && Boolean(formik.errors.codePostal)}
                helperText={formik.touched.codePostal && formik.errors.codePostal}
            />
        </Grid>
        <Grid item xs={4} sm={8} md>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label='Dia de viaje'
                    name='dateJourney'
                    value={formik.values.dateJourney}
                    onBlur={formik.handleBlur}
                    onChange={handleDateChange}
                    slotProps={{
                        textField: {
                            size: 'small',
                            fullWidth: true,
                            error: (formik.touched.dateJourney && Boolean(formik.errors.dateJourney)),
                            helperText: formik.touched.dateJourney && formik.errors.dateJourney
                        }
                    }}
                    showTodayButton
                    format='dd/MM/yyyy'
                    disablePast
                />
            </LocalizationProvider>
        </Grid>
        <Grid item xs={4} sm={8} md={12}>
            <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
                {vaccines && vaccines.map((vaccine, index) => {
                    return <Grid
                        container
                        spacing={1}
                        justifyContent="space-between"
                        textAlign="center"
                        key={index}
                        sx={{ mt:0.5}}
                    >
                        <Card variant="outlined" sx={{ width: "95%", maxWidth: '95%', mt:0.5, ml: 1.5 }}>
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
                                    sx={{ mb: 1.5, minWidth: '250px' }}
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

                                <TextField
                                    fullWidth
                                    name={`vaccines[${index}].BrandAndLot`}
                                    label='Marcar y lote vacuna'
                                    variant='outlined'
                                    size='small'
                                    sx={{ mb: 1.5, minWidth: '250px' }}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.vaccines[index]?.BrandAndLot || ''}
                                    error={
                                        (formik.touched.vaccines &&
                                        formik.touched?.vaccines[index] &&
                                        formik.touched.vaccines[index]?.BrandAndLot &&
                                        formik.errors.vaccines &&
                                        formik.errors.vaccines[index] &&
                                        Boolean(formik.errors.vaccines[index].BrandAndLot)) ?? false
                                    }
                                    helperText={
                                        formik.touched.vaccines &&
                                        formik.touched.vaccines[index] &&
                                        formik.errors.vaccines &&
                                        formik.errors.vaccines[index] &&
                                        formik.errors.vaccines[index]?.BrandAndLot
                                    }
                                />
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label='Dia de viaje'
                                        name={`vaccines[${index}].dayAplication`}
                                        sx={{ minWidth: '250px' }}
                                        value={formik.values.vaccines[index].dayAplication}
                                        onBlur={formik.handleBlur}
                                        onChange={(date)=>handleDateVaccinesChange(date, index)}
                                        slotProps={{
                                            textField: {
                                                size: 'small',
                                                fullWidth: true,
                                                error: (formik.touched.vaccines &&
                                                    formik.touched.vaccines[index] &&
                                                    formik.touched.vaccines[index]?.dayAplication &&
                                                    formik.errors.vaccines &&
                                                    formik.errors.vaccines[index] &&
                                                    Boolean(formik.errors.vaccines[index]?.dayAplication)) ?? false,
                                                helperText: (formik.touched.vaccines &&
                                                        formik.touched.vaccines[index] &&
                                                    formik.touched.vaccines[index].dayAplication &&
                                                    formik.errors.vaccines &&
                                                    formik.errors.vaccines[index] &&
                                                    formik.errors.vaccines[index]?.dayAplication)
                                            }
                                        }}
                                        showTodayButton
                                        format='dd/MM/yyyy'
                                        ref={index === vaccines.length - 1 ? lastVaccineCardRef : null}
                                    />
                                </LocalizationProvider>
                            </CardContent>
                        </Card>
                    </Grid>
                    }
                )}
            </div>
        </Grid>
        <Grid item xs={4} sm={8} md={12}>
            <Button
                type="button"
                onClick={addVaccine}
            >
                Añadir vacuna
            </Button>
        </Grid>
    </Grid>
    )
}

import { Button, Card, CardContent, FormHelperText, Grid, TextField, Typography, MenuItem } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { DeleteOutline } from "@mui/icons-material";
// import { useMutation, useQueryClient } from '@tanstack/react-query';

import {User} from "../../../../api/User.api"
import { useAuth } from '../../../../hooks';
import { all } from "axios";


const userController = new User()
 export  const FactureFormFields = ({ formik }) => {
    const [billsDetails, setbillsDetails] = useState([])
    const [allData, setAllData] = useState([]);
    const lastnewBillsDetailsCardRef = useRef(null);

    const { accessToken } = useAuth();

    const handleDateVaccinesChange = (date, index) => {
        formik.setFieldTouched(`billsDetails[${index}].quantity`, false);
        formik.setFieldValue(`billsDetails[${index}].quantity`, date);
    }

    const addBillsDetails = () => {
        const newBillsDetails = [...formik.values.billsDetails, { quantity: null, productId: null }];
        setbillsDetails(newBillsDetails);
        formik.setFieldValue('newBillsDetails', newBillsDetails);

        if (lastnewBillsDetailsCardRef.current) {
            lastnewBillsDetailsCardRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const removeBillsDetails= (index) => {
        const newBillsDetails = formik.values.billsDetails.filter((_, i) => i !== index)
        formik.setFieldValue('newBillsDetails', newBillsDetails);
        setbillsDetails(newBillsDetails);

        if(formik.errors.billsDetails.length > 0){
            const newErrorsBillsDetails = formik.errors.billsDetails.filter((_, i) => i !== index)
            formik.setFieldError('newBillsDetails', newErrorsBillsDetails);
        }

        if(formik.touched.billsDetails.length > 0){
            const newTouchedBillsDetails = formik.touched.billsDetails.filter((_, i) => i !== index)
            formik.setFieldTouched('vaccines', newTouchedBillsDetails);
        }
    }

    useEffect(() => {
        setbillsDetails(formik.initialValues.billsDetails)
        getAllUsersPaginated(accessToken);
    },[accessToken])
   
const getAllUsersPaginated = async (accessToken) => {
    try {

    let page = 1; 
    let allData = [];

    while (true) {
      const response = await userController.getAllUsers(accessToken,page,null);
      if (response.data) {
        allData = allData.concat(response.data);
      
    }
    if (response.data.length < 1) {
        break;
      }
    page ++
    }
    setAllData(allData);
    } catch (error) {
      console.error(error);
    }
  };
    return (
    <Grid container spacing={1} justifyContent="space-between" textAlign="center" columns={{ xs: 4, sm: 8, md: 6 }}>
        <Grid item xs={4} sm={8}>
        <TextField
                select
                fullWidth
                name='cliendId'
                label='Selecciona al cliente'
                variant='outlined'
                size='small'
                sx={{ minWidth: '350px' }}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.cliendId}
        >
        {allData &&
            allData.map((client) => (
            <MenuItem key={client.id} value={client.id} sx={{ minWidth: '150px' }}>
                {client.firstName} {client.lastName}
            </MenuItem>
            ))}
</TextField>

      </Grid>

        <Grid item xs={4} sm={8} md={12}>
            <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
                {billsDetails && billsDetails.map((billsDetails, index) => {
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
                                        Datos de la Factura {index + 1}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        type="button"
                                        onClick={() => removeBillsDetails(index)}
                                    >
                                        <DeleteOutline color="action" />
                                    </Button>
                                </Grid>
                                <TextField
                                    fullWidth
                                    name={`billsDetails[${index}].quantity`}
                                    label='Cantidad'
                                    variant='outlined'
                                    size='small'
                                    sx={{ mb: 1.5, minWidth: '250px' }}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    // value={formik.values.vaccines[index]?.vaccineName || ''}
                                    // error={
                                    //     (formik.touched.vaccines &&
                                    //     formik.touched.vaccines[index] &&
                                    //     formik.touched.vaccines[index]?.vaccineName &&
                                    //     formik.errors.vaccines &&
                                    //     formik.errors.vaccines[index] &&
                                    //     Boolean(formik.errors.vaccines[index]?.vaccineName)) ?? false
                                    // }
                                    // helperText={
                                    //     formik.touched.vaccines &&
                                    //     formik.touched.vaccines[index] &&
                                    //     formik.errors.vaccines &&
                                    //     formik.errors.vaccines[index] &&
                                    //     formik.errors.vaccines[index]?.vaccineName
                                    // }
                                />

                                <TextField
                                    fullWidth
                                    name={`billsDetails[${index}].productId`}
                                    label='Seleccione el producto'
                                    variant='outlined'
                                    size='small'
                                    sx={{ mb: 1.5, minWidth: '250px' }}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    // value={formik.values.vaccines[index]?.BrandAndLot || ''}
                                    // error={
                                    //     (formik.touched.vaccines &&
                                    //     formik.touched?.vaccines[index] &&
                                    //     formik.touched.vaccines[index]?.BrandAndLot &&
                                    //     formik.errors.vaccines &&
                                    //     formik.errors.vaccines[index] &&
                                    //     Boolean(formik.errors.vaccines[index].BrandAndLot)) ?? false
                                    // }
                                    // helperText={
                                    //     formik.touched.vaccines &&
                                    //     formik.touched.vaccines[index] &&
                                    //     formik.errors.vaccines &&
                                    //     formik.errors.vaccines[index] &&
                                    //     formik.errors.vaccines[index]?.BrandAndLot
                                    // }
                                />
                                
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
                onClick={addBillsDetails}
            >
                Añadir Otra Factura
            </Button>
        </Grid>
    </Grid>
    )
}


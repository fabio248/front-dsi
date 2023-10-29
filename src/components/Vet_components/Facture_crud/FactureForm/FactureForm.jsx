import React, { useState, useRef, useEffect } from 'react';

//Esquemas de validaciones y manipulacion de datos
import { useFormik } from 'formik';
// import { initialValuesProduct, validationSchemaProductRegister } from   ../../Product_crud/ProductForm/ProductFormValidate';
import { initialValuesBills, validateBillsCreate } from "./FactureFormValidate"
//Backend petitions
import { ApiAuth } from '../../../../api/Auth.api';
import { Product } from '../../../../api/Product.api';

//MUI Material
import { DeleteOutline } from "@mui/icons-material";
import Autocomplete from '@mui/material/Autocomplete';
import { Grid, TextField, Button, Paper, TableContainer, Table, TableHead, TableRow,
TableCell, TableBody } from '@mui/material';
import { Alerta } from '../../../../shared';

// import './ProductForm.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
const productController = new Product();
const authController = new ApiAuth();

export function ProductFormTextFields({ formik }) {
  
  //Categorias
  const category = [
    { label: 'accesorios', key: 'accesorios', value: 'accesorios' },
    { label: 'alimentos', key: 'alimentos', value: 'alimentos' },
    { label: 'bienestar', key: 'bienestar', value: 'bienestar' },
    { label: 'entrenamiento', key: 'entrenamiento', value: 'entrenamiento' },
    { label: 'higiene', key: 'higiene', value: 'higiene' },
    { label: 'juguetes', key: 'juguetes', value: 'juguetes' },
    { label: 'medicamento', key: 'medicamento', value: 'medicamento' },
    { label: 'reproduccion', key: 'reproduccion', value: 'reproduccion' },
    { label: 'terrario_acuario', key: 'terrario_acuario', value: 'terrario_acuario' },
    { label: 'transporte', key: 'transporte', value: 'transporte' },
  ];

  // Limitar precio unitario a dos decimales
  const handleChange = (event) => {
    const inputValue = event.target.value;
    if (/^\d+(\.\d{0,2})?$/.test(inputValue) || inputValue === '') {
      formik.handleChange(event);
    }
  };
// ----- INICIO CODIGO PARA ARRAY DINAMICO-------------------

const [billDetails, setBillDetails] = useState([]);
const lastBillDetailCardRef = useRef(null);

const addBillDetail = () => {
  const newBillDetails = [...formik.values.billsDetails, { quantity: 1, productId: 1 }];
  setBillDetails(newBillDetails);
  formik.setFieldValue('billsDetails', newBillDetails);

  if (lastBillDetailCardRef.current) {
    lastBillDetailCardRef.current.scrollIntoView({ behavior: 'smooth' });
  }
};

const removeBillDetail = (index) => {
  const newBillDetails = formik.values.billsDetails.filter((_, i) => i !== index);
  formik.setFieldValue('billsDetails', newBillDetails);
  setBillDetails(newBillDetails);
};

useEffect(() => {
  setBillDetails(formik.initialValues.billsDetails);
}, [formik.values.billsDetails]);
// ----- FIN CODIGO PARA ARRAY DINAMICO-------------------


  return (
  <>
    <Grid container spacing={1} justifyContent="space-between" textAlign="center" columns={{ xs: 4, sm: 8, md: 12 }}>

      <Grid item xs={12} sm={12}>
      <Autocomplete
          disablePortal
          id='category'
          name='category'
          size='small'
          options={category}
          onChange={(_, data) =>
            formik.setFieldValue('category', data?.value || '')
          }
          value={formik.values.category}
          renderInput={(params) => (
          
            <TextField
              {...params}
              label='Seleccione una Categoria'
              InputProps={{
                ...params.InputProps,
                endAdornment: <>{params.InputProps.endAdornment}</>,
              }}
              error={formik.touched.category && formik.errors.category}
              helperText={formik.touched.category && formik.errors.category}
            />
            )}
          />      
      </Grid>
      
      <Grid item xs={4} sm={8} md={12}>
        <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
          {billDetails && billDetails.map((bill, index) => (
            <Grid
              container
              spacing={1}
              justifyContent="space-between"
              textAlign="center"
              key={index}
              sx={{ mt: 0.5 }}
            >
              <Paper elevation={3} sx={{ width: "95%", maxWidth: '95%', mt: 0.5, ml: 1.5 }}>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Product ID</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody> 
                      <TableRow>
                        <TableCell>{bill.quantity}</TableCell>
                        <TableCell>{bill.productId}</TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="error"
                            type="button"
                            onClick={() => removeBillDetail(index)}
                          >
                            <DeleteOutline color="action" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          ))}
        </div>
      </Grid>

      <Grid item xs={4} sm={8} md={12}>
        <Button type="button" onClick={addBillDetail}>
          Agregar  Factura
        </Button>
      </Grid>
    </Grid>
    </>
  );
}

const FactureForm = (props) => {
  const { close, facture } = props;
  const [isError, setIsError] = useState(false);
  const [success, setSuccess] = useState(false);
  const queryClient = useQueryClient();
  const accessToken = authController.getAccessToken();

  const createProductMutation = useMutation({
    mutationFn: async ({ formValue }) => {
      try {
        // agregar el create al bills
        // const result = await productController.createProduct(accessToken, formValue);
  
      } catch (error) {
        throw error;
      }
    },
    onSuccess: async () => {
      queryClient.invalidateQueries(['products']);
      setSuccess(true);
    },
    onError: async () => {
      setIsError(true);
    },
  });



  const updateProductMutation = useMutation({
    mutationFn: ({ productId, formValue }) => {
      const accessToken = authController.getAccessToken();
      //cambiar por el endpoint de bills
      // return productController.updateProduct(accessToken, productId, formValue);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
      setSuccess(true);
    },
    onError: () => {
      setIsError(true);
    },
  });

//manipulacion y validacion de los campos
const formik = useFormik({
  initialValues: initialValuesBills,
  validationSchema: validateBillsCreate,
  validateOnChange: false,
  onSubmit: async (formValue) => {
    if (!product) {
      //cambiar por endpoint bills
      console.log(formValue);
      createProductMutation.mutate({formValue});
    }
      updateProductMutation.mutate({accessToken, productId: product.id, formValue});

    setTimeout(() => {
      close();
    }, 1500);
  },
});
return (
  <>
    <div className='hide-scrollbar'>
      <form onSubmit={formik.handleSubmit}>
      <br />

        {/*Campos de llenado del formulario*/}
        <ProductFormTextFields formik={formik}/>
        <br />
        <Grid
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            margin: '0 auto',
          }}
        >
          <Button
            type='submit'
            size='medium'
            sx={{ mx: 2, marginTop: '12px' }}
          >
            Actualizar
          </Button>
          <Button
            color='error'
            onClick={close}
            size='medium'
            sx={{ mx: 2, marginTop: '12px' }}
          >
            Cancelar
          </Button>
        </Grid>
        {success && (
          <Alerta
            type={'success'}
            title={
              product ? 'Producto Actualizado' : 'Producto Registrado'
            }
            message={
              product
                ? 'Se ha actualizado correctamente el producto'
                : 'Se ha registrado correctamente'
            }
            strong={product ? `${product.nameProduct}` : 'Verifica el registro'}
          />
        )}
        {isError && (
          <Alerta
            type={'error'}
            title={'¡Ha ocurrido un problema!'}
            message={
              product
                ? 'No se actualizo el producto correctamente'
                : 'No se registro el producto correctamente'
            }
            strong={product ? `${product.nameProduct}` : 'Verifica la información ingresada'}
          />
        )}
      </form>
    </div>
  </>
);
};

export { FactureForm };
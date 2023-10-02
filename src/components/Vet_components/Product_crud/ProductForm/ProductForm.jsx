import React, { useState } from 'react';

//Esquemas de validaciones y manipulacion de datos
import { useFormik } from 'formik';
import { initialValuesProduct, validationSchemaProductRegister } from './ProductFormValidate';

//Backend petitions
import { ApiAuth } from '../../../../api/Auth.api';
import { Product } from '../../../../api/Product.api';

//MUI Material
import Autocomplete from '@mui/material/Autocomplete';
import { Grid, TextField, Button } from '@mui/material';
import { Alerta } from '../../../../shared';

//Estilos
import './ProductForm.css';
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

  return (
  <>
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          name='nameProduct'
          label='Nombre'
          variant='outlined'
          size='small'
          onChange={formik.handleChange}
          value={formik.values.nameProduct}
          error={formik.touched.nameProduct && Boolean(formik.errors.nameProduct)}
          helperText={formik.touched.nameProduct && formik.errors.nameProduct}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          name='sizeProduct'
          label='Presentación'
          variant='outlined'
          placeholder='Ejemplo: Unidad'
          size='small'
          value={formik.values.sizeProduct || null}
          onChange={formik.handleChange}
          error={formik.touched.sizeProduct && Boolean(formik.errors.sizeProduct)}
          helperText={formik.touched.sizeProduct && formik.errors.sizeProduct}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
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
      
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          name='descriptionProduct'
          label='Descripción'
          variant='outlined'
          size='small'
          value={formik.values.descriptionProduct || null}
          onChange={formik.handleChange}
          error={ formik.touched.descriptionProduct && Boolean(formik.errors.descriptionProduct) }
          helperText={ formik.touched.descriptionProduct && formik.errors.descriptionProduct }
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          name='sellingProduct'
          label='Precio Unitario'
          variant='outlined'
          size='small'
          value={formik.values.sellingProduct}
          onChange={handleChange}
          type='number'
          InputProps={{
            startAdornment: <span>$</span>,
          }}
          error={formik.touched.sellingProduct && Boolean(formik.errors.sellingProduct)}
          helperText={formik.touched.sellingProduct && formik.errors.sellingProduct}
        />
      </Grid>
    </Grid>
    </>
  );
}

const ProductForm = (props) => {
  const { close, product } = props;
  const [isError, setIsError] = useState(false);
  const [success, setSuccess] = useState(false);
  const queryClient = useQueryClient();
  const accessToken = authController.getAccessToken();

  const createProductMutation = useMutation({
    mutationFn: async ({ formValue }) => {
      try {
        const result = await productController.createProduct(accessToken, formValue);
  
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
      return productController.updateProduct(accessToken, productId, formValue);
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
  initialValues: initialValuesProduct(product),
  validationSchema: validationSchemaProductRegister(product),
  validateOnChange: false,
  onSubmit: async (formValue) => {
    if (!product) {
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
            {product ? 'Actualizar' : 'Registrar'}
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

export { ProductForm };
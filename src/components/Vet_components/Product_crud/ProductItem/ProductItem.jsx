import React, { useState } from 'react';
import { IconButton, Avatar, Grid, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

//Mui material
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CategoryIcon from '@mui/icons-material/Category';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import ListItemText from '@mui/material/ListItemText';
import { createTheme, ThemeProvider } from '@mui/material';

//style of format
import './ProductItem.css';

//Modal Update/Register/Delete/
import {
  Modal_Product,
  Modal_delete,
  Alerta,
} from '../../../../shared';

//objetos children que se renderizan dentro del modal
import { ProductForm } from '../ProductForm';

//import petitions of back
import { Product } from '../../../../api/Product.api';
import { NavLink } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiAuth } from '../../../../api/Auth.api';

//controladores de las clases API
const productController = new Product();
const authController = new ApiAuth();
const defaultTheme = createTheme();

export function ProductItem({ product, onReload }) {
  //elementos enviados a ProductItem en props
  // const { product, onReload } = props;

  //verificacion de error en la ejecución
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  //useState que controla el estado del (abrir o cerrar) modal Update/Register
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState('');

  //useState que controla el estado del (abrir o cerrar) modal Delete
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');

  //seteo del titulo del modal de eliminar
  const [titleDelete, setTitleDelete] = useState('');

  //funciones que cambia el estado
  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onCloseConfirm = () => setShowConfirm((prevState) => !prevState);

  //funcion que ejecuta el boton correspondiente (Update pencilIcon)
  const openUpdateProduct = () => {
    setTitleModal(`Actualizar Producto: ${product.nameProduct}`);
    onOpenCloseModal();
  };

  //funcion que ejecuta el boton correspondiente (Delete TrashIcon)
  const openDeleteProduct = () => {
    setTitleDelete(`Eliminar Producto: ${product.nameProduct}`);
    setConfirmMessage(`¿Esta seguro de que desea eliminar el producto?`);
    onCloseConfirm();
  };
  const accessToken = authController.getAccessToken();
  const queryClient = useQueryClient();

  const deleteProductMutation = useMutation({
    mutationFn: async ({ accessToken }) => {
      await productController.deleteProduct(accessToken, product.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
      setSuccess(true);
      onCloseConfirm();
    },
    onError: () => {
      onCloseConfirm();
      setError(true);
    },
  });

  //ejecuta la peticion de eliminacion de Producto
  const onDeleteProduct = async () => {
    deleteProductMutation.mutate({ accessToken });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Demo>
        <ListItem sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <ListItemAvatar sx={{ margin: '0 auto' }}>
            <Avatar sx={{ mx: 4, width: 60, height: 60, bgcolor: '#8EC167' }}>
              <CategoryIcon sx={{ fontSize: 45 }} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText>
            <p>
              <br />
              <b>Producto: </b>
              {product.nameProduct}
              <br /> 
              <b>Presentación: </b>
              {product.sizeProduct}
              <br />     
              <b>Categoria: </b>
              {product.category}
              <br />
              <b>Descripción: </b>
              {product.descriptionProduct}
              <br />   
              <b>Precio de Venta: </b>
              $ {product.sellingProduct} 
            </p>
          </ListItemText>
          <ListItemAvatar
            sx={{ display: 'flex', flexDirection: 'row', margin: '0 auto' }}
          >
            <Grid item>
              <IconButton style={{ color: '#8EC167' }} onClick={openUpdateProduct}>
                <ModeEditIcon sx={{ fontSize: 30 }} />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton style={{ color: '#8EC167' }} onClick={openDeleteProduct}>
                <DeleteIcon sx={{ fontSize: 30 }} />
              </IconButton>
              {success && (
                <Alerta
                  type={'success'}
                  title={'¡Producto Eliminado!'}
                  message={'Se ha elimnado correctamente el producto'}
                  strong={product.nameProduct}
                />
              )}
              {error && (
                <Alerta
                  type={'error'}
                  title={'¡Ha ocurrido un problema!'}
                  message={'No se ha podido eliminar el Producto'}
                  strong={product.nameProduct}
                />
              )}
            </Grid>
          </ListItemAvatar>
        </ListItem>
        <Divider>
          <CategoryIcon color='action' style={{ width: '30px', height: '30px' }} />
        </Divider>
      </Demo>
      <Modal_Product show={showModal} close={onOpenCloseModal} title={titleModal}>
        <ProductForm close={onOpenCloseModal} product={product} />
      </Modal_Product>
      <Modal_delete
        onOpen={showConfirm}
        onCancel={onCloseConfirm}
        onConfirm={onDeleteProduct}
        content={confirmMessage}
        title={titleDelete}
        size='mini'
      ></Modal_delete>
    </ThemeProvider>
  );
}

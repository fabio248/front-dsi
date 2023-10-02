import React, { useState } from 'react';
import { Button, Box } from '@mui/material';

import { ListProduct, ProductForm } from '../../../components';
import { Modal_Product} from '../../../shared';
import './Product.css';

export function ProductCatalog() {
  const [showModal, setShowModal] = useState(false);
  const [value, setValue] = useState(0);

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onReload = () => setReload((prevState) => !prevState);

  return (
    <div className='product-page'>
      <Button
        className='product-page_add'
        variant='contained'
        onClick={onOpenCloseModal}
      >
        Registrar Producto
      </Button>

      <div className='box-container'>
        <Box sx={{ width: '100%' }}>
          {/* renderizando a los Productos */}
          <ListProduct />
        </Box>
      </div>
      {showModal && (
        <Modal_Product
          show={showModal}
          close={onOpenCloseModal}
          title='Crear Nuevo Producto'
        >
          <ProductForm close={onOpenCloseModal} onReload={onReload} />
        </Modal_Product>
      )}
    </div>
  );
}
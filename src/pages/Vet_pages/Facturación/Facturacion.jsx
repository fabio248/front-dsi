import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import {Modal_Facture  } from "../../../shared"
import {ListFacture} from "../../../components"
import {FactureForm} from "../../../components"

export function FacturacionCatalog() {
    const [showModal, setShowModal] = useState(false);
    const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
    return (
        <div className='product-page'>
          <Button
            className='product-page_add'
            variant='contained'
            onClick={onOpenCloseModal}
          >
            Registrar Factura
          </Button>
    
          <div className='box-container'>
            <Box sx={{ width: '100%' }}>
              {/* renderizando a las facturas */}
              <ListFacture />
            </Box>
          </div>
          {showModal && (
            <Modal_Facture
            show={showModal}
              close={onOpenCloseModal}
              title='Crear Factura'
            >
            <FactureForm close={onOpenCloseModal} />
            </Modal_Facture>
          )}
        </div>
      );
}
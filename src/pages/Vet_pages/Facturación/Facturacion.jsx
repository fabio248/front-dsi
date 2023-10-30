import React, { useState } from 'react';
import {Button, Box, AlertTitle} from '@mui/material';
import {Modal_Facture  } from "../../../shared"
import {ListFacture} from "../../../components"
import {FactureForm} from "../../../components"
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export function BillsPage() {
    const [showModal, setShowModal] = useState(false);
    const [showSuccessCreationBillAlert, setShowSuccessCreationBillAlert] = useState()

    const onCloseSnackbar = () => setShowSuccessCreationBillAlert(false);
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
              <ListFacture />
            </Box>
          </div>
          {showModal && (
            <Modal_Facture
            show={showModal}
              close={onOpenCloseModal}
              title='Crear Factura'
            >
                <FactureForm close={onOpenCloseModal} setShowAlert={setShowSuccessCreationBillAlert} />
            </Modal_Facture>
          )}
            {showSuccessCreationBillAlert &&
                <>
                    <Snackbar open={showSuccessCreationBillAlert} autoHideDuration={6000} onClose={onCloseSnackbar}>
                        <Alert severity="success" variant="filled">
                            <AlertTitle>Exito</AlertTitle>
                            Factura creada con exito
                        </Alert>
                    </Snackbar>
                </>
                }
        </div>
      );
}
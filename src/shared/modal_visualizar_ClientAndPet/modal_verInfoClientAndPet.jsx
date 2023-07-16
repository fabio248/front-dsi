import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Divider } from '@mui/material';
import { format } from 'date-fns';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '1100px',
  maxHeight: '90vh',
  height: '75vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export function Modal_verInfoClientAndPet({
  show,
  close,
  title,
  children,
  dataUser,
}) {
  const handleModalClose = () => {
    close();
  };

  return (
    <div>
      <Modal
        open={show}
        onClose={handleModalClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        style={{ tabSize: '200px' }}
      >
        <Box sx={style}>
          <Typography
            id='modal-modal-title'
            variant='h5'
            component='p'
            style={{ textAlign: 'center', marginBottom: '20px' }}
          >
            {title}
          </Typography>

          <Typography
            id='modal-modal-description'
            sx={{ mt: 6 }}
            component={'div'}
            textAlign={'center'}
          >
            <div
              className='estilos-pets'
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '15px',
                textAlign: 'center',
              }}
            ></div>
            <Divider />
            {children}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

import React from 'react';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

export const modalStyle = {
  position: 'absolute',
  borderRadius: 5,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 800,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export function SharedModal({ show, close, title, children }) {
  if (!show) {
    return null;
  }

  return (
    <Modal
      open={show}
      onClose={close}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={modalStyle}>
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          {title}
        </Typography>
        <Box
          id='modal-modal-description'
          sx={{ mt: 2, p:0, mx:0 }}
        >
          {children}
        </Box>
      </Box>
    </Modal>
  );
}

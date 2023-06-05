import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxwidth: 800,
  minWidth: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export function Modal_users(props) {
  const { show, close, title, children } = props;
  return (
    <div>
      <Modal
        open={show}
        onClose={close}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='p' component='h2'>
            {title}
          </Typography>
          <Typography
            id='modal-modal-description'
            sx={{ mt: 2 }}
            component={'p'}
          >
            {children}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

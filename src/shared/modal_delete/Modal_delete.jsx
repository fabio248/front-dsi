import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export function Modal_delete(props) {
  const [open, setOpen] = React.useState(false);
  const { onOpen, onCancel, content, title, onConfirm } = props;

  return (
    <div>
      <Dialog
        open={onOpen}
        onClose={onCancel}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel} autoFocus>
            Cancelar
          </Button>
          <Button onClick={onConfirm} type='submit' color='error'>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

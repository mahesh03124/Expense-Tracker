import React from 'react';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

const UpdateRemoveModal = ({ open, handleClose, handleDeleteTransaction }) => {
  return (
    <Modal open={open} onClose={handleClose} style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', color: 'white' }}>
      <ModalDialog variant="outlined" role="alertdialog" style={{  backgroundColor:'#2c3e50' }}>
        <DialogTitle style={{ color: 'white' }}>
          <WarningRoundedIcon />
          Confirmation
        </DialogTitle>
        <Divider />
        <DialogContent style={{ color: 'white' }}>
          Are you sure you want to delete the transaction..?
        </DialogContent>
        <DialogActions >
          <Button variant="solid" color="danger" onClick={handleDeleteTransaction} style={{ color: 'white' }}>
            Delete
          </Button>
          <Button variant="plain" color="success" onClick={handleClose} >
            Cancel
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
};

export default UpdateRemoveModal;

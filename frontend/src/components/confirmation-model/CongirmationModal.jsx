import React from 'react';
import { Modal, Box, Typography, Button, Backdrop, Fade } from '@mui/material';
import { LoadingButton } from '@mui/lab';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function ConfirmationModal({
  open = false,
  onClose = () => {},
  onConfirm = () => {},
  confirming = false,
  color = 'error',
  confirmationTitle = 'Confirm Action',
  confirmationDescription = 'Are you sure you want to perform this action?',
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography id="confirmation-modal-title" variant="h6" color={color} component="h2">
            {confirmationTitle}
          </Typography>
          <Typography id="confirmation-modal-description" sx={{ mt: 2 }}>
            {confirmationDescription}
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <LoadingButton
              variant="contained"
              color={color}
              onClick={onConfirm}
              loading={confirming}
            >
              Confirm
            </LoadingButton>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}

export default ConfirmationModal;

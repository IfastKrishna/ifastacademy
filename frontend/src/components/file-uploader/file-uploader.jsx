import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Button, IconButton, Modal, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';

const FileUploader = ({
  acceptFiles = '*',
  maxLimit = Infinity,
  maxSize = Infinity,
  minSize = 0,
  isOpen,
  onClose = () => {},
}) => {
  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    console.log('Accepted files:', acceptedFiles);
    console.log('Rejected files:', fileRejections);
  }, []);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles, fileRejections } = useDropzone({
    accept: acceptFiles,
    maxFiles: maxLimit,
    maxSize: maxSize,
    minSize: minSize,
    onDrop,
  });

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="dropzone-modal-title"
      aria-describedby="dropzone-modal-description"
    >
      <Box sx={style}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography id="dropzone-modal-title" variant="h6" component="h5">
            Upload Files
          </Typography>
          <IconButton onClick={onClose}>
            <Close fontSize="small" />
          </IconButton>
        </Box>
        <Typography fontSize={12}>
          You can upload multiple files at once. The maximum file size is 5MB.
        </Typography>
        <Box
          {...getRootProps()}
          sx={{
            border: '1px dashed #000',
            borderRadius: 1,
            padding: 4,
            textAlign: 'center',
            cursor: 'pointer',
            marginTop: 2,
          }}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p style={{ fontSize: '14px' }}>Drop the files here...</p>
          ) : (
            <p style={{ fontSize: '14px' }}>
              Drag 'n' drop some files here, or click to select files
            </p>
          )}
        </Box>
        <Box sx={{ marginTop: 2, float: 'right' }}>
          <Button variant="contained" size="small" color="primary" sx={{ marginLeft: 1 }}>
            Import
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default FileUploader;

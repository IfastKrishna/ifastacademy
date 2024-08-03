import { Close, InsertDriveFileOutlined } from '@mui/icons-material';
import { Box, IconButton, Paper, Typography } from '@mui/material';
import React from 'react';

function FileView({
  filename = 'xyx.pdf',
  fileUrl,
  fileType = 'pdf',
  fileSize = '5MB',
  apiResponse,
  actions = { onDownload: () => {}, onDelete: () => {}, onCancel: () => {}, onUpload: () => {} },
}) {
  return (
    <Box
      component={Paper}
      sx={{ display: 'flex', p: 1, mb: 2, gap: 1, alignItems: 'center', m: 1 }}
    >
      <Box
        sx={{
          p: '5px',
          backgroundColor: '#ddd',
          borderRadius: 1,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <InsertDriveFileOutlined />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Typography sx={{ whiteSpace: 'nowrap' }}>{filename}</Typography>
        <Typography fontSize={10} fontWeight={400}>
          {fileSize}
        </Typography>
      </Box>
      <Box>
        <IconButton onClick={actions?.onDelete}>
          <Close sx={{ fontSize: '16px' }} />
        </IconButton>
      </Box>
    </Box>
  );
}

export default FileView;

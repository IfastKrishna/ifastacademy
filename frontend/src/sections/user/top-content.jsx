import { Box, Typography } from '@mui/material';
import React from 'react';
import HeaderMenu from 'src/components/data-table/header-menu';

function TopContent({ handleClickOpen = () => {} }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography variant="h5" component="h1">
        Users
      </Typography>

      <HeaderMenu
        onColumnFilter={() => {}}
        // onAdd={() => {}}
        // onDelete={() => {}}
        // onTemplateDownload={() => {}}
        // onUpload={() => {}}
      />
    </Box>
  );
}

export default TopContent;

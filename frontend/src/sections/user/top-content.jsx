import { Box, Typography } from '@mui/material';
import React from 'react';
import HeaderMenu from 'src/components/data-table/header-menu';
import { useRouter } from 'src/routes/hooks';

function TopContent({ handleClickOpen = () => {} }) {
  const route = useRouter();
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography variant="h5" component="h1">
        Users
      </Typography>

      <HeaderMenu
        onColumnFilter={() => {}}
        onAdd={() => route.push('/user/create')}
        // onDelete={() => {}}
        // onTemplateDownload={() => {}}
        // onUpload={() => {}}
      />
    </Box>
  );
}

export default TopContent;

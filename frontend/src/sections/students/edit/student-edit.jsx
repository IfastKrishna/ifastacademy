import React from 'react';
import { Box } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { usePathname } from 'src/routes/hooks';
import config from 'src/config';

function StudentEdit() {
  const { id } = useParams();
  const pathname = usePathname();
  const disabled = !pathname.includes('edit');

  return (
    <Box>
      <Helmet>
        <title>
          Student {disabled ? 'View' : 'Edit'} | {config?.appName}
        </title>
      </Helmet>
      <h1>Student {disabled ? 'View' : 'Edit'}</h1>
    </Box>
  );
}

export default StudentEdit;

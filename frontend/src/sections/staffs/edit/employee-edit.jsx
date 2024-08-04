import { Box } from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { usePathname } from 'src/routes/hooks';

function EmployeeEdit() {
  const { id } = useParams();
  const pathname = usePathname();
  const disabled = !pathname.includes('edit');

  return (
    <Box>
      <Helmet>
        <title>Employee {disabled ? 'View' : 'Edit'} | IfastAcademy</title>
      </Helmet>
      <h1>Employee {disabled ? 'View' : 'Edit'}</h1>
    </Box>
  );
}

export default EmployeeEdit;

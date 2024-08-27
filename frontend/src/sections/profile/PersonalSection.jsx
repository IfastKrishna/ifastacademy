import { Box, Button, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import React from 'react';
import Iconify from 'src/components/iconify/iconify';

function PersonalInformation({
  title = 'Personal Information',
  firstName = 'John',
  lastName = 'Doe',
  email = 'johndoe@gmail.com',
  phoneNo = '9905242174',
  ifastId = 'IFAST/2023/0032',
}) {
  return (
    <Box sx={{ p: 2, mt: 2, border: '1px solid #ddd', borderRadius: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', aligns: 'center' }}>
        <Typography variant="h5">{title}</Typography>
      </Box>
      <Box sx={{ mt: 2, width: '100%' }}>
        <Grid2 container spacing={2}>
          <Grid2 xs={12} sm={6}>
            <Typography variant="body2">First Name</Typography>
            <Typography variant="h6">{firstName}</Typography>
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <Typography variant="body2">Last Name</Typography>
            <Typography variant="h6">{lastName}</Typography>
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <Typography variant="body2">Email</Typography>
            <Typography variant="h6">{email}</Typography>
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <Typography variant="body2">Phone No</Typography>
            <Typography variant="h6">+91 {phoneNo}</Typography>
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <Typography variant="body2">ID</Typography>
            <Typography variant="h6">{ifastId}</Typography>
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  );
}

export default PersonalInformation;

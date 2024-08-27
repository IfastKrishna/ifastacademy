import { Box, Button, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import React from 'react';
import Iconify from 'src/components/iconify/iconify';

function Address({
  title = 'Address',
  streetAddress = 'holambi kalan, delhi',
  city = 'Delhi',
  postalCode = '110082',
  state = 'Delhi',
  country = 'India',
}) {
  return (
    <Box sx={{ p: 2, mt: 2, border: '1px solid #ddd', borderRadius: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', aligns: 'center' }}>
        <Typography variant="h5">{title}</Typography>
      </Box>
      <Box sx={{ mt: 2, width: '100%' }}>
        <Grid2 container spacing={2}>
          <Grid2 xs={12} sm={6}>
            <Typography variant="body2">Street Address</Typography>
            <Typography variant="h6">{streetAddress}</Typography>
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <Typography variant="body2">City</Typography>
            <Typography variant="h6">{city}</Typography>
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <Typography variant="body2">Pin Code</Typography>
            <Typography variant="h6">{postalCode}</Typography>
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <Typography variant="body2">State</Typography>
            <Typography variant="h6">{state}</Typography>
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <Typography variant="body2">Country</Typography>
            <Typography variant="h6">{country}</Typography>
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  );
}

export default Address;

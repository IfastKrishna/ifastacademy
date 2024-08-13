import { Avatar, Box, Button, Chip, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import React from 'react';
import Iconify from 'src/components/iconify/iconify';

function HeadInformation({
  firstName = 'John',
  role = 'superadmin',
  lastName = 'Doe',
  id = 'IFAST/2023/0032',
}) {
  return (
    <Box sx={{ p: 2, mt: 2, border: '1px solid #ddd', borderRadius: 1 }}>
      <Box sx={{ width: '100%' }}>
        <Grid2 container spacing={2}>
          <Grid2 item xs={12} sm={1.2}>
            <Avatar
              sx={{ width: 80, height: 80 }}
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="Avatar"
            />
          </Grid2>
          <Grid2 item xs={12} sm={8}>
            <Typography variant="h6">
              {firstName} {lastName}
            </Typography>
            <Chip size="small" color="success" label={role} />
            <Typography variant="body2">{id}</Typography>
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  );
}

export default HeadInformation;

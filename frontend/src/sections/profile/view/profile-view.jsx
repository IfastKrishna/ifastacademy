import { Container, Paper, Typography } from '@mui/material';
import React from 'react';
import PersonalInformation from '../PersonalSection';
import HeadInformation from '../HeadSection';
import Address from '../AddreshSection';

function ProfileView() {
  return (
    <Container component={Paper} sx={{ py: 2 }}>
      <Typography variant="h4">My Profile</Typography>
      <HeadInformation />
      <PersonalInformation />
      <Address />
    </Container>
  );
}

export default ProfileView;

import { Box } from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import config from 'src/config';
import { ProfileView } from 'src/sections/profile/view';

function Profile() {
  return (
    <Box>
      <Helmet>
        <title> Profile | {config?.appName} </title>
      </Helmet>
      <ProfileView />
    </Box>
  );
}

export default Profile;

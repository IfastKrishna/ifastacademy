import { Container } from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import config from 'src/config';

function UserCreate() {
  return (
    <Container>
      <Helmet>
        <title>User Create | {config?.appName}</title>
      </Helmet>
    </Container>
  );
}

export default UserCreate;

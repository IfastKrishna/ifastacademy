import { Container } from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import config from 'src/config';

function UserEdit() {
  return (
    <Container>
      <Helmet>
        <title>User Edit | {config?.appName}</title>
      </Helmet>
    </Container>
  );
}

export default UserEdit;

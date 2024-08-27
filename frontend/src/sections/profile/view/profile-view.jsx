import { Box, Button, Container, Paper, Typography } from '@mui/material';
import React from 'react';
import PersonalInformation from '../PersonalSection';
import HeadInformation from '../HeadSection';
import Address from '../AddreshSection';
import useIsAuth from 'src/libs/query/isAuth/useIsAuth';
import Iconify from 'src/components/iconify';
import { useRouter } from 'src/routes/hooks';

function ProfileView() {
  const { data } = useIsAuth();
  const router = useRouter();
  return (
    <Container component={Paper} sx={{ py: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', aligns: 'center' }}>
        <Typography variant="h4">My Profile</Typography>
        <Button
          size="small"
          variant="contained"
          sx={{ display: 'flex', gap: 1 }}
          onClick={() => {
            router.push('/profile/edit');
          }}
        >
          <Iconify icon="pepicons-pop:pen" /> Edit
        </Button>
      </Box>

      <HeadInformation {...data?.data} />
      <PersonalInformation {...data?.data} />
      {data?.data?.address && <Address {...data?.data.address} />}
    </Container>
  );
}

export default ProfileView;

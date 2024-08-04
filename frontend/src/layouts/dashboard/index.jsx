import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import useIsAuth from 'src/libs/query/isAuth/useIsAuth';
import { useRouter } from 'src/routes/hooks';
import Nav from './nav';
import Main from './main';
import Header from './header';
import { Toaster } from 'react-hot-toast';

// ----------------------------------------------------------------------

export default function DashboardLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);
  const router = useRouter();
  const { data: isAuth, isLoading, isSuccess } = useIsAuth();

  return !isLoading && isSuccess ? (
    <>
      <Header onOpenNav={() => setOpenNav(true)} />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

        <Main>{children}</Main>
      </Box>
      <Toaster position="top-center" />
    </>
  ) : (
    router.push('/login')
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};

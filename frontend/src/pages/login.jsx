import { Helmet } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';

import { LoginView } from 'src/sections/login';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Login | IfastAcademy </title>
      </Helmet>

      <LoginView />
      <Toaster position="top-center" />
    </>
  );
}

import { Box, Typography } from '@mui/material';
import React from 'react';
import { ConfirmationModal } from 'src/components/confirmation-model';
import HeaderMenu from 'src/components/data-table/header-menu';
import useDisclosure from 'src/hooks/use-disclosure';
import { useRouter } from 'src/routes/hooks';

function TopContent() {
  const router = useRouter();
  const { close, isOpen, open } = useDisclosure();
  return (
    <>
      <ConfirmationModal
        onClose={close}
        open={isOpen}
        confirmationTitle="Delete All Employees"
        confirmationDescription="Are you sure you want to delete all employees?"
      />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 1 }}>
        <Typography variant="h5" component="h1">
          Staffs
        </Typography>

        <HeaderMenu onAdd={() => router.push('/employee/create')} />
      </Box>
    </>
  );
}

export default TopContent;

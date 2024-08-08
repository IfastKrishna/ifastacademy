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
        confirmationTitle="Delete All Students"
        confirmationDescription="Are you sure you want to delete all students?"
      />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 1 }}>
        <Typography variant="h5" component="h1">
          Students
        </Typography>

        <HeaderMenu
          onColumnFilter={() => {}}
          onAdd={() => router.push('/student/create')}
          // onDelete={open}
        />
      </Box>
    </>
  );
}

export default TopContent;

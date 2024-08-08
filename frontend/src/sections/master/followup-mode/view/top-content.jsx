import { Box, Typography } from '@mui/material';
import React from 'react';
import { ConfirmationModal } from 'src/components/confirmation-model';
import HeaderMenu from 'src/components/data-table/header-menu';
import useDisclosure from 'src/hooks/use-disclosure';
import { useRouter } from 'src/routes/hooks';

function TopContent() {
  const router = useRouter();
  const { close: close1, isOpen: isOpen1, open: open1 } = useDisclosure();
  return (
    <>
      <ConfirmationModal
        onClose={close1}
        open={isOpen1}
        confirmationTitle="Delete All FollowupModes"
        confirmationDescription="Are you sure you want to delete all FollowupModes"
      />

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h5" component="h1">
          Followup Modes
        </Typography>

        <HeaderMenu onAdd={() => router.push('/masters-followup-mode/create')} onDelete={open1} />
      </Box>
    </>
  );
}

export default TopContent;

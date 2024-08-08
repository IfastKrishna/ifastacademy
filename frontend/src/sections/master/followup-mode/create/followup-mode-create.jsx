import { LoadingButton } from '@mui/lab';
import { Box, Container, TextField } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm, Controller } from 'react-hook-form';
import { BreadcrumbsGen } from 'src/components/navigation-breadcumbs';
import useAddFollowupMode from 'src/libs/mutation/master/followup-mode/useAddFollowupMode';

function FollowupModeCreate() {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const { mutate: addFollowupMode, isPending, isSuccess } = useAddFollowupMode();

  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess]);

  return (
    <Container>
      <Helmet>
        <title>Followup Mode Create | IfastAcademy</title>
      </Helmet>

      <Box
        component={'form'}
        onSubmit={handleSubmit(addFollowupMode)}
        sx={{
          mt: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ width: { sx: '100%', sm: '100%', md: 500 } }}>
          <BreadcrumbsGen
            menus={[
              { title: 'Master', url: 'masters' },
              { title: 'Followup Mode', url: 'masters-followup-mode/all' },
              { title: 'Create', url: 'masters-followup-mode/create' },
            ]}
          />
          <Grid2 container spacing={2}>
            <Grid2 xs={12}>
              <Controller
                name="followupMode"
                control={control}
                defaultValue=""
                rules={{ required: 'Followup Mode name is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Followup Mode"
                    variant="standard"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
            </Grid2>

            <Grid2 xs={12}>
              <LoadingButton type="submit" loading={isPending} fullWidth variant="contained">
                Create
              </LoadingButton>
            </Grid2>
          </Grid2>
        </Box>
      </Box>
    </Container>
  );
}

export default FollowupModeCreate;

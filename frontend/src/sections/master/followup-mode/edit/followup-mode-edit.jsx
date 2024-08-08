import { LoadingButton } from '@mui/lab';
import { Box, Container, TextField } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { da } from 'date-fns/locale';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm, Controller } from 'react-hook-form';
import { BreadcrumbsGen } from 'src/components/navigation-breadcumbs';
import useUpdateFollowupMode from 'src/libs/mutation/master/followup-mode/useUpdateFollowupMode';
import useGetFollowupModeById from 'src/libs/query/master/followup-mode/useGetFollowupModeById';
import { usePathname, useRouter } from 'src/routes/hooks';

function FollowupModeEdit() {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const id = usePathname().split('/').pop();
  const isEditPage = usePathname().split('/').includes('edit');
  const router = useRouter();

  const {
    mutate: updateFollowupMode,
    isPending,
    isSuccess: updatedFollowupMode,
  } = useUpdateFollowupMode();
  const { data, isSuccess } = useGetFollowupModeById({ id: id });

  useEffect(() => {
    if (isSuccess) {
      reset({ ...data.data, id: id });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (updatedFollowupMode) {
      router.push('/masters-followup-mode/all');
    }
  }, [updatedFollowupMode]);

  return (
    <Container>
      <Helmet>
        <title>Followup Mode {isEditPage ? 'Edit' : 'View'} | IfastAcademy</title>
      </Helmet>

      <Box
        component={'form'}
        onSubmit={handleSubmit(updateFollowupMode)}
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
              { title: isEditPage ? 'Edit' : 'View', url: 'masters-followup-mode/create' },
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
                    sx={{ mt: 2 }}
                    fullWidth
                    label="Followup Mode"
                    variant="standard"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    disabled={!isEditPage}
                  />
                )}
              />
            </Grid2>
            {isEditPage && (
              <Grid2 xs={12}>
                <LoadingButton type="submit" loading={isPending} fullWidth variant="contained">
                  Update
                </LoadingButton>
              </Grid2>
            )}
          </Grid2>
        </Box>
      </Box>
    </Container>
  );
}

export default FollowupModeEdit;

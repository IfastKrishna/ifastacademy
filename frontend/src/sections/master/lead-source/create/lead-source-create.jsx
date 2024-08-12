import { LoadingButton } from '@mui/lab';
import {
  Box,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm, Controller } from 'react-hook-form';
import { BreadcrumbsGen } from 'src/components/navigation-breadcumbs';
import config from 'src/config';
import useAddLeadSource from 'src/libs/mutation/master/lead-source/useAddLeadSource';

function LeadSourceCreate() {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const { mutate: addLeadSource, isPending, isSuccess } = useAddLeadSource();

  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess]);

  return (
    <Container>
      <Helmet>
        <title>Create Lead Source | {config?.appName}</title>
      </Helmet>
      <BreadcrumbsGen
        menus={[
          { title: 'Master', url: 'masters' },
          { title: 'Lead Source', url: 'masters-lead-source/all' },
          { title: 'Create', url: 'masters-lead-source/create' },
        ]}
      />

      <Box component={'form'} onSubmit={handleSubmit(addLeadSource)} sx={{ mt: 2 }}>
        <Grid2 container spacing={2}>
          <Grid2 xs={12}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{ required: 'Course name is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Name"
                  variant="standard"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
          </Grid2>

          <Grid2 xs={12} sm={6}>
            <Controller
              name="contact"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField {...field} fullWidth variant="standard" label="Contact" />
              )}
            />
          </Grid2>

          <Grid2 xs={12} sm={6}>
            <Controller
              name="isActive"
              control={control}
              defaultValue=""
              rules={{ required: 'Course status is required' }}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.isActive} variant="standard">
                  <InputLabel>Select Status</InputLabel>
                  <Select {...field}>
                    <MenuItem value={true}>Open</MenuItem>
                    <MenuItem value={false}>Close</MenuItem>
                  </Select>
                  <FormHelperText>{errors.isActive?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Grid2>

          <Grid2 xs={12}>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  variant="standard"
                  multiline
                  rows={3}
                  label="Description"
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
    </Container>
  );
}

export default LeadSourceCreate;

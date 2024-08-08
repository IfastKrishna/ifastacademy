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
import useUpdateLeadSource from 'src/libs/mutation/master/lead-source/useUpdateLeadSource';
import useGetLeadSourceById from 'src/libs/query/master/leace-source/useGetLeadSourceById';
import { usePathname, useRouter } from 'src/routes/hooks';

function LeadSourceEdit() {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const id = usePathname().split('/').pop();
  const isEdit = usePathname().split('/').includes('edit');
  const router = useRouter();
  const { data, isSuccess: leadSourceFetched } = useGetLeadSourceById({ id });
  const { mutate: updateLeadSource, isPending, isSuccess } = useUpdateLeadSource();

  useEffect(() => {
    reset(data?.data);
  }, [leadSourceFetched]);

  useEffect(() => {
    if (isSuccess) {
      router.push('/masters-lead-source/all');
    }
  }, [isSuccess]);

  return (
    <Container>
      <Helmet>
        <title>Lead Source {isEdit ? 'Edit' : 'View'} | IfastAcademy</title>
      </Helmet>
      <BreadcrumbsGen
        menus={[
          { title: 'Master', url: 'masters' },
          { title: 'Lead Source', url: 'masters-lead-source/all' },
          { title: isEdit ? 'Edit' : 'View', url: 'masters-lead-source/create' },
        ]}
      />

      <Box component={'form'} onSubmit={handleSubmit(updateLeadSource)} sx={{ mt: 2 }}>
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
                  disabled={!isEdit}
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
              disabled={!isEdit}
            />
          </Grid2>

          <Grid2 xs={12} sm={6}>
            <Controller
              name="isActive"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.isActive} variant="standard">
                  <InputLabel>Select Status</InputLabel>
                  <Select {...field} disabled={!isEdit}>
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
                  disabled={!isEdit}
                />
              )}
            />
          </Grid2>
          {isEdit && (
            <Grid2 xs={12}>
              <LoadingButton type="submit" loading={isPending} fullWidth variant="contained">
                Update
              </LoadingButton>
            </Grid2>
          )}
        </Grid2>
      </Box>
    </Container>
  );
}

export default LeadSourceEdit;

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
import useAddFeeCategories from 'src/libs/mutation/master/fee-category/useAddFeeCategories';

function FeeCategoryCreate() {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const { mutate: addFeeCategories, isPending, isSuccess } = useAddFeeCategories();

  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess]);

  return (
    <Container>
      <Helmet>
        <title>Create Fee Categories | IfastAcademy</title>
      </Helmet>
      <BreadcrumbsGen
        menus={[
          { title: 'Master', url: 'masters' },
          { title: 'Fee Categories', url: 'masters-fee-category/all' },
          { title: 'Create', url: 'masters-fee-category/create' },
        ]}
      />

      <Box component={'form'} onSubmit={handleSubmit(addFeeCategories)} sx={{ mt: 2 }}>
        <Grid2 container spacing={2}>
          <Grid2 xs={12} sm={6}>
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
              name="amount"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField {...field} fullWidth variant="standard" label="Amount" type="number" />
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

export default FeeCategoryCreate;

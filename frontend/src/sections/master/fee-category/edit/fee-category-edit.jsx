import { LoadingButton } from '@mui/lab';
import { Box, Container, TextField } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm, Controller } from 'react-hook-form';
import { BreadcrumbsGen } from 'src/components/navigation-breadcumbs';
import config from 'src/config';
import useUpdateFeeCategories from 'src/libs/mutation/master/fee-category/useUpdateFeeCategories';
import useGetFeeCategories from 'src/libs/query/master/fee-categories/useGetFeeCategories';
import useGetFeeCategoriesById from 'src/libs/query/master/fee-categories/useGetFeeCategoriesById';
import { usePathname, useRouter } from 'src/routes/hooks';

function FeeCategoryEdit() {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const id = usePathname().split('/').pop();
  const isEditPage = usePathname().split('/').includes('edit');
  const router = useRouter();

  const { mutate: updateFeeCategories, isPending, isSuccess } = useUpdateFeeCategories();
  const { data, isLoading } = useGetFeeCategoriesById({ id: id });

  useEffect(() => {
    if (isSuccess) {
      router.push('/masters-fee-category/all');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (data) {
      reset(data.data);
    }
  }, [data]);

  const handleUpdate = (data) => {
    updateFeeCategories({ id, ...data });
  };

  return (
    <Container>
      <Helmet>
        <title>
          Fee Categories {isEditPage ? 'Edit' : 'View'} | {config?.appName}
        </title>
      </Helmet>
      <BreadcrumbsGen
        menus={[
          { title: 'Master', url: 'masters' },
          { title: 'Fee Categories', url: 'masters-fee-category/all' },
          { title: isEditPage ? 'Edit' : 'View', url: 'masters-fee-category/create' },
        ]}
      />

      <Box component={'form'} onSubmit={handleSubmit(handleUpdate)} sx={{ mt: 2 }}>
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
                  disabled={!isEditPage}
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
                <TextField
                  {...field}
                  fullWidth
                  variant="standard"
                  label="Amount"
                  type="number"
                  disabled={!isEditPage}
                />
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
    </Container>
  );
}

export default FeeCategoryEdit;

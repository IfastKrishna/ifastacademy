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
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Controller, useForm } from 'react-hook-form';
import config from 'src/config';
import useAddUser from 'src/libs/query/user/useAddUser';
import useGetNextId from 'src/libs/query/user/useGetNextId';

function UserCreate({ variant = 'standard', size = 'medium', btnSize = 'medium' }) {
  const { data, isSuccess: idFetched } = useGetNextId({});
  const { mutate: addUser, isPending, isSuccess: userRegistered } = useAddUser();

  const {
    control,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  React.useEffect(() => {
    if (idFetched) {
      setValue('ifastId', data);
    }
  }, [idFetched, data, setValue]);

  React.useEffect(() => {
    if (userRegistered) {
      reset({});
    }
  }, [userRegistered]);

  const handleAddUser = (formData) => {
    addUser(formData);
  };

  return (
    <Container>
      <Helmet>
        <title>User Create | {config?.appName}</title>
      </Helmet>
      <h1>User Create</h1>
      <Box sx={{ mt: 2 }} component="form" onSubmit={handleSubmit(handleAddUser)}>
        <Grid2 container spacing={2}>
          <Grid2 xs={12} sm={6}>
            <Controller
              name="ifastId"
              control={control}
              rules={{ required: 'User ID is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="User ID"
                  size={size}
                  variant={variant}
                  fullWidth
                  error={!!errors.ifastId}
                  helperText={errors?.ifastId?.message}
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <Controller
              name="firstName"
              control={control}
              rules={{ required: 'First Name is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="First Name"
                  size={size}
                  variant={variant}
                  fullWidth
                  error={!!errors.firstName}
                  helperText={errors?.firstName?.message}
                />
              )}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Last Name"
                  size={size}
                  variant={variant}
                  fullWidth
                  error={!!errors.lastName}
                  helperText={errors?.lastName?.message}
                />
              )}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <Controller
              name="email"
              control={control}
              rules={{ required: 'Email is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  size={size}
                  variant={variant}
                  fullWidth
                  error={!!errors.email}
                  helperText={errors?.email?.message}
                />
              )}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <Controller
              name="phoneNo"
              control={control}
              rules={{
                required: 'Phone number is required',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Phone No must be a 10-digit number',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Phone Number"
                  size={size}
                  variant={variant}
                  fullWidth
                  error={!!errors.phoneNo}
                  helperText={errors?.phoneNo?.message}
                />
              )}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <Controller
              name="role"
              control={control}
              defaultValue=""
              rules={{ required: 'Role is required' }}
              render={({ field }) => (
                <FormControl size={size} fullWidth error={!!errors.role} variant={variant}>
                  <InputLabel>Select Role</InputLabel>
                  <Select {...field} label="Select Role">
                    <MenuItem value="superadmin">SuperAdmin</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </Select>
                  <FormHelperText>{errors.role?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <Controller
              name="dob"
              control={control}
              rules={{ required: 'Date of Birth is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Date of Birth"
                  type="date"
                  size={size}
                  variant={variant}
                  fullWidth
                  error={!!errors.dob}
                  helperText={errors?.dob?.message}
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </Grid2>

          <Grid2 xs={12}>
            <LoadingButton size={btnSize} loading={isPending} type="submit" variant="contained">
              Create User
            </LoadingButton>
          </Grid2>
        </Grid2>
      </Box>
    </Container>
  );
}

export default UserCreate;

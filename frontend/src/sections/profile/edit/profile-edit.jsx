import { LoadingButton } from '@mui/lab';
import { Box, Container, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import useUpdateUserProfile from 'src/libs/mutation/user/useUpdateProfile';
import useIsAuth from 'src/libs/query/isAuth/useIsAuth';
import { useRouter } from 'src/routes/hooks';

function ProfileEdit({
  variant = 'standard',
  size = 'medium',
  btnSize = 'medium',
  btnVariant = 'contained',
  btnColor = 'primary',
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const router = useRouter();
  const user = useIsAuth()?.data?.data;
  const { mutate: updateProfile, isPending, isSuccess } = useUpdateUserProfile();

  useEffect(() => {
    if (isSuccess) {
      router.push('/profile');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (user) {
      reset({
        ifastId: user.ifastId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNo: user.phoneNo,
        streetAddress: user?.address?.streetAddress,
        city: user?.address?.city,
        postalCode: user?.address?.postalCode,
        state: user?.address?.state,
        country: user?.address?.country,
        _id: user._id,
        role: user.role,
      });
    }
  }, [user, reset]);

  const onSubmit = (data) => {
    updateProfile(data);
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Update Profile
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid xs={12} md={6}>
            <Controller
              name="ifastId"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Student Id"
                  variant={variant}
                  size={size}
                  {...field}
                  disabled
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </Grid>
          <Grid xs={12} md={6}>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="First Name"
                  variant={variant}
                  size={size}
                  {...field}
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </Grid>
          <Grid xs={12} md={6}>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Last Name"
                  variant={variant}
                  size={size}
                  {...field}
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </Grid>
          <Grid xs={12} md={6}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Email"
                  variant={variant}
                  size={size}
                  {...field}
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </Grid>
          <Grid xs={12} md={6}>
            <Controller
              name="phoneNo"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Phone No"
                  variant={variant}
                  size={size}
                  {...field}
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </Grid>

          {user?.address && (
            <>
              <Grid xs={12} md={6}>
                <Controller
                  name="streetAddress"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="Street Address"
                      variant={variant}
                      size={size}
                      {...field}
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="City"
                      variant={variant}
                      size={size}
                      {...field}
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <Controller
                  name="postalCode"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="Postal Code"
                      variant={variant}
                      size={size}
                      {...field}
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <Controller
                  name="state"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="State"
                      variant={variant}
                      size={size}
                      {...field}
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="Country"
                      variant={variant}
                      size={size}
                      {...field}
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                />
              </Grid>
            </>
          )}
        </Grid>

        <LoadingButton
          sx={{ mt: 2 }}
          variant={btnVariant}
          size={btnSize}
          color={btnColor}
          fullWidth
          type="submit"
          loading={isPending}
        >
          Update
        </LoadingButton>
      </Box>
    </Container>
  );
}

export default ProfileEdit;

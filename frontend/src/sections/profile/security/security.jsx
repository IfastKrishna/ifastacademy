import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Container, IconButton, InputAdornment, Paper, TextField, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm, Controller } from 'react-hook-form';
import config from 'src/config';
import { useUI } from 'src/context/CostomeUi';
import useUpdatePassword from 'src/libs/mutation/user/useUpdatePassowrd';

function Security() {
  const { uiSettings } = useUI();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const { mutate: updatePassword, isPending, isSuccess } = useUpdatePassword();

  React.useEffect(() => {
    if (isSuccess) {
      reset(); // Resets the form fields
    }
  }, [isSuccess, reset]);

  const onSubmit = (data) => {
    updatePassword(data);
  };

  return (
    <Container maxWidth="sm">
      <Helmet>
        <title>Security | {config.appName}</title>
      </Helmet>
      <Paper
        elevation={3}
        sx={{
          padding: {
            xs: 2,
            md: 4,
          },
          marginTop: 4,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Change Password
        </Typography>
        <Typography variant="body2" gutterBottom>
          Change your password here.
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid2 container spacing={3}>
            <Grid2 xs={12}>
              <Controller
                name="oldPassword"
                control={control}
                rules={{ required: 'Current password is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Current Password"
                    type="password"
                    variant={uiSettings.textFieldVariant}
                    size={uiSettings.textFieldSize}
                    error={!!errors.oldPassword}
                    helperText={errors.oldPassword?.message}
                  />
                )}
              />
            </Grid2>
            <Grid2 xs={12}>
              <Controller
                name="newPassword"
                control={control}
                rules={{ required: 'New password is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="New Password"
                    type={showNewPassword ? 'text' : 'password'}
                    variant={uiSettings.textFieldVariant}
                    size={uiSettings.textFieldSize}
                    error={!!errors.newPassword}
                    helperText={errors.newPassword?.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowNewPassword((show) => !show)}
                            edge="end"
                          >
                            {showNewPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid2>
            <Grid2 xs={12}>
              <Controller
                name="confirmPassword"
                control={control}
                rules={{
                  required: 'Please confirm your new password',
                  validate: (value) => value === watch('newPassword') || "Passwords don't match",
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    variant={uiSettings.textFieldVariant}
                    size={uiSettings.textFieldSize}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowConfirmPassword((show) => !show)}
                            edge="end"
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid2>
            <Grid2 xs={12}>
              <LoadingButton
                fullWidth
                variant={uiSettings.btnVariant}
                color={uiSettings.btnColor}
                size={uiSettings.btnSize}
                loading={isPending}
                type="submit"
              >
                Change Password
              </LoadingButton>
            </Grid2>
          </Grid2>
        </form>
      </Paper>
    </Container>
  );
}

export default Security;

import React, { useEffect } from 'react';
import {
  Box,
  Container,
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { LoadingButton } from '@mui/lab';
import useGetNextId from 'src/libs/query/user/useGetNextId';
import useAddEmployee from 'src/libs/mutation/employee/useAddEmployee';
import { BreadcrumbsGen } from 'src/components/navigation-breadcumbs';
import config from 'src/config';

function EmployeeCreate() {
  const [fetching, setFetching] = React.useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: 'employee',
    },
  });

  const { data, isSuccess: FetchedStudent } = useGetNextId({ fetching });
  const { mutate: addEmployee, isSuccess, isPending } = useAddEmployee();
  useEffect(() => {
    if (FetchedStudent) {
      setValue('ifastId', data);
    }
  }, [FetchedStudent]);

  useEffect(() => {
    if (isSuccess) {
      reset();
      setFetching(!fetching);
    }
  }, [isSuccess]);

  const navBread = [
    { title: 'Employees', url: 'employee/all' },
    { title: 'Create', url: 'employee/create' },
  ];

  return (
    <Container>
      <Helmet>
        <title>Create staff | {config?.appName}</title>
      </Helmet>
      <BreadcrumbsGen menus={navBread} />
      <Box component="form" onSubmit={handleSubmit(addEmployee)} sx={{ mt: 2 }}>
        <Grid2 container spacing={2}>
          <Grid2 xs={12} sm={6}>
            <TextField
              label="Institute ID"
              variant="standard"
              {...register('ifastId', { required: 'Institute ID is required', value: data })}
              fullWidth
              error={!!errors?.ifastId}
              helperText={errors?.ifastId?.message}
            />
          </Grid2>

          <Grid2 xs={12} sm={6}>
            <TextField
              label="First Name"
              variant="standard"
              {...register('firstName', { required: 'First name is required' })}
              fullWidth
              error={!!errors.firstName}
              helperText={errors.firstName ? errors.firstName.message : ''}
            />
          </Grid2>

          <Grid2 xs={12} sm={6}>
            <TextField
              label="Last Name"
              variant="standard"
              {...register('lastName')}
              fullWidth
              error={!!errors?.lastName}
              helperText={errors?.lastName?.message}
              InputLabelProps={{ shrink: true }}
            />
          </Grid2>

          <Grid2 xs={12} sm={6}>
            <TextField
              label="Email"
              variant="standard"
              {...register('email', { required: 'Email is required' })}
              fullWidth
              error={!!errors.email}
              helperText={errors?.email?.message}
            />
          </Grid2>

          <Grid2 xs={12} sm={6}>
            <TextField
              label="Phone Number"
              variant="standard"
              {...register('phoneNo', {
                required: 'Phone number is required',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Phone No must be a 10-digit number',
                },
              })}
              fullWidth
              error={!!errors?.phoneNo}
              helperText={errors?.phoneNo?.message}
            />
          </Grid2>

          <Grid2 xs={12} sm={6}>
            <TextField
              label="Emergency Contact"
              variant="standard"
              {...register('emergencyContact')}
              fullWidth
              error={!!errors?.emergencyContact}
              helperText={errors?.emergencyContact?.message}
            />
          </Grid2>

          <Grid2 xs={12} sm={6}>
            <TextField
              label="Date of Birth"
              type="date"
              variant="standard"
              {...register('dob', { required: 'Date of Birth is required' })}
              fullWidth
              error={!!errors?.dob}
              helperText={errors?.dob?.message}
              InputLabelProps={{ shrink: true }}
            />
          </Grid2>

          <Grid2 xs={12} sm={6}>
            <FormControl fullWidth variant="standard" error={!!errors?.jobTitle}>
              <InputLabel>Select Job Title</InputLabel>
              <Controller
                name="jobTitle"
                control={control}
                defaultValue=""
                rules={{ required: 'Job Title is required' }}
                render={({ field }) => (
                  <Select {...field}>
                    <MenuItem value="staff">Staff</MenuItem>
                    <MenuItem value="teacher">Teacher</MenuItem>
                  </Select>
                )}
              />
              <FormHelperText>{errors?.jobTitle?.message}</FormHelperText>
            </FormControl>
          </Grid2>

          <Grid2 xs={12} sm={6}>
            <TextField
              label="Start Date"
              type="date"
              variant="standard"
              {...register('startDate', {
                required: 'Start Date is required',
                value: new Date().toISOString().split('T')[0],
              })}
              fullWidth
              error={!!errors?.startDate}
              helperText={errors?.startDate?.message}
            />
          </Grid2>

          <Grid2 xs={12} sm={6}>
            <TextField
              label="End Date"
              type="date"
              variant="standard"
              {...register('endDate')}
              fullWidth
              error={!!errors?.endDate}
              helperText={errors?.endDate?.message}
              InputLabelProps={{ shrink: true }}
            />
          </Grid2>

          <Grid2 xs={12} sm={6}>
            <TextField
              label="Notes"
              variant="standard"
              {...register('notes')}
              fullWidth
              error={!!errors?.notes}
              helperText={errors?.notes?.message}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <TextField
              label="Street Address"
              variant="standard"
              {...register('streetAddress', { required: 'Street Address is required' })}
              fullWidth
              error={!!errors?.streetAddress}
              helperText={errors?.streetAddress?.message}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <TextField
              label="City"
              variant="standard"
              {...register('city', { required: 'City is required', value: 'North Delhi' })}
              fullWidth
              error={!!errors?.city}
              helperText={errors?.city?.message}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <TextField
              label="Postal Code"
              variant="standard"
              {...register('postalCode', { required: 'Postal Code is required', value: '110082' })}
              fullWidth
              error={!!errors?.postalCode}
              helperText={errors?.postalCode?.message}
            />
          </Grid2>

          <Grid2 xs={12}>
            <LoadingButton loading={isPending} type="submit" variant="contained" fullWidth>
              Submit
            </LoadingButton>
          </Grid2>
        </Grid2>
      </Box>
    </Container>
  );
}

export default EmployeeCreate;

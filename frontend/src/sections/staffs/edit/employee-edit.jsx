import React, { useEffect } from 'react';
import {
  Box,
  Container,
  TextField,
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
import { useParams } from 'react-router-dom';
import useGetNextId from 'src/libs/query/user/useGetNextId';
import useGetEmployeeById from 'src/libs/query/employee/useGetEmployeeById';
import useUpdateEmployee from 'src/libs/mutation/employee/useUpdateEmployee';
import { BreadcrumbsGen } from 'src/components/navigation-breadcumbs';
import { usePathname, useRouter } from 'src/routes/hooks';
import config from 'src/config';

function EmployeeEdit() {
  const router = useRouter();
  const { id } = useParams();
  const thisPath = usePathname();
  const isEditPage = usePathname().includes('edit');

  const { mutate: updateEmployee, isLoading: isPending, isSuccess } = useUpdateEmployee();
  const { data: employeeData, isSuccess: fetchedEmployee } = useGetEmployeeById({ id });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (fetchedEmployee) {
      const employee = {
        ...employeeData?.data,
        ...employeeData?.data.address,
        startDate: employeeData?.data.startDate?.split('T')[0],
        endDate: employeeData?.data.endDate?.split('T')[0],
        dob: employeeData?.data.dob?.split('T')[0],
      };
      reset(employee);
    }
  }, [fetchedEmployee, employeeData, reset]);

  useEffect(() => {
    if (isSuccess) {
      router.push('/employee/all');
    }
  }, [isSuccess]);

  const navBread = [
    { title: 'Employees', url: 'employee/all' },
    { title: isEditPage ? 'Edit' : 'View', url: thisPath },
  ];

  const onSubmit = (data) => {
    updateEmployee({ id, ...data });
  };

  return (
    <Container>
      <Helmet>
        <title>
          {isEditPage ? 'Edit' : 'View'} Staff | {config?.appName}
        </title>
      </Helmet>
      <BreadcrumbsGen menus={navBread} />
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
        <Grid2 container spacing={2}>
          <Grid2 xs={12} sm={6}>
            <TextField
              label="Institute ID"
              variant="standard"
              {...register('ifastId', { required: 'Institute ID is required' })}
              fullWidth
              error={!!errors?.ifastId}
              helperText={errors?.ifastId?.message}
              disabled={!isEditPage}
              InputLabelProps={{ shrink: true }}
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
              disabled={!isEditPage}
              InputLabelProps={{ shrink: true }}
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
              disabled={!isEditPage}
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
              disabled={!isEditPage}
              InputLabelProps={{ shrink: true }}
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
              disabled={!isEditPage}
              InputLabelProps={{ shrink: true }}
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
              disabled={!isEditPage}
              InputLabelProps={{ shrink: true }}
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
              disabled={!isEditPage}
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
                  <Select {...field} disabled={!isEditPage}>
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
              })}
              fullWidth
              error={!!errors?.startDate}
              helperText={errors?.startDate?.message}
              disabled={!isEditPage}
              InputLabelProps={{ shrink: true }}
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
              disabled={!isEditPage}
              InputLabelProps={{ shrink: true }}
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
              disabled={!isEditPage}
              InputLabelProps={{ shrink: true }}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <TextField
              label="City"
              variant="standard"
              {...register('city', { required: 'City is required' })}
              fullWidth
              error={!!errors?.city}
              helperText={errors?.city?.message}
              disabled={!isEditPage}
              InputLabelProps={{ shrink: true }}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <TextField
              label="Postal Code"
              variant="standard"
              {...register('postalCode', { required: 'Postal Code is required' })}
              fullWidth
              error={!!errors?.postalCode}
              helperText={errors?.postalCode?.message}
              disabled={!isEditPage}
              InputLabelProps={{ shrink: true }}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <TextField
              label="Country"
              variant="standard"
              {...register('country', { required: 'Country is required' })}
              fullWidth
              error={!!errors?.country}
              helperText={errors?.country?.message}
              disabled={!isEditPage}
              InputLabelProps={{ shrink: true }}
            />
          </Grid2>

          {isEditPage && (
            <Grid2 xs={12}>
              <LoadingButton loading={isPending} type="submit" variant="contained" fullWidth>
                Update
              </LoadingButton>
            </Grid2>
          )}
        </Grid2>
      </Box>
    </Container>
  );
}

export default EmployeeEdit;

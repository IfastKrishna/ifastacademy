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
import { useUI } from 'src/context/CostomeUi';

function EmployeeEdit() {
  const router = useRouter();
  const { uiSettings } = useUI();
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
              variant={uiSettings?.textFieldVariant}
              size={uiSettings.textFieldSize}
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
              variant={uiSettings?.textFieldVariant}
              size={uiSettings.textFieldSize}
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
              variant={uiSettings?.textFieldVariant}
              size={uiSettings.textFieldSize}
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
              variant={uiSettings?.textFieldVariant}
              size={uiSettings.textFieldSize}
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
              variant={uiSettings?.textFieldVariant}
              size={uiSettings.textFieldSize}
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
              variant={uiSettings?.textFieldVariant}
              size={uiSettings.textFieldSize}
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
              variant={uiSettings?.textFieldVariant}
              size={uiSettings.textFieldSize}
              {...register('dob', { required: 'Date of Birth is required' })}
              fullWidth
              error={!!errors?.dob}
              helperText={errors?.dob?.message}
              disabled={!isEditPage}
              InputLabelProps={{ shrink: true }}
            />
          </Grid2>

          <Grid2 xs={12} sm={6}>
            <FormControl
              fullWidth
              variant={uiSettings?.textFieldVariant}
              size={uiSettings.textFieldSize}
              error={!!errors?.jobTitle}
            >
              <InputLabel>Select Job Title</InputLabel>
              <Controller
                name="jobTitle"
                control={control}
                defaultValue=""
                rules={{ required: 'Job Title is required' }}
                render={({ field }) => (
                  <Select {...field} disabled={!isEditPage} label="Select Job Title">
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
              variant={uiSettings?.textFieldVariant}
              size={uiSettings.textFieldSize}
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
              variant={uiSettings?.textFieldVariant}
              size={uiSettings.textFieldSize}
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
              variant={uiSettings?.textFieldVariant}
              size={uiSettings.textFieldSize}
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
              variant={uiSettings?.textFieldVariant}
              size={uiSettings.textFieldSize}
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
              variant={uiSettings?.textFieldVariant}
              size={uiSettings.textFieldSize}
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
              variant={uiSettings?.textFieldVariant}
              size={uiSettings.textFieldSize}
              {...register('country', { required: 'Country is required' })}
              fullWidth
              error={!!errors?.country}
              helperText={errors?.country?.message}
              disabled={!isEditPage}
              InputLabelProps={{ shrink: true }}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <Controller
              name="salary"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  label="Salary"
                  {...field}
                  type="number"
                  variant={uiSettings?.textFieldVariant}
                  size={uiSettings.textFieldSize}
                  fullWidth
                  error={!!errors?.salary}
                  helperText={errors?.salary?.message}
                />
              )}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <FormControl
              variant={uiSettings?.textFieldVariant}
              size={uiSettings.textFieldSize}
              error={!!errors?.baseOnSalary}
              fullWidth
            >
              <InputLabel>Salary Type</InputLabel>
              <Controller
                name="baseOnSalary"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select {...field} label="Salary Type">
                    <MenuItem value="" disabled>
                      Select Salary Type
                    </MenuItem>
                    <MenuItem value="monthly">Monthly</MenuItem>
                    <MenuItem value="per-student(%)">Per Student(%)</MenuItem>
                  </Select>
                )}
              />
              <FormHelperText>{errors?.baseOnSalary?.message}</FormHelperText>
            </FormControl>
          </Grid2>
        </Grid2>
        {isEditPage && (
          <LoadingButton
            loading={isPending}
            type="submit"
            sx={{
              width: {
                xs: '100%',
                sm: 'auto',
              },
            }}
            variant={uiSettings?.btnVariant}
            size={uiSettings?.btnSize}
            color={uiSettings?.btnColor}
            fullWidth
          >
            Update
          </LoadingButton>
        )}
      </Box>
    </Container>
  );
}

export default EmployeeEdit;

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
  Checkbox,
  ListItemText,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { LoadingButton } from '@mui/lab';
import useGetNextId from 'src/libs/query/user/useGetNextId';
import useAddEmployee from 'src/libs/mutation/employee/useAddEmployee';
import { BreadcrumbsGen } from 'src/components/navigation-breadcumbs';
import config from 'src/config';
import useGetBatches from 'src/libs/query/master/batch-class/useGetBatches';
import { useUI } from 'src/context/CostomeUi';

function EmployeeCreate({ variant = 'standard', size = 'medium', btnSize = 'medium' }) {
  const { uiSettings } = useUI();
  const [fetching, setFetching] = React.useState(false);
  const [batchesId, setBatchesId] = React.useState([]);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: 'employee',
    },
  });

  const { data: nextIdData, isSuccess: FetchedStudent } = useGetNextId({ fetching });
  const { data: batchIds, isLoading } = useGetBatches({ pageSize: -1 });
  const { mutate: addEmployee, isSuccess, isPending } = useAddEmployee();

  useEffect(() => {
    if (FetchedStudent) {
      setValue('ifastId', nextIdData);
    }
  }, [FetchedStudent, nextIdData, setValue]);

  useEffect(() => {
    if (isSuccess) {
      reset();
      setFetching((prev) => !prev);
      setBatchesId([]);
    }
  }, [isSuccess, reset]);

  const handleChange = (event) => {
    const { value } = event.target;
    setBatchesId(typeof value === 'string' ? value.split(',') : value);
    setValue('enrolledBatch', value);
  };

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
      <Box component="form" onSubmit={handleSubmit((data) => addEmployee(data))} sx={{ mt: 2 }}>
        <Grid2 container spacing={2}>
          <Grid2 xs={12} sm={6}>
            <TextField
              label="Institute ID"
              variant={uiSettings?.textFieldVariant}
              size={uiSettings.textFieldSize}
              {...register('ifastId', { required: 'Institute ID is required', value: nextIdData })}
              fullWidth
              error={!!errors?.ifastId}
              helperText={errors?.ifastId?.message}
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
                  <Select {...field} label="Select Job Title">
                    <MenuItem value="staff">Staff</MenuItem>
                    <MenuItem value="teacher">Teacher</MenuItem>
                  </Select>
                )}
              />
              <FormHelperText>{errors?.jobTitle?.message}</FormHelperText>
            </FormControl>
          </Grid2>

          {watch('jobTitle') === 'teacher' && (
            <Grid2 xs={12} sm={6}>
              <FormControl
                fullWidth
                variant={uiSettings?.textFieldVariant}
                size={uiSettings.textFieldSize}
                error={!!errors?.enrolledBatch}
              >
                <InputLabel id="batch-select-label">Select Batches</InputLabel>
                <Controller
                  name="enrolledBatch"
                  control={control}
                  rules={{ required: 'Enrolled Batch is required' }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      labelId="batch-select-label"
                      id="batch-select"
                      multiple
                      value={batchesId}
                      onChange={handleChange}
                      renderValue={(selected) =>
                        selected
                          ?.map((id) => {
                            const batch = batchIds?.data?.find((b) => b._id === id);
                            return batch?.name;
                          })
                          ?.join(', ')
                      }
                    >
                      {batchIds?.data?.map((batch) => (
                        <MenuItem key={batch?._id} value={batch?._id}>
                          <Checkbox checked={batchesId.indexOf(batch?._id) > -1} />
                          <ListItemText primary={batch?.name} />
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <FormHelperText>{errors?.enrolledBatch?.message}</FormHelperText>
              </FormControl>
            </Grid2>
          )}

          <Grid2 xs={12} sm={6}>
            <TextField
              label="Joining Date"
              type="date"
              variant={uiSettings?.textFieldVariant}
              size={uiSettings.textFieldSize}
              {...register('joiningDate', {
                required: 'Start Date is required',
              })}
              fullWidth
              error={!!errors?.joiningDate}
              helperText={errors?.joiningDate?.message}
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
              InputLabelProps={{ shrink: true }}
            />
          </Grid2>

          <Grid2 xs={12} sm={6}>
            <TextField
              label="Notes"
              variant={uiSettings?.textFieldVariant}
              size={uiSettings.textFieldSize}
              {...register('notes')}
              fullWidth
              error={!!errors?.notes}
              helperText={errors?.notes?.message}
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
                    <MenuItem value="per-student(%)">Per Student (%)</MenuItem>
                  </Select>
                )}
              />
              <FormHelperText>{errors?.baseOnSalary?.message}</FormHelperText>
            </FormControl>
          </Grid2>
        </Grid2>
        <LoadingButton
          type="submit"
          loading={isPending}
          sx={{
            width: {
              xs: '100%',
              sm: 'auto',
            },
          }}
          variant={uiSettings?.btnVariant}
          size={uiSettings?.btnSize}
          color={uiSettings?.btnColor}
        >
          Submit
        </LoadingButton>
      </Box>
    </Container>
  );
}

export default EmployeeCreate;

import { LoadingButton } from '@mui/lab';
import {
  Box,
  Checkbox,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm, Controller } from 'react-hook-form';
import { BreadcrumbsGen } from 'src/components/navigation-breadcumbs';
import config from 'src/config';
import { useUI } from 'src/context/CostomeUi';
import useAddStudent from 'src/libs/mutation/student/useAddStudent';
import useGetBatches from 'src/libs/query/master/batch-class/useGetBatches';
import useGetNextId from 'src/libs/query/user/useGetNextId';

function StudentCreate() {
  const { uiSettings } = useUI();
  const [batchesId, setBatchesId] = React.useState([]);
  const [fetchingId, setFetchingId] = React.useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const { data: instituteId, isSuccess: idFetched } = useGetNextId({ fetching: fetchingId });
  const { mutate: createStudent, isPending, isSuccess } = useAddStudent();
  const { data, isLoading } = useGetBatches({ page: 1, pageSize: 'all' });

  React.useEffect(() => {
    if (idFetched) {
      setValue('ifastId', instituteId);
    }
  }, [idFetched]);

  React.useEffect(() => {
    if (isSuccess) {
      reset();
      setFetchingId(!fetchingId);
      setBatchesId([]);
    }
  }, [isSuccess]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setBatchesId(typeof value === 'string' ? value.split(',') : value);
    setValue('enrolledBatch', typeof value === 'string' ? value.split(',') : value);
  };

  const onSubmit = (data) => {
    data.role = 'student';
    createStudent(data);
  };

  const navBread = [
    { title: 'Students', url: 'student/all' },
    { title: 'Create', url: 'student/create' },
  ];

  return (
    <Container>
      <Helmet>
        <title>Student Create | {config?.appName}</title>
      </Helmet>
      <BreadcrumbsGen menus={navBread} />
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
        <Grid2 container spacing={2}>
          <Grid2 xs={12} sm={6}>
            <TextField
              fullWidth
              size={uiSettings?.textFieldSize}
              type="text"
              label="Institute ID"
              variant={uiSettings?.textFieldVariant}
              {...register('ifastId', {
                value: `IFAST/${new Date().getFullYear()}/`,
              })}
              error={!!errors?.ifastId}
              helperText={errors?.ifastId?.message}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <TextField
              fullWidth
              size={uiSettings?.textFieldSize}
              variant={uiSettings?.textFieldVariant}
              label="First Name"
              {...register('firstName', { required: 'First Name is required' })}
              error={!!errors?.firstName}
              helperText={errors?.firstName?.message}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <TextField
              fullWidth
              size={uiSettings?.textFieldSize}
              label="Last Name"
              variant={uiSettings?.textFieldVariant}
              {...register('lastName', { required: 'Last Name is required' })}
              error={!!errors?.lastName}
              helperText={errors?.lastName?.message}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <TextField
              fullWidth
              size={uiSettings?.textFieldSize}
              label="Email"
              variant={uiSettings?.textFieldVariant}
              {...register('email', { required: 'Email is required' })}
              error={!!errors?.email}
              helperText={errors?.email?.message}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <TextField
              fullWidth
              size={uiSettings?.textFieldSize}
              label="Phone No"
              type="tel"
              variant={uiSettings?.textFieldVariant}
              {...register('phoneNo', {
                required: 'Phone No is required',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Phone No must be a 10-digit number',
                },
              })}
              error={!!errors?.phoneNo}
              helperText={errors?.phoneNo?.message}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <TextField
              fullWidth
              size={uiSettings?.textFieldSize}
              type="date"
              label="Date of Birth"
              variant={uiSettings?.textFieldVariant}
              InputLabelProps={{ shrink: true }}
              {...register('dob', {
                required: 'Date of Birth is required',
              })}
              error={!!errors?.dob}
              helperText={errors?.dob?.message}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <TextField
              fullWidth
              size={uiSettings?.textFieldSize}
              type="tel"
              variant={uiSettings?.textFieldVariant}
              label="Emergency Contact"
              {...register('emergencyContact')}
              error={!!errors?.emergencyContact}
              helperText={errors?.emergencyContact?.message}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <FormControl
              fullWidth
              size={uiSettings?.textFieldSize}
              variant={uiSettings?.textFieldVariant}
              error={!!errors?.enrolledBatch}
            >
              <InputLabel id="demo-simple-select-filled-label">Select Batches</InputLabel>
              <Controller
                name="enrolledBatch"
                control={control}
                rules={{ required: 'Enrolled Batch is required' }}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    multiple
                    value={batchesId}
                    onChange={handleChange}
                    renderValue={(selected) =>
                      selected
                        ?.map((id) => {
                          const batch = data?.data?.find((b) => b._id === id);
                          return batch?.name;
                        })
                        ?.join(', ')
                    }
                  >
                    {data?.data?.map((batch) => (
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
          <Grid2 xs={12} sm={6}>
            <TextField
              fullWidth
              size={uiSettings?.textFieldSize}
              type="date"
              label="Joining Date"
              variant={uiSettings?.textFieldVariant}
              {...register('joiningDate', {
                required: 'Joining Date is required',
                value: new Date().toISOString().split('T')[0],
              })}
              error={!!errors?.joiningDate}
              helperText={errors?.joiningDate?.message}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <TextField
              fullWidth
              size={uiSettings?.textFieldSize}
              label="Street Address"
              variant={uiSettings?.textFieldVariant}
              {...register('streetAddress', { required: 'Street Address is required' })}
              error={!!errors?.streetAddress}
              helperText={errors?.streetAddress?.message}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <TextField
              fullWidth
              size={uiSettings?.textFieldSize}
              label="City"
              variant={uiSettings?.textFieldVariant}
              {...register('city', { required: 'City is required', value: 'North Delhi' })}
              error={!!errors?.city}
              helperText={errors?.city?.message}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <TextField
              fullWidth
              size={uiSettings?.textFieldSize}
              label="Postal Code"
              variant={uiSettings?.textFieldVariant}
              {...register('postalCode', {
                required: 'Postal Code is required',
                value: '110082',
              })}
              error={!!errors?.postalCode}
              helperText={errors?.postalCode?.message}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <TextField
              fullWidth
              size={uiSettings?.textFieldSize}
              label="State"
              variant={uiSettings?.textFieldVariant}
              {...register('state', {
                required: 'State is required',
                value: 'Delhi',
              })}
              error={!!errors?.state}
              helperText={errors?.state?.message}
            />
          </Grid2>
        </Grid2>
        <LoadingButton
          sx={{
            mt: 2,
            width: {
              xs: '100%',
              sm: 'auto',
            },
          }}
          variant={uiSettings?.btnVariant}
          size={uiSettings?.btnSize}
          color={uiSettings?.btnColor}
          loading={isPending}
          type="submit"
        >
          Create
        </LoadingButton>
      </Box>
    </Container>
  );
}

export default StudentCreate;

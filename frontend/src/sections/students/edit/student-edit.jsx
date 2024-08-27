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
import { useParams } from 'react-router-dom';
import { BreadcrumbsGen } from 'src/components/navigation-breadcumbs';
import config from 'src/config';
import useUpdateStudent from 'src/libs/mutation/student/useUpdateStudent';
import useGetBatches from 'src/libs/query/master/batch-class/useGetBatches';
import useGetStudentById from 'src/libs/query/student/useGetStudentById';
import { usePathname, useRouter } from 'src/routes/hooks';

function StudentEdit({
  variant = 'standard',
  size = 'medium',
  btnVariant = 'contained',
  btnSize = 'medium',
}) {
  const [batchesId, setBatchesId] = React.useState([]);
  const { id } = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const isEditMode = pathname.includes('edit');

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const { mutate: updateStudent, isPending, isSuccess } = useUpdateStudent();
  const { data: batchData, isSuccess: batchesLoaded } = useGetBatches({ pageSize: -1 });
  const { data: studentData, isSuccess: studentLoaded } = useGetStudentById({ id });

  React.useEffect(() => {
    if (studentLoaded) {
      reset({
        ...studentData?.data,
        dob: new Date(studentData?.data?.dob).toISOString().split('T')[0],
        joiningDate: new Date(studentData?.data?.joiningDate).toISOString().split('T')[0],
        streetAddress: studentData?.data?.address?.streetAddress,
        city: studentData?.data?.address?.city,
        postalCode: studentData?.data?.address?.postalCode,
        state: studentData?.data?.address?.state,
      });
      setBatchesId(studentData?.data?.enrolledBatch?.map((b) => b?._id) || []);
    }
  }, [studentLoaded, reset, studentData]);

  React.useEffect(() => {
    if (isSuccess) {
      reset();
      setBatchesId([]);
      router.push('/student/all');
    }
  }, [isSuccess, reset]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setBatchesId(typeof value === 'string' ? value.split(',') : value);
    setValue('enrolledBatch', typeof value === 'string' ? value.split(',') : value);
  };

  const onSubmit = (data) => {
    data.role = 'student';
    updateStudent(data);
  };

  const navBread = [
    { title: 'Students', url: 'student/all' },
    { title: isEditMode ? 'Edit' : 'Create', url: `student/${isEditMode ? 'edit' : 'create'}` },
  ];

  return (
    <Container>
      <Helmet>
        <title>
          Student {isEditMode ? 'Edit' : 'View'} | {config?.appName}
        </title>
      </Helmet>
      <BreadcrumbsGen menus={navBread} />
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
        <Grid2 container spacing={2}>
          <Grid2 xs={12} sm={6}>
            <TextField
              fullWidth
              type="text"
              label="Institute ID"
              size={size}
              variant={variant}
              {...register('ifastId', {
                value: `IFAST/${new Date().getFullYear()}/`,
              })}
              error={!!errors?.ifastId}
              helperText={errors?.ifastId?.message}
              InputLabelProps={{ shrink: true }}
              disabled={!isEditMode}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <TextField
              fullWidth
              size={size}
              variant={variant}
              label="First Name"
              {...register('firstName', { required: 'First Name is required' })}
              error={!!errors?.firstName}
              helperText={errors?.firstName?.message}
              InputLabelProps={{ shrink: true }}
              disabled={!isEditMode}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              size={size}
              variant={variant}
              {...register('lastName', { required: 'Last Name is required' })}
              error={!!errors?.lastName}
              helperText={errors?.lastName?.message}
              InputLabelProps={{ shrink: true }}
              disabled={!isEditMode}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              size={size}
              variant={variant}
              {...register('email', { required: 'Email is required' })}
              error={!!errors?.email}
              helperText={errors?.email?.message}
              InputLabelProps={{ shrink: true }}
              disabled={!isEditMode}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone No"
              type="tel"
              size={size}
              variant={variant}
              {...register('phoneNo', {
                required: 'Phone No is required',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Phone No must be a 10-digit number',
                },
              })}
              error={!!errors?.phoneNo}
              helperText={errors?.phoneNo?.message}
              InputLabelProps={{ shrink: true }}
              disabled={!isEditMode}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <TextField
              fullWidth
              type="date"
              label="Date of Birth"
              size={size}
              variant={variant}
              InputLabelProps={{ shrink: true }}
              {...register('dob', {
                required: 'Date of Birth is required',
              })}
              error={!!errors?.dob}
              helperText={errors?.dob?.message}
              disabled={!isEditMode}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <TextField
              fullWidth
              type="tel"
              size={size}
              variant={variant}
              label="Emergency Contact"
              {...register('emergencyContact')}
              error={!!errors?.emergencyContact}
              helperText={errors?.emergencyContact?.message}
              InputLabelProps={{ shrink: true }}
              disabled={!isEditMode}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <FormControl fullWidth size={size} variant={variant} error={!!errors?.enrolledBatch}>
              <InputLabel id="select-batches-label">Select Batches</InputLabel>
              <Controller
                name="enrolledBatch"
                control={control}
                rules={{ required: 'Enrolled Batch is required' }}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="select-batches-label"
                    id="select-batches"
                    multiple
                    value={batchesId}
                    disabled={!isEditMode}
                    onChange={handleChange}
                    renderValue={(selected) =>
                      selected
                        ?.map((id) => {
                          const batch = batchData?.data?.find((b) => b._id === id);
                          return batch?.name;
                        })
                        ?.join(', ')
                    }
                  >
                    {batchData?.data?.map((batch) => (
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
              type="date"
              label="Joining Date"
              size={size}
              variant={variant}
              InputLabelProps={{ shrink: true }}
              {...register('joiningDate', {
                required: 'Joining Date is required',
                value: new Date().toISOString().split('T')[0],
              })}
              error={!!errors?.joiningDate}
              helperText={errors?.joiningDate?.message}
              disabled={!isEditMode}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <TextField
              fullWidth
              label="Street Address"
              size={size}
              variant={variant}
              {...register('streetAddress', { required: 'Street Address is required' })}
              error={!!errors?.streetAddress}
              helperText={errors?.streetAddress?.message}
              InputLabelProps={{ shrink: true }}
              disabled={!isEditMode}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <TextField
              fullWidth
              label="City"
              size={size}
              variant={variant}
              {...register('city', { required: 'City is required', value: 'North Delhi' })}
              error={!!errors?.city}
              helperText={errors?.city?.message}
              InputLabelProps={{ shrink: true }}
              disabled={!isEditMode}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <TextField
              fullWidth
              label="Postal Code"
              size={size}
              variant={variant}
              {...register('postalCode', {
                required: 'Postal Code is required',
                value: '110082',
              })}
              error={!!errors?.postalCode}
              helperText={errors?.postalCode?.message}
              InputLabelProps={{ shrink: true }}
              disabled={!isEditMode}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <TextField
              fullWidth
              label="State"
              size={size}
              variant={variant}
              {...register('state', {
                required: 'State is required',
                value: 'Delhi',
              })}
              error={!!errors?.state}
              helperText={errors?.state?.message}
              disabled={!isEditMode}
            />
          </Grid2>
          <Grid2 xs={12}>
            <LoadingButton
              size={btnSize}
              loading={isPending}
              type="submit"
              variant={btnVariant}
              fullWidth
            >
              {isEditMode ? 'Update' : 'Create'}
            </LoadingButton>
          </Grid2>
        </Grid2>
      </Box>
    </Container>
  );
}

export default StudentEdit;

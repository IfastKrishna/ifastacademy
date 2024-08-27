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
import useAddStudent from 'src/libs/mutation/student/useAddStudent';
import useGetCourseEnquiresById from 'src/libs/query/course-enquire/useGetCourseEnquireById';
import useGetBatches from 'src/libs/query/master/batch-class/useGetBatches';
import useGetNextId from 'src/libs/query/user/useGetNextId';

function NewAdmission({
  size = 'medium',
  variant = 'standard',
  btnSize = 'medium',
  btnVariant = 'contained',
}) {
  const [batchesId, setBatchesId] = React.useState([]);
  const [fetchingId, setFetchingId] = React.useState(false);
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const { data: enquireData, isSuccess: enquireLoaded } = useGetCourseEnquiresById({ id });
  const { data: instituteId, isSuccess: idFetched } = useGetNextId({ fetching: fetchingId });
  const { mutate: createStudent, isPending, isSuccess } = useAddStudent();
  const { data, isLoading } = useGetBatches({ pageSize: -1 });

  React.useEffect(() => {
    if (enquireLoaded) {
      reset({
        firstName: enquireData?.data?.firstName,
        lastName: enquireData?.data?.lastName,
        email: enquireData?.data?.email,
        phoneNo: enquireData?.data?.phoneNo,
        dob: enquireData?.data?.dob?.split('T')[0],
        emergencyContact: enquireData?.data?.emergencyContact,
        streetAddress: enquireData?.data?.address?.streetAddress,
        city: enquireData?.data?.address?.city,
        postalCode: enquireData?.data?.address?.postalCode,
        state: enquireData?.data?.address?.state,
      });
    }
  }, [enquireLoaded]);

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
    data.enquiryId = id;
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
              size={size}
              variant={variant}
              type="text"
              label="Institute ID"
              {...register('ifastId', {
                value: `IFAST/${new Date().getFullYear()}/`,
              })}
              error={!!errors?.ifastId}
              helperText={errors?.ifastId?.message}
              InputLabelProps={{ shrink: true }}
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
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <TextField
              fullWidth
              size={size}
              label="Last Name"
              variant={variant}
              {...register('lastName', { required: 'Last Name is required' })}
              error={!!errors?.lastName}
              helperText={errors?.lastName?.message}
              InputLabelProps={{ shrink: true }}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <TextField
              fullWidth
              size={size}
              label="Email"
              variant={variant}
              {...register('email', { required: 'Email is required' })}
              error={!!errors?.email}
              helperText={errors?.email?.message}
              InputLabelProps={{ shrink: true }}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <TextField
              fullWidth
              size={size}
              label="Phone No"
              type="tel"
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
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <TextField
              fullWidth
              size={size}
              type="date"
              label="Date of Birth"
              variant={variant}
              InputLabelProps={{ shrink: true }}
              {...register('dob', {
                required: 'Date of Birth is required',
                // validate: (value) => {
                //   const date = new Date(value);
                //   const today = new Date();
                //   const age = today.getFullYear() - date.getFullYear();
                //   if (age < 12) {
                //     return 'Student must be atleast 12 years old';
                //   }
                // },
              })}
              error={!!errors?.dob}
              helperText={errors?.dob?.message}
              InputLabelProps={{ shrink: true }}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <TextField
              fullWidth
              size={size}
              type="tel"
              variant={variant}
              label="Emergency Contact"
              {...register('emergencyContact')}
              error={!!errors?.emergencyContact}
              helperText={errors?.emergencyContact?.message}
              InputLabelProps={{ shrink: true }}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <FormControl fullWidth size={size} variant={variant} error={!!errors?.enrolledBatch}>
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
              size={size}
              type="date"
              label="Joining Date"
              variant={variant}
              {...register('joiningDate', {
                required: 'Joining Date is required',
                value: new Date().toISOString().split('T')[0],
              })}
              error={!!errors?.joiningDate}
              helperText={errors?.joiningDate?.message}
              InputLabelProps={{ shrink: true }}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <TextField
              fullWidth
              size={size}
              label="Street Address"
              variant={variant}
              {...register('streetAddress', { required: 'Street Address is required' })}
              error={!!errors?.streetAddress}
              helperText={errors?.streetAddress?.message}
              InputLabelProps={{ shrink: true }}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <TextField
              fullWidth
              size={size}
              label="City"
              variant={variant}
              {...register('city', { required: 'City is required', value: 'North Delhi' })}
              error={!!errors?.city}
              helperText={errors?.city?.message}
              InputLabelProps={{ shrink: true }}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <TextField
              fullWidth
              size={size}
              label="Postal Code"
              variant={variant}
              {...register('postalCode', {
                required: 'Postal Code is required',
                value: '110082',
              })}
              error={!!errors?.postalCode}
              helperText={errors?.postalCode?.message}
              InputLabelProps={{ shrink: true }}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <TextField
              fullWidth
              size={size}
              label="State"
              variant={variant}
              {...register('state', {
                required: 'State is required',
                value: 'Delhi',
              })}
              error={!!errors?.state}
              helperText={errors?.state?.message}
              InputLabelProps={{ shrink: true }}
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
              Create
            </LoadingButton>
          </Grid2>
        </Grid2>
      </Box>
    </Container>
  );
}

export default NewAdmission;

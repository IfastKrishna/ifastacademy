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
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm, Controller } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import config from 'src/config';
import { useUI } from 'src/context/CostomeUi';
import useUpdateEnquire from 'src/libs/mutation/course-enquire/useUpdateEnquire';
import useGetCourseEnquiresById from 'src/libs/query/course-enquire/useGetCourseEnquireById';
import useGetCourses from 'src/libs/query/master/course/useGetCourses';
import useGetLeadSources from 'src/libs/query/master/leace-source/useGetLeadSource';
import { usePathname, useRouter } from 'src/routes/hooks';

function CourseEnquiresEdit() {
  const { uiSettings } = useUI();
  const [coursesId, setCoursesId] = React.useState([]);
  const [leadSourceId, setLeadSourceId] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [status, setStatus] = React.useState('');

  const { id } = useParams();
  const router = useRouter();
  const pathname = usePathname();

  const isEdit = pathname.includes('edit');
  const { data } = useGetCourses({ pageSize: 30 });
  const { data: leadSourceData } = useGetLeadSources({ pageSize: 30 });

  const { data: oldEnquire, isSuccess: loadedOldEnquire } = useGetCourseEnquiresById({ id });
  //   console.log(oldEnquire?.data);

  const { mutate: onUpdate, isPending: updating, isSuccess: updated } = useUpdateEnquire();
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // Set form data when enquiry data is loaded
  React.useEffect(() => {
    if (loadedOldEnquire) {
      reset({
        ...oldEnquire?.data,
        gender: oldEnquire?.data?.gender,
        dob: oldEnquire?.data.dob?.split('T')[0], // Automatically map the fields from oldEnquire
        streetAddress: oldEnquire?.data?.address?.streetAddress,
        city: oldEnquire?.data?.address?.city,
        state: oldEnquire?.data?.address?.state,
        postalCode: oldEnquire?.data?.address?.postalCode,
      });
      setCoursesId(oldEnquire?.data?.courseInterest);
      setLeadSourceId(oldEnquire?.data?.leadSource);
      setGender(oldEnquire?.data?.gender);
      setStatus(oldEnquire?.data?.status);
    }
  }, [loadedOldEnquire, reset]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const courses = typeof value === 'string' ? value.split(',') : value;
    setCoursesId(courses);
    setValue('courseInterest', courses);
  };

  React.useEffect(() => {
    if (updated) {
      router.push('/enquire/all');
    }
  }, [updated, router]);

  const onSubmit = (data) => {
    onUpdate({ ...data, _id: id });
  };

  return (
    <Container>
      <Helmet>
        <title>
          {isEdit ? 'Edit Course Enquire' : 'View Course Enquire'} | {config.appName}
        </title>
      </Helmet>

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid2 container spacing={2}>
          <Grid2 xs={12} sm={6}>
            <Controller
              name="firstName"
              control={control}
              rules={{ required: 'First Name is required' }}
              render={({ field }) => (
                <TextField
                  variant={uiSettings.textFieldVariant}
                  label="First Name"
                  size={uiSettings.textFieldSize}
                  fullWidth
                  {...field}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                  InputLabelProps={{ shrink: true }}
                  disabled={!isEdit}
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
                  variant={uiSettings.textFieldVariant}
                  label="Last Name"
                  size={uiSettings.textFieldSize}
                  fullWidth
                  {...field}
                  error={!!errors?.lastName}
                  helperText={errors?.lastName?.message}
                  InputLabelProps={{ shrink: true }}
                  disabled={!isEdit}
                />
              )}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <Controller
              name="qualification"
              control={control}
              rules={{ required: 'Qualification is required' }}
              render={({ field }) => (
                <TextField
                  variant={uiSettings.textFieldVariant}
                  label="Qualification"
                  size={uiSettings.textFieldSize}
                  fullWidth
                  {...field}
                  error={!!errors?.qualification}
                  helperText={errors?.qualification?.message}
                  InputLabelProps={{ shrink: true }}
                  disabled={!isEdit}
                />
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
                  variant={uiSettings.textFieldVariant}
                  label="Date of Birth"
                  size={uiSettings.textFieldSize}
                  type="date"
                  fullWidth
                  {...field}
                  error={!!errors?.dob}
                  helperText={errors?.dob?.message}
                  InputLabelProps={{ shrink: true }}
                  disabled={!isEdit}
                />
              )}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <FormControl
              variant={uiSettings.textFieldVariant}
              size={uiSettings.textFieldSize}
              fullWidth
              error={!!errors.gender}
            >
              <InputLabel>Gender</InputLabel>
              <Controller
                name="gender"
                control={control}
                rules={{ required: 'Gender is required', value: oldEnquire?.data?.gender }}
                render={({ field }) => (
                  <Select
                    value={gender}
                    onChange={(e) => {
                      setGender(e.target.value);
                      field.onChange(e);
                    }}
                    label="Gender"
                    disabled={!isEdit}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                )}
              />
              <FormHelperText>{errors.gender?.message}</FormHelperText>
            </FormControl>
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <Controller
              name="email"
              control={control}
              rules={{ required: 'Email is required' }}
              render={({ field }) => (
                <TextField
                  variant={uiSettings.textFieldVariant}
                  label="Email"
                  size={uiSettings.textFieldSize}
                  fullWidth
                  {...field}
                  error={!!errors?.email}
                  helperText={errors?.email?.message}
                  InputLabelProps={{ shrink: true }}
                  disabled={!isEdit}
                />
              )}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <Controller
              name="phoneNo"
              control={control}
              rules={{ required: 'Phone Number is required' }}
              render={({ field }) => (
                <TextField
                  variant={uiSettings.textFieldVariant}
                  label="Phone Number"
                  size={uiSettings.textFieldSize}
                  fullWidth
                  {...field}
                  error={!!errors?.phoneNo}
                  helperText={errors?.phoneNo?.message}
                  InputLabelProps={{ shrink: true }}
                  disabled={!isEdit}
                />
              )}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <Controller
              name="alternativePhoneNo"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size={uiSettings.textFieldSize}
                  variant={uiSettings.textFieldVariant}
                  label="Alternative Mobile Number"
                  error={!!errors?.alternativePhoneNo}
                  helperText={errors?.alternativePhoneNo?.message}
                  InputLabelProps={{ shrink: true }}
                  disabled={!isEdit}
                />
              )}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <Controller
              name="streetAddress"
              control={control}
              rules={{ required: 'Street Address is required' }}
              render={({ field }) => (
                <TextField
                  variant={uiSettings.textFieldVariant}
                  label="Street Address"
                  size={uiSettings.textFieldSize}
                  fullWidth
                  {...field}
                  error={!!errors?.streetAddress}
                  helperText={errors?.streetAddress?.message}
                  InputLabelProps={{ shrink: true }}
                  disabled={!isEdit}
                />
              )}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <FormControl
              variant={uiSettings?.textFieldVariant}
              size={uiSettings.textFieldSize}
              fullWidth
            >
              <InputLabel>Interest Level</InputLabel>
              <Controller
                name="interestLevel"
                control={control}
                rules={{ required: 'Interest level is required' }}
                defaultValue=""
                render={({ field }) => (
                  <Select {...field} label="Interest Level" displayEmpty>
                    <MenuItem value="" disabled>
                      Select
                    </MenuItem>
                    <MenuItem value="high">High</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="low">Low</MenuItem>
                  </Select>
                )}
              />
              <FormHelperText>{errors.interestLevel?.message}</FormHelperText>
            </FormControl>
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <Controller
              name="city"
              rules={{ required: 'City is required' }}
              control={control}
              render={({ field }) => (
                <TextField
                  variant={uiSettings.textFieldVariant}
                  label="City"
                  size={uiSettings.textFieldSize}
                  fullWidth
                  {...field}
                  error={!!errors?.city}
                  helperText={errors?.city?.message}
                  InputLabelProps={{ shrink: true }}
                  disabled={!isEdit}
                />
              )}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <Controller
              name="state"
              rules={{ required: 'State is required' }}
              control={control}
              render={({ field }) => (
                <TextField
                  variant={uiSettings.textFieldVariant}
                  label="State"
                  size={uiSettings.textFieldSize}
                  fullWidth
                  {...field}
                  error={!!errors?.state}
                  helperText={errors?.state?.message}
                  InputLabelProps={{ shrink: true }}
                  disabled={!isEdit}
                />
              )}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <Controller
              name="postalCode"
              rules={{ required: 'Postal Code is required' }}
              control={control}
              render={({ field }) => (
                <TextField
                  variant={uiSettings.textFieldVariant}
                  label="Postal Code"
                  size={uiSettings.textFieldSize}
                  fullWidth
                  {...field}
                  error={!!errors?.postalCode}
                  helperText={errors?.postalCode?.message}
                  InputLabelProps={{ shrink: true }}
                  disabled={!isEdit}
                />
              )}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <FormControl
              variant={uiSettings.textFieldVariant}
              size={uiSettings.textFieldSize}
              fullWidth
              error={!!errors.courseInterest}
            >
              <InputLabel>Course Interest</InputLabel>
              <Controller
                name="courseInterest"
                control={control}
                rules={{ required: 'Course Interest is required' }}
                render={({ field }) => (
                  <Select
                    {...field}
                    multiple
                    value={coursesId}
                    disabled={!isEdit}
                    onChange={handleChange}
                    renderValue={(selected) =>
                      data?.data
                        ?.filter((course) => selected.includes(course._id))
                        .map((course) => course.name)
                        .join(', ')
                    }
                  >
                    {data?.data?.map((course) => (
                      <MenuItem key={course._id} value={course._id}>
                        <Checkbox checked={coursesId.indexOf(course._id) > -1} />
                        <ListItemText primary={course.name} />
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              <FormHelperText>{errors.courseInterest?.message}</FormHelperText>
            </FormControl>
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <FormControl
              variant={uiSettings.textFieldVariant}
              size={uiSettings.textFieldSize}
              fullWidth
              error={!!errors.leadSource}
            >
              <InputLabel>Lead Source</InputLabel>
              <Controller
                name="leadSource"
                control={control}
                rules={{ required: 'Lead Source is required' }}
                render={({ field }) => (
                  <Select
                    value={leadSourceId}
                    onChange={(e) => {
                      setGender(e.target.value);
                      field.onChange(e);
                    }}
                    label="Lead Source"
                    disabled={!isEdit}
                  >
                    {leadSourceData?.data?.map((source) => (
                      <MenuItem key={source._id} value={source._id}>
                        {source.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              <FormHelperText>{errors.leadSource?.message}</FormHelperText>
            </FormControl>
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <FormControl
              variant={uiSettings.textFieldVariant}
              size={uiSettings.textFieldSize}
              fullWidth
              error={!!errors.status}
            >
              <InputLabel>Status</InputLabel>
              <Controller
                name="status"
                control={control}
                rules={{ required: 'Status is required', value: oldEnquire?.data?.gender }}
                render={({ field }) => (
                  <Select
                    value={status}
                    onChange={(e) => {
                      setStatus(e.target.value);
                      field.onChange(e);
                    }}
                    label="Status"
                    disabled={!isEdit}
                  >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="cancelled">cancelled</MenuItem>
                  </Select>
                )}
              />
              <FormHelperText>{errors.status?.message}</FormHelperText>
            </FormControl>
          </Grid2>
        </Grid2>
        {isEdit && (
          <LoadingButton
            loading={updating}
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
          >
            {isEdit ? 'Update Enquire' : 'View Enquire'}
          </LoadingButton>
        )}
      </Box>
    </Container>
  );
}

export default CourseEnquiresEdit;

import { LoadingButton } from '@mui/lab';
import {
  Autocomplete,
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
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useUI } from 'src/context/CostomeUi';
import useAddEnquire from 'src/libs/mutation/course-enquire/useAddEnquire';
import useGetCourses from 'src/libs/query/master/course/useGetCourses';
import useGetLeadSources from 'src/libs/query/master/leace-source/useGetLeadSource';
import useGetAssignableUser from 'src/libs/query/user/useGetAssigedUser';

function CourseEnquireCreate() {
  const { uiSettings } = useUI();
  const [coursesId, setCoursesId] = React.useState([]);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      followUpDate: new Date().toISOString().split('T')[0],
      interestLevel: 'high',
      city: 'Delhi',
      state: 'Delhi',
      postalCode: '110082',
    },
  });

  const { data: assignableUsers } = useGetAssignableUser({
    roles: ['employee', 'admin', 'superadmin'],
  });
  const { data } = useGetCourses({ pageSize: 30 });
  const { data: leadSourceData } = useGetLeadSources({ pageSize: 20 });

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCoursesId(typeof value === 'string' ? value.split(',') : value);
    setValue('courseInterest', value);
  };

  const {
    mutate: addEnquire,
    isPending: enquireSubmiting,
    isSuccess: enquireSubmited,
  } = useAddEnquire();

  React.useEffect(() => {
    if (enquireSubmited) {
      reset({});
    }
  }, [enquireSubmited, reset]);

  const onSubmit = (formData) => {
    addEnquire(formData);
  };

  return (
    <Container>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid2 container spacing={2}>
          <Grid2 xs={12} sm={6}>
            <Controller
              name="firstName"
              control={control}
              rules={{ required: 'First Name is required' }}
              render={({ field }) => (
                <TextField
                  variant={uiSettings?.textFieldVariant}
                  label="First Name"
                  size={uiSettings.textFieldSize}
                  fullWidth
                  {...field}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
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
                  variant={uiSettings?.textFieldVariant}
                  label="Last Name"
                  size={uiSettings.textFieldSize}
                  fullWidth
                  {...field}
                  error={!!errors?.lastName}
                  helperText={errors?.lastName?.message}
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
                  variant={uiSettings?.textFieldVariant}
                  label="Qualification"
                  size={uiSettings.textFieldSize}
                  fullWidth
                  {...field}
                  error={!!errors?.qualification}
                  helperText={errors?.qualification?.message}
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
                  variant={uiSettings?.textFieldVariant}
                  label="Date of Birth"
                  size={uiSettings.textFieldSize}
                  type="date"
                  fullWidth
                  {...field}
                  error={!!errors?.dob}
                  helperText={errors?.dob?.message}
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <Controller
              name="gender"
              control={control}
              rules={{ required: 'Gender is required' }}
              render={({ field }) => (
                <FormControl
                  variant={uiSettings?.textFieldVariant}
                  size={uiSettings.textFieldSize}
                  fullWidth
                  error={!!errors.gender}
                >
                  <InputLabel>Gender</InputLabel>
                  <Select {...field} label="Gender">
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                  <FormHelperText>{errors.gender?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <Controller
              name="email"
              control={control}
              rules={{ required: 'Email is required' }}
              render={({ field }) => (
                <TextField
                  variant={uiSettings?.textFieldVariant}
                  label="Email"
                  size={uiSettings.textFieldSize}
                  fullWidth
                  {...field}
                  error={!!errors?.email}
                  helperText={errors?.email?.message}
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
                  variant={uiSettings?.textFieldVariant}
                  label="Phone Number"
                  size={uiSettings.textFieldSize}
                  fullWidth
                  {...field}
                  error={!!errors?.phoneNo}
                  helperText={errors?.phoneNo?.message}
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
                  variant={uiSettings?.textFieldVariant}
                  label="Alternative Mobile Number"
                  error={!!errors?.alternativePhoneNo}
                  helperText={errors?.alternativePhoneNo?.message}
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
                  variant={uiSettings?.textFieldVariant}
                  label="Street Address"
                  size={uiSettings.textFieldSize}
                  fullWidth
                  {...field}
                  error={!!errors?.streetAddress}
                  helperText={errors?.streetAddress?.message}
                />
              )}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <Controller
              name="city"
              rules={{ required: 'City is required' }}
              control={control}
              render={({ field }) => (
                <TextField
                  variant={uiSettings?.textFieldVariant}
                  label="City"
                  size={uiSettings.textFieldSize}
                  fullWidth
                  {...field}
                  error={!!errors?.city}
                  helperText={errors?.city?.message}
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
                  variant={uiSettings?.textFieldVariant}
                  label="State"
                  size={uiSettings.textFieldSize}
                  fullWidth
                  {...field}
                  error={!!errors?.state}
                  helperText={errors?.state?.message}
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
                  variant={uiSettings?.textFieldVariant}
                  label="Postal Code"
                  size={uiSettings.textFieldSize}
                  fullWidth
                  {...field}
                  error={!!errors?.postalCode}
                  helperText={errors?.postalCode?.message}
                />
              )}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <FormControl
              variant={uiSettings?.textFieldVariant}
              size={uiSettings.textFieldSize}
              fullWidth
              error={!!errors?.courseInterest}
            >
              <InputLabel>Select Course</InputLabel>
              <Controller
                name="courseInterest"
                control={control}
                rules={{ required: 'Courses is required' }}
                render={({ field }) => (
                  <Select
                    {...field}
                    multiple
                    value={coursesId}
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
                        <Checkbox checked={coursesId.indexOf(batch?._id) > -1} />
                        <ListItemText primary={batch?.name} />
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              <FormHelperText>{errors?.courseInterest?.message}</FormHelperText>
            </FormControl>
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
                render={({ field }) => (
                  <Select {...field} label="Interest Level">
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
              name="leadSource"
              control={control}
              rules={{ required: 'Lead Source is required' }}
              render={({ field }) => (
                <FormControl
                  variant={uiSettings?.textFieldVariant}
                  size={uiSettings.textFieldSize}
                  fullWidth
                  error={!!errors.leadSource}
                >
                  <InputLabel>Lead Source</InputLabel>
                  <Select {...field} label="Lead Source">
                    {leadSourceData?.data?.map((source) => (
                      <MenuItem key={source?._id} value={source?._id}>
                        {source?.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors.leadSource?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <Controller
              name="assignedTo"
              control={control}
              rules={{ required: 'Assign To is required' }}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  options={assignableUsers?.data || []}
                  getOptionLabel={(option) =>
                    option.firstName +
                    ' ' +
                    option.lastName +
                    (option.ifastId ? ` (${option.ifastId})` : '')
                  }
                  onChange={(_, data) => field.onChange(data?._id)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Assign To"
                      variant={uiSettings?.textFieldVariant}
                      size={uiSettings.textFieldSize}
                      error={!!errors?.assignedTo}
                      helperText={errors?.assignedTo?.message}
                    />
                  )}
                />
              )}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <Controller
              name="followupDetails"
              control={control}
              rules={{ required: 'Follow-up Details is required' }}
              render={({ field }) => (
                <TextField
                  variant={uiSettings?.textFieldVariant}
                  label="Follow-up Details"
                  size={uiSettings.textFieldSize}
                  fullWidth
                  {...field}
                  error={!!errors?.followupDetails}
                  helperText={errors?.followupDetails?.message}
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <Controller
              name="nextFollowUpDate"
              control={control}
              rules={{ required: 'Follow-up Date is required' }}
              render={({ field }) => (
                <TextField
                  variant={uiSettings?.textFieldVariant}
                  label="Next Follow-up Date"
                  size={uiSettings.textFieldSize}
                  type="date"
                  fullWidth
                  {...field}
                  error={!!errors?.nextFollowUpDate}
                  helperText={errors?.nextFollowUpDate?.message}
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <Controller
              name="notes"
              control={control}
              render={({ field }) => (
                <TextField
                  variant={uiSettings?.textFieldVariant}
                  label="Notes"
                  size={uiSettings.textFieldSize}
                  fullWidth
                  {...field}
                  error={!!errors?.notes}
                  helperText={errors?.notes?.message}
                />
              )}
            />
          </Grid2>
        </Grid2>
        <LoadingButton
          loading={enquireSubmiting}
          type="submit"
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
          Submit
        </LoadingButton>
      </Box>
    </Container>
  );
}

export default CourseEnquireCreate;

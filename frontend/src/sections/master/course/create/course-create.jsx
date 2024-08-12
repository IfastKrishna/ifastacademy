import { LoadingButton } from '@mui/lab';
import {
  Box,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm, Controller } from 'react-hook-form';
import { BreadcrumbsGen } from 'src/components/navigation-breadcumbs';
import config from 'src/config';
import useAddCourse from 'src/libs/mutation/master/course/useAddCourse';

function CourseCreate() {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const { mutate: addCourse, isPending, isSuccess } = useAddCourse();

  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess]);

  return (
    <Container>
      <Helmet>
        <title>Create Course | {config?.appName}</title>
      </Helmet>
      <BreadcrumbsGen
        menus={[
          { title: 'Master', url: 'masters' },
          { title: 'Course', url: 'masters-course/all' },
          { title: 'Create', url: 'masters-course/create' },
        ]}
      />

      <Box component={'form'} onSubmit={handleSubmit(addCourse)} sx={{ mt: 2 }}>
        <Grid2 container spacing={2}>
          <Grid2 xs={12} sm={6}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{ required: 'Course name is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Name"
                  variant="standard"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
          </Grid2>

          <Grid2 xs={12} sm={6}>
            <Controller
              name="level"
              control={control}
              defaultValue=""
              rules={{ required: 'Course level is required' }}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.level} variant="standard">
                  <InputLabel>Select Level</InputLabel>
                  <Select {...field}>
                    <MenuItem value="Beginner">Beginner</MenuItem>
                    <MenuItem value="Intermediate">Intermediate</MenuItem>
                    <MenuItem value="Advanced">Advanced</MenuItem>
                  </Select>
                  <FormHelperText>{errors.level?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Grid2>

          <Grid2 xs={12} sm={6}>
            <Controller
              name="duration"
              control={control}
              defaultValue=""
              rules={{ required: 'Course duration is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  variant="standard"
                  label="Duration (in months)"
                  error={!!errors.duration}
                  helperText={errors.duration?.message}
                />
              )}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <Controller
              name="startDate"
              control={control}
              defaultValue={new Date().toISOString().split('T')[0]}
              rules={{ required: 'Course start date is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="date"
                  fullWidth
                  variant="standard"
                  label="Start Date"
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.startDate}
                  helperText={errors.startDate?.message}
                />
              )}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <Controller
              name="endDate"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  type="date"
                  fullWidth
                  variant="standard"
                  label="End Date"
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </Grid2>

          <Grid2 xs={12} sm={6}>
            <Controller
              name="requirements"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField {...field} fullWidth variant="standard" label="Requirements" />
              )}
            />
          </Grid2>
          <Grid2 xs={12}>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  variant="standard"
                  multiline
                  rows={3}
                  label="Description"
                />
              )}
            />
          </Grid2>
          <Grid2 xs={12}>
            <LoadingButton type="submit" loading={isPending} fullWidth variant="contained">
              Create
            </LoadingButton>
          </Grid2>
        </Grid2>
      </Box>
    </Container>
  );
}

export default CourseCreate;

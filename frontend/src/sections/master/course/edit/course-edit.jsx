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
import useUpdateCourse from 'src/libs/mutation/master/course/useUpdateCourse';
import useGetCourseById from 'src/libs/query/master/course/useGetCoureseById';
import { usePathname, useRouter } from 'src/routes/hooks';

function CourseEdit() {
  const id = usePathname().split('/').pop();
  const isEditPage = usePathname().split('/').includes('edit');
  const router = useRouter();

  const {
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const { data, isLoading } = useGetCourseById({ id: id });
  const { mutate: updateCourse, isPending, isSuccess } = useUpdateCourse();

  useEffect(() => {
    if (data) {
      reset({
        ...data?.data,
        startDate: data?.data?.startDate.split('T')[0],
        endDate: data?.data?.endDate?.split('T')[0],
      });
    }
  }, [data, reset]);

  useEffect(() => {
    if (isSuccess) {
      router.push('/masters-course/all');
    }
  }, [isSuccess]);

  const handleUpdateCourse = (data) => {
    updateCourse({ id, ...data });
  };

  return (
    <Container>
      <Helmet>
        <title>{isEditPage ? 'Edit' : 'View'} Course | IfastAcademy</title>
      </Helmet>
      <BreadcrumbsGen
        menus={[
          { title: 'Master', url: 'masters' },
          { title: 'Course', url: 'masters-course/all' },
          { title: isEditPage ? 'Edit' : 'View', url: `masters-course/${id}` },
        ]}
      />

      <Box component="form" onSubmit={handleSubmit(handleUpdateCourse)} sx={{ mt: 2 }}>
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
                  disabled={!isEditPage}
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
                  <Select {...field} disabled={!isEditPage}>
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
                  disabled={!isEditPage}
                />
              )}
            />
          </Grid2>

          <Grid2 xs={12} sm={6}>
            <Controller
              name="startDate"
              control={control}
              defaultValue=""
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
                  disabled={!isEditPage}
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
                  disabled={!isEditPage}
                />
              )}
            />
          </Grid2>

          <Grid2 xs={12} sm={6}>
            <Controller
              name="isActive"
              control={control}
              defaultValue=""
              rules={{ required: 'Course status is required' }}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.isActive} variant="standard">
                  <InputLabel>Select Status</InputLabel>
                  <Select {...field} disabled={!isEditPage}>
                    <MenuItem value={true}>Open</MenuItem>
                    <MenuItem value={false}>Close</MenuItem>
                  </Select>
                  <FormHelperText>{errors.isActive?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Grid2>

          <Grid2 xs={12}>
            <Controller
              name="requirements"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  variant="standard"
                  label="Requirements"
                  disabled={!isEditPage}
                />
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
                  disabled={!isEditPage}
                />
              )}
            />
          </Grid2>

          {isEditPage && (
            <Grid2 xs={12}>
              <LoadingButton type="submit" loading={isPending} fullWidth variant="contained">
                Update
              </LoadingButton>
            </Grid2>
          )}
        </Grid2>
      </Box>
    </Container>
  );
}

export default CourseEdit;

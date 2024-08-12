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
import { useParams } from 'react-router-dom';
import { AsyncSelect } from 'src/components/async-select';
import { BreadcrumbsGen } from 'src/components/navigation-breadcumbs';
import config from 'src/config';
import useUpdateBatch from 'src/libs/mutation/master/batch-class/useUpdateBatchClass';
import useGetEmployees from 'src/libs/query/employee/useGetEmployees';
import useGetBatchById from 'src/libs/query/master/batch-class/useGetBatchById';
import useGetCourses from 'src/libs/query/master/course/useGetCourses';
import useGetStudents from 'src/libs/query/student/useGetStudents';
import { usePathname, useRouter } from 'src/routes/hooks';

function ClassEdit() {
  const [studentSearchTerm, setStudentSearchTerm] = React.useState('');
  const [instructorSearchTerm, setInstructorSearchTerm] = React.useState('');
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      students: [],
      instructors: [],
    },
  });

  const { id } = useParams();
  const router = useRouter();
  const isEditPage = usePathname().includes('edit');
  const { data: batchData, isSuccess: batchFetched } = useGetBatchById({ id });
  const { mutate: updateBatch, isPending, isSuccess } = useUpdateBatch();
  const { data: courses } = useGetCourses({ page: 1 });
  const { data: students, isLoading: studentsLoading } = useGetStudents({
    page: 1,
    search: studentSearchTerm,
    pageSize: 10,
  });
  const { data: instructors, isLoading: instructorLoading } = useGetEmployees({
    page: 1,
    pageSize: 10,
    search: instructorSearchTerm,
    jobTitle: 'teacher',
  });

  useEffect(() => {
    if (batchFetched) {
      const fetchedBatchData = {
        name: batchData?.data?.name,
        course: batchData?.data?.course,
        duration: batchData?.data?.duration,
        startDate: batchData?.data?.startDate?.split('T')[0],
        endDate: batchData?.data?.endDate?.split('T')[0],
        requirements: batchData?.data?.requirements,
        capacity: batchData?.data?.capacity,
        batchTiming: batchData?.data?.batchTiming,
        description: batchData?.data?.description,
        students: students?.data?.filter((s) => batchData?.data?.students?.includes(s._id)),
        instructors: instructors?.data?.filter((i) =>
          batchData?.data?.instructors?.includes(i._id)
        ),
      };
      reset(fetchedBatchData);
    }
  }, [batchFetched, students, instructors]);

  useEffect(() => {
    if (isSuccess) {
      reset();
      router.push('/masters-batch/all');
    }
  }, [isSuccess]);

  const onSubmit = (data) => {
    data.students = data.students.map((s) => s._id);
    data.instructors = data.instructors.map((s) => s._id);
    data._id = id;
    updateBatch(data);
  };

  return (
    <Container>
      <Helmet>
        <title>
          {isEditPage ? 'Edit' : 'View'} Course | {config?.appName}
        </title>
      </Helmet>
      <BreadcrumbsGen
        menus={[
          { title: 'Master', url: 'masters' },
          { title: 'Class/Batch', url: 'masters-batch/all' },
          {
            title: isEditPage ? 'Edit' : 'View',
            url: `masters-batch/${isEditPage ? 'edit' : 'view'}/${id}`,
          },
        ]}
      />

      <Box component={'form'} onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
        <Grid2 container spacing={2}>
          <Grid2 xs={12} sm={6}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{ required: 'Name is required' }}
              disabled={!isEditPage}
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
              name="course"
              control={control}
              defaultValue=""
              rules={{ required: 'Course is required' }}
              disabled={!isEditPage}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.level} variant="standard">
                  <InputLabel>Select Course</InputLabel>
                  <Select {...field}>
                    {courses?.data?.map((course) => (
                      <MenuItem key={course._id} value={course._id}>
                        {course.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors.level?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Grid2>
          {/* <Grid2 xs={12} sm={6}>
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
          </Grid2> */}
          <Grid2 xs={12} sm={6}>
            <Controller
              name="startDate"
              control={control}
              defaultValue={new Date().toISOString().split('T')[0]}
              rules={{ required: 'Start Date is required' }}
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
                  disabled={!isEditPage}
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
          <Grid2 xs={12} sm={6}>
            <Controller
              name="capacity"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  variant="standard"
                  label="Capacity (Number)"
                  type="number"
                  disabled={!isEditPage}
                />
              )}
            />
          </Grid2>

          <Grid2 xs={12} sm={6}>
            <Controller
              name="batchTiming"
              control={control}
              defaultValue=""
              rules={{ required: 'Batch Timing is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="time"
                  fullWidth
                  variant="standard"
                  label="Batch Timing"
                  disabled={!isEditPage}
                />
              )}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  variant="standard"
                  label="Description"
                  disabled={!isEditPage}
                />
              )}
            />
          </Grid2>
          <Grid2 xs={12}>
            <Controller
              name="instructors"
              control={control}
              rules={{ required: 'Instructors is required' }}
              error={!!errors.course}
              helperText={errors.course?.message}
              render={({ field, fieldState }) => (
                <AsyncSelect
                  {...field}
                  ref={field.ref} // Forward the ref to the AsyncSelect component
                  control={control}
                  name="instructors"
                  label="Select Instructors"
                  loading={instructorLoading}
                  handleSearch={(e) => {
                    setInstructorSearchTerm(e.target.value);
                  }}
                  disabled={!isEditPage}
                  getOptionLabel={(o) => `${o.firstName} ${o.lastName} (${o.ifastId})`}
                  selectedOptions={field.value}
                  setSelectedOptions={field.onChange}
                  options={
                    instructors?.data?.map((o) => ({
                      _id: o._id,
                      name: `${o.firstName} ${o.lastName} (${o.ifastId})`,
                    })) || []
                  }
                />
              )}
            />
          </Grid2>
          <Grid2 xs={12}>
            <Controller
              name="students"
              control={control}
              rules={{ required: 'Students is required' }}
              error={!!errors.course}
              helperText={errors.course?.message}
              render={({ field, fieldState }) => (
                <AsyncSelect
                  {...field}
                  ref={field.ref} // Forward the ref to the AsyncSelect component
                  control={control}
                  label="Select Students"
                  loading={studentsLoading}
                  disabled={!isEditPage}
                  handleSearch={(e) => {
                    setStudentSearchTerm(e.target.value);
                  }}
                  getOptionLabel={(o) => `${o.firstName} ${o.lastName} (${o.ifastId})`}
                  selectedOptions={field.value}
                  setSelectedOptions={field.onChange}
                  options={
                    students?.data?.map((o) => ({
                      _id: o._id,
                      name: `${o.firstName} ${o.lastName} (${o.ifastId})`,
                    })) || []
                  }
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

export default ClassEdit;

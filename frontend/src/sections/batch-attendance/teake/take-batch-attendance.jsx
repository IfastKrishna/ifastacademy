import { LoadingButton } from '@mui/lab';
import {
  Box,
  Checkbox,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm, Controller } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import useAddBatchAttendace from 'src/libs/mutation/batch-attendance/useAddBatchAttendace';
import useIsAuth from 'src/libs/query/isAuth/useIsAuth';
import useGetBatches from 'src/libs/query/master/batch-class/useGetBatches';
import useGetBatchStudentById from 'src/libs/query/master/batch-class/useGetBatchStudent';

function TakeBatchAttendance() {
  const { id } = useParams();
  const { data: user } = useIsAuth();
  const { data: batchStudents } = useGetBatchStudentById({ id });
  const { data: batches } = useGetBatches({ page: 1, pageSize: 50 });
  const { mutate: submit, isPending: loading, isSuccess: submited } = useAddBatchAttendace();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      batchId: id,
      takenBy: user?.data?._id,
      date: new Date().toISOString().split('T')[0],
      todayTopic: '',
      problemFaced: '',
      generalRemarks: '',
    },
  });

  React.useEffect(() => {
    if (submited) {
      reset();
    }
  }, [submited]);

  const onSubmit = (data) => {
    const attendanceData = batchStudents?.data?.students.map((student) => ({
      studentId: student._id,
      status: data.attendance[student._id] ? 'present' : 'absent',
      remarks: data.remarks[student._id] || '',
    }));

    const payload = {
      batchId: id,
      takenBy: data.takenBy,
      date: data.date,
      todayTopic: data.todayTopic,
      problemFaced: data.problemFaced,
      generalRemarks: data.generalRemarks,
      studentsAttendance: attendanceData,
    };
    submit(payload);
  };

  return (
    <Container>
      <Helmet>
        <title>Take Batch Attendance | IfastAcademy</title>
      </Helmet>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid2 container spacing={2}>
          {/* Batch Name Field */}
          <Grid2 xs={12} sm={6}>
            <Controller
              name="batchId"
              control={control}
              rules={{ required: 'Batch Name is required' }}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.batchId} variant="standard" disabled>
                  <InputLabel shrink={true}>Batch Name</InputLabel>
                  <Select {...field}>
                    {batches?.data?.map((batch) => (
                      <MenuItem value={batch?._id}>{batch?.name}</MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors.batchId?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Grid2>

          {/* Collected By Field */}
          <Grid2 xs={12} sm={6}>
            <Controller
              name="takenBy"
              control={control}
              rules={{ required: 'Taken By is required' }}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.takenBy} variant="standard" disabled>
                  <InputLabel shrink={true}>Collected By</InputLabel>
                  <Select {...field}>
                    <MenuItem value={user?.data?._id} selected>
                      {user?.data?.firstName} {user?.data?.lastName}
                    </MenuItem>
                  </Select>
                  <FormHelperText>{errors.takenBy?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Grid2>

          {/* Date Field */}
          <Grid2 xs={12} sm={6}>
            <Controller
              name="date"
              control={control}
              rules={{ required: 'Date is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="date"
                  label="Date"
                  variant="standard"
                  error={!!errors?.date}
                  helperText={errors?.date?.message}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
              )}
            />
          </Grid2>

          {/* Today Topic Field */}
          <Grid2 xs={12} sm={6}>
            <Controller
              name="todayTopic"
              control={control}
              rules={{ required: 'Today topic is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Today Topic Name"
                  variant="standard"
                  error={!!errors?.todayTopic}
                  helperText={errors?.todayTopic?.message}
                  fullWidth
                />
              )}
            />
          </Grid2>

          {/* Problem Faced Field */}
          <Grid2 xs={12} sm={6}>
            <Controller
              name="problemFaced"
              control={control}
              rules={{ required: 'Problem faced is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Problem Faced"
                  variant="standard"
                  error={!!errors?.problemFaced}
                  helperText={errors?.problemFaced?.message}
                  fullWidth
                />
              )}
            />
          </Grid2>

          {/* Remarks Field */}
          <Grid2 xs={12} sm={6}>
            <Controller
              name="generalRemarks"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Remarks"
                  variant="standard"
                  error={!!errors?.generalRemarks}
                  helperText={errors?.generalRemarks?.message}
                  fullWidth
                />
              )}
            />
          </Grid2>

          {/* Attendance Table */}
          <Grid2 xs={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Full Name</TableCell>
                    <TableCell>ID</TableCell>
                    <TableCell>Phone No</TableCell>
                    <TableCell align="center">Present</TableCell>
                    <TableCell align="center">Remarks</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {batchStudents?.data?.students?.map((student) => (
                    <TableRow key={student._id}>
                      <TableCell>
                        {student.firstName} {student.lastName}
                      </TableCell>
                      <TableCell>{student.ifastId}</TableCell>
                      <TableCell>{student.phoneNo}</TableCell>
                      <TableCell align="center">
                        <Controller
                          name={`attendance.${student._id}`}
                          control={control}
                          defaultValue={false}
                          render={({ field }) => <Checkbox {...field} checked={field.value} />}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Controller
                          name={`remarks.${student._id}`}
                          control={control}
                          render={({ field }) => <TextField {...field} size="small" fullWidth />}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid2>

          {/* Submit Button */}
          <Grid2 xs={12} sm={6}>
            <LoadingButton type="submit" variant="contained" fullWidth loading={loading}>
              Submit Attendance
            </LoadingButton>
          </Grid2>
        </Grid2>
      </Box>
    </Container>
  );
}

export default TakeBatchAttendance;

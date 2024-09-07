import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Checkbox,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useForm, Controller } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import dayjs from 'dayjs';
import useGetBatches from 'src/libs/query/master/batch-class/useGetBatches';
import { useUI } from 'src/context/CostomeUi';
import useGetStudentsInBatch from 'src/libs/query/master/batch-class/GetTotalStudentsInBatch';
import useIsAuth from 'src/libs/query/isAuth/useIsAuth';
import useAddBatchAttendace from 'src/libs/mutation/batch-attendance/useAddBatchAttendace';
import useGetBatchAndDateWiseAttendance from 'src/libs/query/batch-attendance/useGetBatchAtteByIdAndDate';

function BatchWiseAttendance() {
  const { data: batches, isSuccess: loadedBatches } = useGetBatches({ page: 1, pageSize: 'all' });
  const { uiSettings } = useUI();
  const { data: user, isSuccess: userLoaded } = useIsAuth();
  const {
    control,
    handleSubmit,
    reset,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      batchId: '',
      date: dayjs(),
      takenBy: '',
      todayTopic: '',
      problemFaced: '',
      generalRemarks: '',
      attendance: [],
    },
  });

  const [attendance, setAttendance] = useState(watch('attendance'));

  useEffect(() => {
    if (loadedBatches) {
      reset({
        ...getValues(),
        batchId: batches?.data[0]?._id || '',
        date: dayjs(),
      });
    }
  }, [loadedBatches, reset, batches, getValues]);

  const {
    data: attendanceData,
    isSuccess: loadAttendance,
    isError: notFoundAttendance,
  } = useGetBatchAndDateWiseAttendance({
    batchId: watch('batchId'),
    date: dayjs(watch('date')).format('YYYY-MM-DD'),
  });

  const students = useGetStudentsInBatch({ id: watch('batchId') })?.data;
  const { mutate: submit, isPending: loading, isSuccess: submitted } = useAddBatchAttendace();

  const handleCheckboxChange = (studentId) => (event) => {
    setAttendance((prev) => {
      const isPresent = event.target.checked;
      const existingIndex = prev.findIndex((entry) => entry.studentId === studentId);
      if (isPresent) {
        if (existingIndex === -1) {
          return [...prev, { studentId, status: 'present', remarks: '' }];
        }
        return prev.map((entry) =>
          entry.studentId === studentId ? { ...entry, status: 'present' } : entry
        );
      } else {
        return existingIndex === -1 ? prev : prev.filter((entry) => entry.studentId !== studentId);
      }
    });
  };

  const handleRemarkChange = (studentId) => (event) => {
    setAttendance((prev) => {
      const updatedRemarks = event.target.value;
      return prev.map((entry) =>
        entry.studentId === studentId ? { ...entry, remarks: updatedRemarks } : entry
      );
    });
  };
  console.log(attendanceData?.data);

  const onSubmit = (data) => {
    const formattedData = {
      ...data,
      takenBy: attendanceData?.data?.takenBy?._id || user?.data?.userId || user?.data?._id,
      date: dayjs(data.date).format('YYYY-MM-DD'),
      attendance:
        students?.data?.map((student) => {
          const existingEntry = attendance.find((entry) => entry.studentId === student._id);
          return {
            studentId: student._id,
            status: existingEntry ? existingEntry.status : 'absent',
            remarks: existingEntry ? existingEntry.remarks : '',
          };
        }) || [],
    };

    console.log(formattedData);
    submit(formattedData);
  };

  useEffect(() => {
    if (loadAttendance) {
      reset({
        ...getValues(),
        takenBy: attendanceData?.data?.takenBy?._id,
        todayTopic: attendanceData?.data?.todayTopic,
        problemFaced: attendanceData?.data?.problemFaced,
        generalRemarks: attendanceData?.data?.generalRemarks,
        // attendance:
      });

      if (students?.data) {
        setAttendance(
          students.data.map((student) => {
            const existingEntry = attendanceData?.data?.studentsAttendance?.find(
              (entry) => entry?.studentId?._id === student._id
            );
            return {
              studentId: student._id,
              status: existingEntry ? existingEntry.status : 'absent',
              remarks: existingEntry ? existingEntry.remarks : '',
            };
          })
        );
      }
    } else if (students?.data) {
      reset({
        ...getValues(),
        takenBy: user?.data?.userId,
        todayTopic: '',
        problemFaced: '',
        generalRemarks: '',
      });
      setAttendance(
        students.data.map((student) => {
          return {
            studentId: student._id,
            status: 'absent',
            remarks: '',
          };
        })
      );
    }
  }, [attendanceData, notFoundAttendance, loadAttendance, students, getValues, reset]);

  // ...

  React.useEffect(() => {
    if (submitted) {
      reset();
    }
  }, [submitted, reset]);

  return (
    <Container>
      <Paper
        elevation={3}
        sx={{
          padding: {
            xs: 2,
            md: 4,
          },
          marginTop: 4,
        }}
      >
        <Typography variant="h4" sx={{ py: 2 }}>
          Batch Wise Attendance
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Grid2 container spacing={3}>
            <Grid2 xs={12} md={6}>
              <FormControl
                fullWidth
                error={!!errors.batchId}
                variant={uiSettings.textFieldVariant}
                size={uiSettings.textFieldSize}
              >
                <InputLabel shrink={true}>Batch Name</InputLabel>
                <Controller
                  name="batchId"
                  control={control}
                  rules={{ required: 'Batch Name is required' }}
                  render={({ field }) => (
                    <Select label="Batch Name" {...field} displayEmpty>
                      <MenuItem value="" disabled>
                        <em>Select Batch</em>
                      </MenuItem>
                      {batches?.data?.map((batch) => (
                        <MenuItem key={batch._id} value={batch._id}>
                          {batch.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <FormHelperText>{errors.batchId?.message}</FormHelperText>
              </FormControl>
            </Grid2>
            <Grid2 xs={12} md={6}>
              <Controller
                name="date"
                control={control}
                rules={{ required: 'Date is required' }}
                render={({ field }) => (
                  <FormControl
                    error={!!errors.date}
                    variant={uiSettings.textFieldVariant}
                    size={uiSettings.textFieldSize}
                    fullWidth
                  >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        {...field}
                        label="Date"
                        format="DD / MM / YYYY"
                        slotProps={{
                          day: { selectedDay: field.value },
                          textField: {
                            fullWidth: true,
                            variant: uiSettings?.textFieldVariant,
                            size: uiSettings?.textFieldSize,
                          },
                        }}
                      />
                    </LocalizationProvider>
                    <FormHelperText>{errors.date?.message}</FormHelperText>
                  </FormControl>
                )}
              />
            </Grid2>
            <Grid2 xs={12} sm={6}>
              <TextField
                fullWidth
                label="Taken By"
                variant={uiSettings?.textFieldVariant}
                size={uiSettings?.textFieldSize}
                InputLabelProps={{ shrink: true }}
                value={
                  attendanceData?.data
                    ? `${attendanceData?.data?.takenBy?.firstName} ${attendanceData?.data?.takenBy?.lastName} ${attendanceData?.data?.takenBy?.ifastId})`
                    : `${user?.data?.firstName} ${user?.data?.lastName} ${user?.data?.ifastId}`
                }
                disabled
              />
            </Grid2>

            {/* Today Topic Field */}
            <Grid2 xs={12} sm={6}>
              <Controller
                name="todayTopic"
                control={control}
                rules={{ required: 'Topic is required' }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    error={!!errors.todayTopic}
                    variant={uiSettings?.textFieldVariant}
                    size={uiSettings?.textFieldSize}
                    {...field}
                    label="Today Topic"
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
                    variant={uiSettings?.textFieldVariant}
                    size={uiSettings?.textFieldSize}
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
                    variant={uiSettings?.textFieldVariant}
                    size={uiSettings?.textFieldSize}
                    error={!!errors?.generalRemarks}
                    helperText={errors?.generalRemarks?.message}
                    fullWidth
                  />
                )}
              />
            </Grid2>
          </Grid2>

          <Typography variant="h6" sx={{ py: 2 }}>
            Students
          </Typography>

          {students?.data?.map((student) => (
            <Paper
              elevation={2}
              key={student._id}
              sx={{
                padding: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                my: 2,
              }}
            >
              <Box display="flex" alignItems="center" width="100%">
                <Tooltip
                  title={
                    <React.Fragment>
                      <Typography variant="body2">{student.ifastId}</Typography>
                      <Typography variant="body2">
                        {student.firstName} {student.lastName}
                      </Typography>
                      <Typography variant="body2">{student.phoneNo}</Typography>
                    </React.Fragment>
                  }
                  arrow
                  placement="top"
                >
                  <Avatar
                    src={student.avatar}
                    alt={`${student.firstName} ${student.lastName}`}
                    sx={{ marginRight: 2, cursor: 'pointer' }}
                  />
                </Tooltip>
                <Box display="flex" flexDirection="column" sx={{ flexGrow: 1 }}>
                  <Typography variant="body1">
                    {student.firstName} {student.lastName}
                  </Typography>
                </Box>
                <Checkbox
                  checked={attendance?.some(
                    (entry) => entry.studentId === student._id && entry.status === 'present'
                  )}
                  onChange={handleCheckboxChange(student._id)}
                />
              </Box>
              <TextField
                label="Remarks"
                variant={uiSettings?.textFieldVariant}
                size={uiSettings?.textFieldSize}
                sx={{ marginLeft: 2, flexGrow: 2 }}
                margin="dense"
                value={attendance.find((entry) => entry.studentId === student._id)?.remarks || ''}
                onChange={handleRemarkChange(student._id)}
              />
            </Paper>
          ))}
          <Box mt={3}>
            <LoadingButton
              type="submit"
              sx={{
                width: {
                  xs: '100%',
                  sm: 'auto',
                },
              }}
              variant={uiSettings?.btnVariant}
              size={uiSettings?.btnSize}
              color={uiSettings?.btnColor}
              loading={loading}
            >
              {attendanceData ? 'Update' : 'Submit'} Attendance
            </LoadingButton>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default BatchWiseAttendance;

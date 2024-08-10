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
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import useGetBatchAttendanceDateWise from 'src/libs/query/batch-attendance/useGetBatchAttendance';
import useGetBatches from 'src/libs/query/master/batch-class/useGetBatches';

function BatchAttendanceView() {
  const [inputData, setInputData] = React.useState({
    batchId: '',
    date: new Date().toISOString().split('T')[0],
  });

  const onChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const {
    data: batches,
    isLoading: batchesLoading,
    error: batchesError,
  } = useGetBatches({ page: 1, pageSize: 50 });

  const { data: batchAttendance, isLoading: attendanceLoading } = useGetBatchAttendanceDateWise(
    JSON.stringify(inputData)
  );

  console.log(batchAttendance);

  return (
    <Container>
      <Helmet>
        <title>Batch Attendance View | IfastAcademy</title>
      </Helmet>
      <Grid2 container spacing={2}>
        <Grid2 xs={12}>
          <Typography variant="h4">Batch Attendance</Typography>
        </Grid2>

        {/* Error Handling */}
        {batchesError && (
          <Grid2 item xs={12}>
            <Alert severity="error">Failed to load batches: {batchesError.message}</Alert>
          </Grid2>
        )}

        <Grid2 item xs={12} sm={6}>
          <FormControl fullWidth disabled={batchesLoading || !batches}>
            <InputLabel id="batchId">Batch</InputLabel>
            <Select labelId="batchId" name="batchId" value={inputData.batchId} onChange={onChange}>
              {batches?.data?.map((batch) => (
                <MenuItem key={batch._id} value={batch._id}>
                  {batch.name}
                </MenuItem>
              ))}
            </Select>
            {batchesLoading && <FormHelperText>Loading batches...</FormHelperText>}
          </FormControl>
        </Grid2>

        {/* Date Picker */}
        <Grid2 item xs={12} sm={6}>
          <TextField
            fullWidth
            name="date"
            label="Date"
            type="date"
            value={inputData.date}
            onChange={onChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid2>

        {/* Loading Indicator */}
        <Grid2 item xs={12}>
          {attendanceLoading && <CircularProgress />}
        </Grid2>

        <Grid2 item xs={12}>
          {batchAttendance && (
            <Box>
              <Typography>Attendance Data Loaded</Typography>
            </Box>
          )}
        </Grid2>
      </Grid2>
    </Container>
  );
}

export default BatchAttendanceView;

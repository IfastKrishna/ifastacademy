import {
  Box,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useUI } from 'src/context/CostomeUi';
import useGetBatches from 'src/libs/query/master/batch-class/useGetBatches';
import { LoadingButton } from '@mui/lab';
import dayjs from 'dayjs';

function BatchWiseAttendance() {
  const { data: batches } = useGetBatches({ page: 1, pageSize: 50 });
  const { uiSettings } = useUI();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.date = dayjs(data.date).format('YYYY-MM-DD');
    console.log(data);
  };

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
            <Grid2 item xs={12} md={6}>
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
                    <Select label="Batch Name" {...field}>
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
            <Grid2 item xs={12} md={6}>
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
                      <DatePicker {...field} label="Date" />
                    </LocalizationProvider>
                    <FormHelperText>{errors.date?.message}</FormHelperText>
                  </FormControl>
                )}
              />
            </Grid2>
          </Grid2>
          <Box mt={3}>
            <LoadingButton
              type="submit"
              variant={uiSettings?.btnVariant}
              size={uiSettings?.btnSize}
            >
              Submit
            </LoadingButton>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default BatchWiseAttendance;

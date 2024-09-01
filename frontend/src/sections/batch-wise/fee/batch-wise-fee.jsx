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

function BatchWiseFee() {
  const { data: batches, isSuccess: loadedBatches } = useGetBatches({ page: 1, pageSize: 'all' });
  const { uiSettings } = useUI();
  const {
    control,
    handleSubmit,
    getValues,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      startDate: dayjs().startOf('month'),
      endDate: dayjs().endOf('month'),
      batchId: '',
    },
  });

  const [startDate, setStartDate] = React.useState(dayjs(watch('startDate')).format('YYYY-MM-DD'));
  const [endDate, setEndDate] = React.useState(dayjs(watch('endDate')).format('YYYY-MM-DD'));
  const [batchId, setBatchId] = React.useState(watch('batchId'));

  React.useEffect(() => {
    if (loadedBatches) {
      reset({
        startDate: dayjs().startOf('month'),
        endDate: dayjs().endOf('month'),
        batchId: batches?.data[0]?._id || '',
      });
    }
  }, [loadedBatches, reset, batches]);

  const batchWiseFee = (data) => {};
  console.log(getValues());

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
          Batch Wise Fees List
        </Typography>
        <Box>
          <Grid2 container spacing={3}>
            <Grid2 xs={12} md={4}>
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
                      <MenuItem value="">Select Batch</MenuItem>
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

            <Grid2 xs={6} md={4}>
              <FormControl
                error={!!errors.startDate}
                variant={uiSettings.textFieldVariant}
                size={uiSettings.textFieldSize}
                fullWidth
              >
                <Controller
                  name="startDate"
                  control={control}
                  rules={{ required: 'Start Date is required' }}
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        value={field.value}
                        onChange={(newValue) => field.onChange(newValue)}
                        label="Start Date"
                        format="DD/MM/YYYY"
                        slotProps={{
                          day: { selectedDay: field.value },
                        }}
                      />
                    </LocalizationProvider>
                  )}
                />
                <FormHelperText>{errors.startDate?.message}</FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 xs={6} md={4}>
              <FormControl
                error={!!errors.endDate}
                variant={uiSettings.textFieldVariant}
                size={uiSettings.textFieldSize}
                fullWidth
              >
                <Controller
                  name="endDate"
                  control={control}
                  rules={{
                    required: 'End Date is required',
                    validate: (value) => {
                      const startDate = watch('startDate');
                      if (dayjs(value).isBefore(startDate)) {
                        return 'End Date cannot be before Start Date';
                      }
                      return true;
                    },
                  }}
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        value={field.value}
                        onChange={(newValue) => field.onChange(newValue)}
                        label="End Date"
                        format="DD/MM/YYYY"
                        slotProps={{
                          day: { selectedDay: field.value },
                        }}
                      />
                    </LocalizationProvider>
                  )}
                />
                <FormHelperText>{errors.endDate?.message}</FormHelperText>
              </FormControl>
            </Grid2>
          </Grid2>
        </Box>
      </Paper>
    </Container>
  );
}

export default BatchWiseFee;

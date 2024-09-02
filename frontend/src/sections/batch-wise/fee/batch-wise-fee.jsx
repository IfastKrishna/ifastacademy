import React from 'react';
import {
  Box,
  Collapse,
  Container,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import dayjs from 'dayjs';
import useGetBatches from 'src/libs/query/master/batch-class/useGetBatches';
import useGetBatchWiseFeeList from 'src/libs/query/master/batch-class/useGetBatchWiseFee';
import { useUI } from 'src/context/CostomeUi';

function BatchWiseFee() {
  const { uiSettings } = useUI();
  const { data: batches, isSuccess: loadedBatches } = useGetBatches({ page: 1, pageSize: 'all' });
  const {
    control,
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

  const feeList = useGetBatchWiseFeeList({
    startDate: dayjs(watch('startDate')).format('YYYY-MM-DD'),
    endDate: dayjs(watch('endDate')).format('YYYY-MM-DD'),
    batchId: watch('batchId'),
  }).data;

  const [open, setOpen] = React.useState({});

  const handleClick = (id) => {
    setOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  React.useEffect(() => {
    if (loadedBatches) {
      reset({
        startDate: dayjs().startOf('month'),
        endDate: dayjs().endOf('month'),
        batchId: batches?.data[0]?._id || '',
      });
    }
  }, [loadedBatches, reset, batches]);

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
                variant={uiSettings?.textFieldVariant}
                size={uiSettings?.textFieldSize}
              >
                <InputLabel shrink={true}>Batch Name</InputLabel>
                <Controller
                  name="batchId"
                  control={control}
                  rules={{ required: 'Batch Name is required' }}
                  render={({ field }) => (
                    <Select label="Batch Name" {...field}>
                      <MenuItem value="" disabled>
                        Select Batch
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

            <Grid2 xs={6} md={4}>
              <FormControl
                error={!!errors.startDate}
                variant={uiSettings?.textFieldVariant}
                size={uiSettings?.textFieldSize}
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
                          textField: {
                            fullWidth: true,
                            variant: uiSettings?.textFieldVariant,
                            size: uiSettings?.textFieldSize,
                          },
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
                variant={uiSettings?.textFieldVariant}
                size={uiSettings?.textFieldSize}
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
                          textField: {
                            fullWidth: true,
                            variant: uiSettings?.textFieldVariant,
                            size: uiSettings?.textFieldSize,
                          },
                        }}
                      />
                    </LocalizationProvider>
                  )}
                />
                <FormHelperText>{errors.endDate?.message}</FormHelperText>
              </FormControl>
            </Grid2>
          </Grid2>

          {feeList?.data?.map((student, index) => (
            <Box key={index} sx={{ mb: 2, mt: 3 }}>
              <Paper
                elevation={2}
                sx={{
                  p: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
                onClick={() => handleClick(student.ifastId)}
              >
                <Typography variant="h6">
                  {student.firstName} {student.lastName} ({student.ifastId})
                </Typography>
                <IconButton size="small">
                  {open[student.ifastId] ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              </Paper>
              <Collapse in={open[student?.ifastId]} timeout="auto" unmountOnExit>
                <TableContainer sx={{ textWrap: 'nowrap' }}>
                  <Table size="small" aria-label="fees">
                    <TableHead>
                      <TableRow>
                        <TableCell>Amount</TableCell>
                        <TableCell>Payment Date</TableCell>
                        <TableCell>Payment Reference</TableCell>
                        <TableCell>Collected By</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {student.feeList.map((fee, feeIndex) => (
                        <TableRow key={feeIndex}>
                          <TableCell>{fee.amount}</TableCell>
                          <TableCell>{new Date(fee.paymentDate).toLocaleDateString()}</TableCell>
                          <TableCell>{fee.paymentReference}</TableCell>
                          <TableCell>{fee.collectedBy}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Collapse>
            </Box>
          ))}
        </Box>
      </Paper>
    </Container>
  );
}

export default BatchWiseFee;

import { AddCircle, RemoveCircle } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Helmet } from 'react-helmet-async';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import useGetStudentById from 'src/libs/query/student/useGetStudentById';
import useIsAuth from 'src/libs/query/isAuth/useIsAuth';
import useGetBatches from 'src/libs/query/master/batch-class/useGetBatches';
import useGetFeeCategories from 'src/libs/query/master/fee-categories/useGetFeeCategories';
import useAddStudentFee from 'src/libs/mutation/student-fee/useAddStudentFee';
import { useEffect } from 'react';

const CreateStudentFee = () => {
  const { id } = useParams();
  const { data: feeCategories } = useGetFeeCategories({});
  const { data: student } = useGetStudentById({ id });
  const { data: batchOrClasses } = useGetBatches({ page: 1, pageSize: 20 });
  const { data: user } = useIsAuth();

  const {
    mutate: addStudentFee,
    isPending: studentFeeAdding,
    isSuccess: addedStudentFee,
  } = useAddStudentFee();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      paymentReference: '',
      paymentDate: new Date().toISOString().split('T')[0],
      collectedBy: user?.data?._id || '',
      paymentMode: '',
      batchId: '',
      fees: [{ category: '', month: '', amount: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'fees',
  });

  const onSubmit = (data) => {
    const newData = data.fees.map((item) => ({
      studentId: id,
      amount: item.amount,
      month: item.month,
      paymentType: item.category,
      collectedBy: data.collectedBy,
      paymentMode: data.paymentMode,
      paymentDate: data.paymentDate,
      batchId: data.batchId,
      paymentReference: data.paymentReference,
    }));
    addStudentFee(newData);
  };

  useEffect(() => {
    if (addedStudentFee) {
      reset({
        paymentReference: '',
        paymentDate: new Date().toISOString().split('T')[0],
        collectedBy: user?.data?._id || '',
        paymentMode: '',
        batchId: '',
        fees: [{ category: '', month: '', amount: '' }],
      });
    }
  }, [addedStudentFee, reset, user?.data?._id]);

  return (
    <Container>
      <Helmet>
        <title>Create Student Fee | IfastAcademy</title>
      </Helmet>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid2 container spacing={2}>
          <Grid2 xs={12} sm={6}>
            <TextField
              fullWidth
              value={student?.data?.ifastId || ''}
              label="Student ID"
              variant="standard"
              InputLabelProps={{ shrink: true }}
              InputProps={{ readOnly: true }}
            />
          </Grid2>

          <Grid2 xs={12} sm={6}>
            <TextField
              fullWidth
              label="Student Name"
              value={`${student?.data.firstName || ''} ${student?.data?.lastName || ''}`}
              variant="standard"
              InputLabelProps={{ shrink: true }}
              InputProps={{ readOnly: true }}
            />
          </Grid2>

          <Grid2 xs={12} sm={6}>
            <TextField
              fullWidth
              value={student?.data.phoneNo || ''}
              label="Student Phone"
              variant="standard"
              InputLabelProps={{ shrink: true }}
              InputProps={{ readOnly: true }}
            />
          </Grid2>

          <Grid2 xs={12} sm={6}>
            <Controller
              name="paymentReference"
              control={control}
              defaultValue=""
              rules={{ required: 'Receipt Number is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Receipt Number"
                  variant="standard"
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.paymentReference}
                  helperText={errors.paymentReference?.message}
                />
              )}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <Controller
              name="paymentDate"
              control={control}
              defaultValue={new Date().toISOString().split('T')[0]}
              rules={{ required: 'Payment Date is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="date"
                  label="Payment Date"
                  variant="standard"
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.paymentDate}
                  helperText={errors.paymentDate?.message}
                />
              )}
            />
          </Grid2>

          <Grid2 xs={12} sm={6}>
            <Controller
              name="collectedBy"
              control={control}
              defaultValue={user?.data?._id || ''}
              rules={{ required: 'Collected By is required' }}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.collectedBy} variant="standard" disabled>
                  <InputLabel shrink={true}>Collected By</InputLabel>
                  <Select {...field}>
                    <MenuItem value={user?.data?._id}>
                      {user?.data?.firstName} {user?.data?.lastName}
                    </MenuItem>
                  </Select>
                  <FormHelperText>{errors.collectedBy?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Grid2>

          <Grid2 xs={12} sm={6}>
            <Controller
              name="paymentMode"
              control={control}
              defaultValue=""
              rules={{ required: 'Payment Mode is required' }}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.paymentMode} variant="standard">
                  <InputLabel shrink={true}>Payment Mode</InputLabel>
                  <Select {...field}>
                    <MenuItem value="cash">Cash</MenuItem>
                    <MenuItem value="online">Online</MenuItem>
                  </Select>
                  <FormHelperText>{errors.paymentMode?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Grid2>

          <Grid2 xs={12} sm={6}>
            <Controller
              name="batchId"
              control={control}
              defaultValue=""
              rules={{ required: 'Batch/Class is required' }}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.batchId} variant="standard">
                  <InputLabel shrink={true}>Batch/Class</InputLabel>
                  <Select {...field}>
                    {batchOrClasses?.data?.map((batch) => (
                      <MenuItem key={batch._id} value={batch._id}>
                        {batch.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors.batchId?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Grid2>

          {fields.map((item, index) => (
            <Grid2 container spacing={2} key={item.id} alignItems="center">
              <Grid2 xs={12} sm={4}>
                <Controller
                  name={`fees[${index}].category`}
                  control={control}
                  defaultValue={item.category || ''}
                  rules={{ required: 'Fee Category is required' }}
                  render={({ field }) => (
                    <FormControl
                      fullWidth
                      variant="standard"
                      error={!!errors?.fees?.[index]?.category}
                    >
                      <InputLabel shrink={true}>Fee Category</InputLabel>
                      <Select {...field}>
                        {feeCategories?.data?.map((category) => (
                          <MenuItem key={category._id} value={category._id}>
                            {category.name}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>{errors?.fees?.[index]?.category?.message}</FormHelperText>
                    </FormControl>
                  )}
                />
              </Grid2>
              <Grid2 xs={12} sm={4}>
                <Controller
                  name={`fees[${index}].month`}
                  control={control}
                  defaultValue={item.month || ''}
                  rules={{ required: 'Month is required' }}
                  render={({ field }) => (
                    <FormControl
                      fullWidth
                      variant="standard"
                      error={!!errors?.fees?.[index]?.month}
                    >
                      <InputLabel shrink={true}>Month</InputLabel>
                      <Select {...field}>
                        <MenuItem value="january">January</MenuItem>
                        <MenuItem value="february">February</MenuItem>
                        <MenuItem value="march">March</MenuItem>
                        <MenuItem value="april">April</MenuItem>
                        <MenuItem value="may">May</MenuItem>
                        <MenuItem value="june">June</MenuItem>
                        <MenuItem value="july">July</MenuItem>
                        <MenuItem value="august">August</MenuItem>
                        <MenuItem value="september">September</MenuItem>
                        <MenuItem value="october">October</MenuItem>
                        <MenuItem value="november">November</MenuItem>
                        <MenuItem value="december">December</MenuItem>
                      </Select>
                      <FormHelperText>{errors?.fees?.[index]?.month?.message}</FormHelperText>
                    </FormControl>
                  )}
                />
              </Grid2>
              <Grid2 xs={12} sm={3}>
                <Controller
                  name={`fees[${index}].amount`}
                  control={control}
                  defaultValue={item.amount || ''}
                  rules={{ required: 'Amount is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      error={!!errors?.fees?.[index]?.amount}
                      helperText={errors?.fees?.[index]?.amount?.message}
                      fullWidth
                      label="Amount"
                      variant="standard"
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                />
              </Grid2>
              <Grid2 xs={12} sm={1}>
                <IconButton color="error" onClick={() => remove(index)}>
                  <RemoveCircle />
                </IconButton>
              </Grid2>
            </Grid2>
          ))}

          <Grid2 xs={12}>
            <Button
              color="primary"
              variant="contained"
              onClick={() =>
                append({
                  category: '',
                  month: '',
                  amount: '',
                })
              }
            >
              <AddCircle />
              <Typography variant="button" sx={{ ml: 1 }}>
                Add Fee
              </Typography>
            </Button>
          </Grid2>

          <Grid2 xs={12}>
            <LoadingButton fullWidth variant="contained" type="submit" loading={studentFeeAdding}>
              Submit
            </LoadingButton>
          </Grid2>
        </Grid2>
      </form>
    </Container>
  );
};

export default CreateStudentFee;

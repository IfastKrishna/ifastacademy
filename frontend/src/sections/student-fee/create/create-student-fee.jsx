import { AddCircle, RemoveCircle } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Helmet } from 'react-helmet-async';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import useGetStudentById from 'src/libs/query/student/useGetStudentById';
import useIsAuth from 'src/libs/query/isAuth/useIsAuth';
import useGetFeeCategories from 'src/libs/query/master/fee-categories/useGetFeeCategories';
import useAddStudentFee from 'src/libs/mutation/student-fee/useAddStudentFee';
import React, { useEffect } from 'react';
import config from 'src/config';
import { BreadcrumbsGen } from 'src/components/navigation-breadcumbs';
import useGetStudentFeesById from 'src/libs/query/student-fee/useGetSudentFeesById';
import { fDate } from 'src/utils/format-time';

const CreateStudentFee = ({
  variant = 'standard',
  size = 'medium',
  btnSize = 'medium',
  btnVariant = 'contained',
}) => {
  const { id } = useParams();
  const { data: feeCategories } = useGetFeeCategories({});
  const { data: student, isSuccess: studentDataLoaded } = useGetStudentById({ id });
  const { data: studentFee } = useGetStudentFeesById({ id });
  // console.log(studentFee, 'studentFee');
  const { data: user } = useIsAuth();

  React.useEffect(() => {
    if (studentDataLoaded) {
      const batches = student?.data?.enrolledBatch;
      setValue('batchId', batches?.length > 0 ? batches?.[0]?._id : '');
    }
  }, [studentDataLoaded]);
  const {
    mutate: addStudentFee,
    isPending: studentFeeAdding,
    isSuccess: addedStudentFee,
  } = useAddStudentFee();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      paymentReference: '',
      paymentDate: new Date().toISOString().split('T')[0],
      collectedBy: user?.data?.role == 'employee' ? user?.data?.userId : user?.data?._id || '',
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

  const navBread = [
    { title: 'Students', url: 'student/all' },
    { title: 'StudentFees', url: 'student-fee/all' },
    { title: 'Create', url: 'student-fee/create' },
  ];

  return (
    <Container>
      <Helmet>
        <title>Create Student Fee | {config?.appName}</title>
      </Helmet>
      <BreadcrumbsGen menus={navBread} />
      <Box sx={{ mb: 2 }} />
      <TableContainer sx={{ mb: 2 }}>
        <Table>
          <TableHead>
            <TableCell>Receipt No</TableCell>
            <TableCell>Batch</TableCell>
            <TableCell>Month</TableCell>
            <TableCell>Fee Category</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Payment Date</TableCell>
            <TableCell>Collected By</TableCell>
          </TableHead>
          {studentFee?.data?.map((fee) => (
            <TableRow key={fee._id}>
              <TableCell>{fee.paymentReference}</TableCell>
              <TableCell>{fee.batchId.name}</TableCell>
              <TableCell>{fee.month}</TableCell>
              <TableCell>{fee.paymentType?.name}</TableCell>
              <TableCell>{fee.amount}</TableCell>
              <TableCell>{fDate(fee.paymentDate)}</TableCell>
              <TableCell>
                {fee.collectedBy?.firstName + ' (' + fee.collectedBy?.ifastId + ')'}
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </TableContainer>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid2 container spacing={2}>
          <Grid2 xs={12} sm={6}>
            <TextField
              fullWidth
              value={student?.data?.ifastId || ''}
              label="Student ID"
              size={size}
              variant={variant}
              InputLabelProps={{ shrink: true }}
              InputProps={{ readOnly: true }}
            />
          </Grid2>

          <Grid2 xs={12} sm={6}>
            <TextField
              fullWidth
              label="Student Name"
              value={`${student?.data.firstName || ''} ${student?.data?.lastName || ''}`}
              size={size}
              variant={variant}
              InputLabelProps={{ shrink: true }}
              InputProps={{ readOnly: true }}
            />
          </Grid2>

          <Grid2 xs={12} sm={6}>
            <TextField
              fullWidth
              value={student?.data.phoneNo || ''}
              label="Student Phone"
              size={size}
              variant={variant}
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
                  size={size}
                  variant={variant}
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
                  size={size}
                  variant={variant}
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
                <FormControl
                  fullWidth
                  error={!!errors.collectedBy}
                  size={size}
                  variant={variant}
                  disabled
                >
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
                <FormControl fullWidth error={!!errors.paymentMode} size={size} variant={variant}>
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
              rules={{
                required: 'Batch/Class is required',
              }}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.batchId} size={size} variant={variant}>
                  <InputLabel shrink={true}>Batch/Class</InputLabel>
                  <Select {...field}>
                    {student?.data?.enrolledBatch?.map((batch) => (
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
                      size={size}
                      variant={variant}
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
                      size={size}
                      variant={variant}
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
                      size={size}
                      variant={variant}
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
              size={btnSize}
              variant={btnVariant}
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
            <LoadingButton
              fullWidth
              size={btnSize}
              variant="contained"
              type="submit"
              loading={studentFeeAdding}
            >
              Submit
            </LoadingButton>
          </Grid2>
        </Grid2>
      </form>
    </Container>
  );
};

export default CreateStudentFee;

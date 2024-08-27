import { Container, Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import config from 'src/config';
import useIsAuth from 'src/libs/query/isAuth/useIsAuth';
import useGetStudentFeesById from 'src/libs/query/student-fee/useGetSudentFeesById';
import { fDate } from 'src/utils/format-time';

function SubmittedFees() {
  const user = useIsAuth()?.data?.data;
  const { data: studentFee } = useGetStudentFeesById({ id: user?._id });
  return (
    <Container>
      <Helmet>
        <title>Submitted Fees | {config.appName}</title>
      </Helmet>
      <h1 style={{ marginBottom: 20 }}>Submitted Fees</h1>

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
                {fee.collectedBy?.firstName + ' (' + fee.collectedBy.ifastId + ')'}
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </TableContainer>
    </Container>
  );
}

export default SubmittedFees;

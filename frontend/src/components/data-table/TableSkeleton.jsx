import React from 'react';
import { TableCell, TableRow, Skeleton } from '@mui/material';

function TableSkeleton({ pageSize, columnNo }) {
  const rows = Array.from({ length: pageSize }, (_, rowIndex) => (
    <TableRow key={rowIndex}>
      {Array.from({ length: columnNo }, (_, colIndex) => (
        <TableCell key={colIndex}>
          <Skeleton variant="rectangular" width="100%" height={30} />
        </TableCell>
      ))}
    </TableRow>
  ));

  return rows;
}

export default TableSkeleton;

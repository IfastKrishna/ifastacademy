import React from 'react';
import {
  Box,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
} from '@tanstack/react-table';
import RowPerPage from './RowPerPage';
import TableSkeleton from './TableSkeleton';

function DataTable({
  loading = false,
  columnDef,
  rows = [],
  total,
  page,
  height,
  pageSize,
  setPage = () => {},
  setPageSize = () => {},
  containerStyle = {},
  stickyHeader = false,
  topContent = null,
  bottomContent = null,
}) {
  const [sorting, setSorting] = React.useState([]);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  const tableInstance = useReactTable({
    columns: columnDef,
    data: rows,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting: sorting,
    },
    onSortingChange: setSorting,
  });

  return (
    <Box component={Paper} sx={{ p: '10px 0' }}>
      <Box
        sx={{
          p: '0 0 10px 10px',
        }}
      >
        {topContent}
      </Box>
      <TableContainer sx={{ height: height }} style={containerStyle}>
        <Table stickyHeader={stickyHeader}>
          <TableHead>
            {tableInstance.getHeaderGroups().map((headerEl) => (
              <TableRow key={headerEl.id}>
                {headerEl.headers.map((columnEl) => (
                  <TableCell
                    key={columnEl.id}
                    colSpan={columnEl.colSpan}
                    onClick={columnEl.column.getToggleSortingHandler()}
                  >
                    <Typography
                      component="div"
                      sx={{ cursor: 'pointer' }}
                      style={{
                        width: `${columnEl.column.getSize()}px`,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {flexRender(columnEl.column.columnDef.header, columnEl.getContext())}
                      {{ asc: ' ⬆', desc: ' ⬇' }[columnEl.column.getIsSorted() ?? null]}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {loading ? (
              <TableSkeleton pageSize={pageSize} columnNo={columnDef?.length} />
            ) : (
              tableInstance.getRowModel().rows.map((rowEl) => (
                <TableRow key={rowEl.id}>
                  {rowEl.getVisibleCells().map((cellEl) => (
                    <TableCell key={cellEl.id} colSpan={cellEl.colSpan}>
                      {
                        <Typography
                          component="div"
                          style={{
                            whiteSpace: 'nowrap',
                            width: cellEl.column.getSize(),
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {flexRender(cellEl.column.columnDef.cell, cellEl.getContext())}
                        </Typography>
                      }
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: 'flex',
          gap: '20px',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: '0 10px',
        }}
      >
        <RowPerPage setPageSize={setPageSize} pageSize={pageSize} />
        <Pagination
          showFirstButton
          showLastButton
          count={Math.ceil(total / pageSize) || 1}
          variant="outlined"
          color="primary"
          page={page}
          sx={{ m: '10px 0' }}
          onChange={(e, page) => setPage(page)}
          size={isSmall ? 'small' : 'medium'}
        />
      </Box>
      {bottomContent}
    </Box>
  );
}

export default DataTable;

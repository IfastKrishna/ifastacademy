import { Chip, Container, Tooltip, Box, Button, Paper, Typography } from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import { Delete } from '@mui/icons-material';
import Iconify from 'src/components/iconify';
import config from 'src/config';
import useGetCourseEnquires from 'src/libs/query/course-enquire/useGetCourseEnquiers';
import { fDate } from 'src/utils/format-time';
import useUpdateEnquireStatus from 'src/libs/mutation/course-enquire/useUpdateEnquireStatus';
import { ConfirmationModal } from 'src/components/confirmation-model';
import useDisclosure from 'src/hooks/use-disclosure';
import useDeleteEnquire from 'src/libs/mutation/course-enquire/useDeleteEnquire';
import { usePathname } from 'src/routes/hooks';
import { useSearch } from 'src/context/NavSerch';

function CourseEnquireView() {
  const [paginationModel, setPaginationModel] = React.useState({ page: 0, pageSize: 5 });
  const [enquireId, setEnquireId] = React.useState(null);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const { searchValue } = useSearch();
  const pathname = usePathname();
  const { isOpen: deleteModeOn, open: onDeleteOpen, close: onDeleteClose } = useDisclosure();

  const { data, isLoading, isSuccess } = useGetCourseEnquires({
    page: paginationModel.page + 1,
    pageSize: paginationModel.pageSize,
    search: searchValue[pathname],
  });

  const { mutate: updateStatus } = useUpdateEnquireStatus();

  const {
    mutate: onDeleteEnquire,
    isPending: deleingEnquire,
    isSuccess: deletedEnquire,
  } = useDeleteEnquire();

  React.useEffect(() => {
    if (deletedEnquire) {
      onDeleteClose();
      setEnquireId(null);
    }
  }, [deletedEnquire]);

  const columns = [
    {
      field: 'fullName',
      headerName: 'Full Name',
      valueGetter: (params, row) => `${row?.firstName || ''} ${row?.lastName || ''}`,
    },
    {
      field: 'email',
      headerName: 'Email',
      valueGetter: (params, row) => row?.email || '',
    },
    {
      field: 'phoneNo',
      headerName: 'Mobile No',
      width: 120,
      valueGetter: (params, row) => row?.phoneNo || '',
    },
    {
      field: 'gender',
      headerName: 'Gender',
      width: 70,
      valueGetter: (params, row) => row?.gender || '',
    },
    {
      field: 'address',
      headerName: 'Address',
      width: 200,
      valueGetter: (params, row) =>
        `${row?.address?.streetAddress || ''}, ${row?.address?.city || ''}, ${
          row?.address?.postalCode || ''
        }, ${row?.address?.state || ''}, ${row?.address?.country || ''}`,
    },
    {
      field: 'courseInterest',
      headerName: 'Course Interest',
      width: 200,
      valueGetter: (params, row) => row?.courseInterest?.map((course) => course?.name).join(', '),
    },
    {
      field: 'enquireDate',
      headerName: 'Enquire Date',
      width: 150,
      valueGetter: (params, row) => fDate(row?.enquireDate),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          size="small"
          label={params.value}
          color={params.value === 'pending' ? 'warning' : 'error'}
        />
      ),
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 150,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Delete />}
          label="Delete"
          onClick={() => {
            setEnquireId(params.row._id);
            onDeleteOpen();
          }}
        />,
        <GridActionsCellItem
          icon={<Iconify icon="eva:edit-fill" width={20} />}
          disabled={params.row?.status === 'completed'}
          label="Edit"
          showInMenu
        />,
        <GridActionsCellItem
          icon={<Iconify icon="eva:eye-outline" width={20} />}
          label="View"
          showInMenu
        />,
      ],
    },
  ];

  const handleDeleteSelectedRows = () => {
    onDeleteEnquire(selectedRows);
    setSelectedRows([]);
  };

  return (
    <Container>
      <Helmet>
        <title>Course Enquire View | {config?.appName}</title>
      </Helmet>
      <ConfirmationModal
        confirmationTitle="Delete Enquire"
        confirmationMessage="Are you sure you want to delete this enquire?"
        open={deleteModeOn}
        onClose={onDeleteClose}
        confirming={deleingEnquire}
        onConfirm={() => {
          onDeleteEnquire([enquireId]);
        }}
      />
      <Typography variant="h4" sx={{ mb: 2 }}>
        Course Enquires
      </Typography>
      <Paper
        elevation={3}
        sx={{
          height: 'calc(100vh - 200px)',
          width: '100%',
        }}
      >
        <DataGrid
          keepNonExistentRowsSelected
          columns={columns}
          rows={data?.data || []}
          loading={isLoading}
          getRowId={(row) => row._id}
          rowCount={data?.count || 0}
          pageSizeOptions={[5, 10, 20, 30]}
          disableSelectionOnClick
          paginationMode="server"
          checkboxSelection
          paginationModel={paginationModel}
          onPaginationModelChange={({ page, pageSize }) => setPaginationModel({ page, pageSize })}
          onRowSelectionModelChange={setSelectedRows}
          slots={{
            toolbar: () => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', p: 2 }}>
                <GridToolbar />
                {selectedRows.length > 0 && (
                  <Button color="error" startIcon={<Delete />} onClick={handleDeleteSelectedRows}>
                    Delete Selected Rows
                  </Button>
                )}
              </Box>
            ),
          }}
          slotProps={{
            toolbar: {
              sx: {
                display: 'flex',
                justifyContent: 'space-between',
                p: 2,
              },
            },
            columnHeaders: {
              sx: {
                color: 'primary.main',
              },
            },
          }}
        />
      </Paper>
    </Container>
  );
}

export default CourseEnquireView;

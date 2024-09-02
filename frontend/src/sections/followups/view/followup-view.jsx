import { Box, Chip, Container, Paper, Toolbar, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import { useSearch } from 'src/context/NavSerch';
import { usePathname, useRouter } from 'src/routes/hooks';
import useGetFollowups from 'src/libs/query/followup/useGetFollowups';
import config from 'src/config';
import useDeleteFollowup from 'src/libs/mutation/followup/useDeleteFollouwp';
import { fDate } from 'src/utils/format-time';
import { ConfirmationModal } from 'src/components/confirmation-model';
import useDisclosure from 'src/hooks/use-disclosure';
import { Delete } from '@mui/icons-material';
import Iconify from 'src/components/iconify';

function FollowupView() {
  const [paginationModel, setPaginationModel] = React.useState({ page: 1, pageSize: 5 });
  const [rowId, setRowId] = React.useState(null);
  const { searchValue } = useSearch();
  const pathname = usePathname();
  const router = useRouter();

  const { data, isLoading, isSuccess } = useGetFollowups({
    page: paginationModel.page,
    pageSize: paginationModel.pageSize,
    search: searchValue[pathname],
  });

  const {
    mutate: deleteFollowup,
    isPending: deletingFollowup,
    isSuccess: deletedFollowup,
  } = useDeleteFollowup();

  const {
    isOpen: openConfirmBox,
    open: onOpenConfirmBox,
    close: onCloseConfirmBox,
  } = useDisclosure();

  React.useEffect(() => {
    if (deletedFollowup) {
      onCloseConfirmBox();
    }
  }, [deletedFollowup]);

  const columns = [
    {
      field: 'fullName',
      headerName: 'Full Name',
      width: 150,
      valueGetter: (params, row) =>
        `${row.leadDetails?.firstName || ''} ${row.leadDetails?.lastName || ''}`,
    },
    {
      field: 'contactNo',
      headerName: 'Contact No',
      width: 130,
      valueGetter: (params, row) =>
        `${row.leadDetails?.phoneNo || row.leadDetails?.mobileNo || ''}`,
    },
    {
      field: 'assignedToName',
      headerName: 'Assigned To',
      width: 150,
      valueGetter: (params, row) =>
        `${row.assignedTo?.firstName || ''} ${row.assignedTo?.lastName || ''}`,
    },
    {
      field: 'assignedToPhone',
      headerName: 'Assigned To (Phone No)',
      width: 150,
      valueGetter: (params, row) => row.assignedTo?.phoneNo || '',
    },
    {
      field: 'followupDetails',
      headerName: 'Followup Details',
      valueGetter: (params, row) => row.followupDetails || '',
    },
    {
      field: 'notes',
      headerName: 'Notes',
      valueGetter: (params, row) => row.notes || '',
    },
    {
      field: 'dueDate',
      headerName: 'Due Date',
      width: 130,
      valueGetter: (params, row) => fDate(row.dueDate),
    },
    {
      field: 'status',
      headerName: 'Status',
      renderCell: (params) => (
        <Chip
          size="small"
          color={
            params.value === 'pending'
              ? 'warning'
              : params.value === 'completed'
              ? 'success'
              : 'error'
          }
          label={params.value}
        />
      ),
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Delete />}
          label="Delete"
          onClick={() => {
            setRowId(params?.row?._id);
            onOpenConfirmBox();
          }}
        />,

        <GridActionsCellItem
          icon={<Iconify icon="eva:edit-fill" width={20} />}
          disabled={params?.row?.status === 'completed'}
          label="Edit"
          showInMenu
          onClick={() => router?.push(`/followup/edit/${params?.row?._id}`)}
        />,
        <GridActionsCellItem
          icon={<Iconify icon="eva:eye-outline" width={20} />}
          label="View"
          showInMenu
          onClick={() => router?.push(`/followup/view/${params?.row?._id}`)}
        />,
      ],
    },
  ];

  return (
    <Container>
      <Helmet>
        <title>Followup View | {config?.appName}</title>
      </Helmet>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Followups
      </Typography>
      <ConfirmationModal
        confirmationTitle="Delete Followup"
        confirmationDescription="Are you sure you want to delete this followup?"
        confirming={deletingFollowup}
        open={openConfirmBox}
        onClose={onCloseConfirmBox}
        onConfirm={() => {
          deleteFollowup([rowId]);
        }}
      />
      <Paper
        elevation={3}
        sx={{
          height: 'calc(100vh - 200px)',
          width: '100%',
        }}
      >
        <DataGrid
          columns={columns}
          rows={data?.data || []}
          loading={isLoading}
          getRowId={(row) => row._id}
          rowCount={data?.count || 0}
          pageSizeOptions={[5, 10, 20, 30]}
          disableSelectionOnClick
          paginationMode="server"
          checkboxSelection
          paginationModel={{ page: paginationModel.page - 1, pageSize: paginationModel.pageSize }}
          onPaginationModelChange={({ page, pageSize }) =>
            setPaginationModel({ page: page + 1, pageSize })
          }
          slots={{
            toolbar: GridToolbar,
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
          onRowSelectionModelChange={(params) => {
            // console.log(params);
          }}
        />
      </Paper>
    </Container>
  );
}

export default FollowupView;

import React from 'react';
import { Button, Chip, Container, Paper } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from '@mui/x-data-grid';
import { Add, CalendarMonth, Delete, Paid } from '@mui/icons-material';
import useGetBatches from 'src/libs/query/master/batch-class/useGetBatches';
import useDisclosure from 'src/hooks/use-disclosure';
import { fDate } from 'src/utils/format-time';
import useDeleteBatch from 'src/libs/mutation/master/batch-class/useDeleteBatchClass';
import config from 'src/config';
import { BreadcrumbsGen } from 'src/components/navigation-breadcumbs';
import { useSearch } from 'src/context/NavSerch';
import { usePathname, useRouter } from 'src/routes/hooks';
import { ConfirmationModal } from 'src/components/confirmation-model';
import Iconify from 'src/components/iconify';

function ClassView() {
  const { searchValue } = useSearch();
  const pathname = usePathname();
  const router = useRouter();
  const [classId, setClassId] = React.useState(null);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [paginationModel, setPaginationModel] = React.useState({ page: 0, pageSize: 5 });

  const { data, isLoading } = useGetBatches({
    search: searchValue[pathname],
    pageSize: paginationModel.pageSize,
    page: paginationModel.page,
  });

  const {
    mutate: deleteBatch,
    isPending: deletingBatch,
    isSuccess: batchDeleted,
  } = useDeleteBatch();

  const { isOpen, open, close } = useDisclosure();

  React.useEffect(() => {
    if (batchDeleted) {
      setClassId(null);
      close();
    }
  }, [batchDeleted, close]);

  const confirmDelete = () => {
    deleteBatch([classId]);
  };

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      width: 100,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 200,
    },
    {
      field: 'courseName',
      headerName: 'Course Name',
      width: 200,
      valueGetter: (params, row) => row?.course?.name,
    },
    {
      field: 'courseDuration',
      headerName: 'Course Duration',
      width: 120,
      valueGetter: (params, row) => row?.course?.duration,
    },
    {
      field: 'courseStartDate',
      headerName: 'Course Start Date',
      width: 120,
      valueGetter: (params, row) => fDate(row?.course?.startDate),
    },
    {
      field: 'courseEndDate',
      headerName: 'Course Level',
      width: 120,
      valueGetter: (params, row) => row?.course?.level,
    },
    {
      field: 'courseStatus',
      headerName: 'Course Status',
      width: 120,
      renderCell: (params) =>
        params.row?.course?.isActive ? (
          <Chip label="Active" color="success" />
        ) : (
          <Chip label="Inactive" color="error" />
        ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Delete />}
          label="Delete"
          onClick={() => {
            setClassId(params.row?._id);
            open();
          }}
        />,
        <GridActionsCellItem
          icon={<Iconify icon="eva:edit-fill" width={20} />}
          disabled={params.row?.status === 'completed'}
          label="Edit"
          showInMenu
          onClick={() => router.push(`/masters-batch/edit/${params.row._id}`)}
        />,
        <GridActionsCellItem
          icon={<Iconify icon="eva:eye-outline" width={20} />}
          label="View"
          showInMenu
          onClick={() => router.push(`/masters-batch/view/${params.row._id}`)}
        />,
      ],
    },
  ];

  const handleDeleteSelectedRows = () => {
    deleteBatch(selectedRows);
  };

  return (
    <Container>
      <Helmet>
        <title>Class/Batch View | {config?.appName}</title>
      </Helmet>
      <BreadcrumbsGen
        menus={[
          { title: 'Master', url: 'masters' },
          { title: 'Class/Batch', url: 'masters-batch/all' },
        ]}
      />

      <ConfirmationModal
        confirmationTitle="Delete Batch"
        confirmationDescription="Are you sure you want to delete this batch?"
        open={isOpen}
        onClose={close}
        confirming={deletingBatch}
        onConfirm={confirmDelete}
      />

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
              <GridToolbarContainer sx={{ p: 2 }}>
                <GridToolbarDensitySelector />
                <GridToolbarColumnsButton />
                <GridToolbarExport />
                <Button startIcon={<Add />} onClick={() => router.push('/masters-batch/create')}>
                  Add
                </Button>
                <Button
                  startIcon={<CalendarMonth />}
                  onClick={() => router.push('/batch-wise/attendance')}
                >
                  BatchAttendance
                </Button>
                <Button startIcon={<Paid />} onClick={() => router.push('/batch-wise/fee')}>
                  BatchFee
                </Button>

                {selectedRows.length > 0 && (
                  <Button color="error" startIcon={<Delete />} onClick={handleDeleteSelectedRows}>
                    Delete Selected Rows
                  </Button>
                )}
              </GridToolbarContainer>
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

export default ClassView;

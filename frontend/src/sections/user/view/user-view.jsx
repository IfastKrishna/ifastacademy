import React from 'react';
import useGetUsers from 'src/libs/query/user/useGetUsers';
import { useSearch } from 'src/context/NavSerch';
import { Avatar, Box, Button, Chip, Container, Paper, Typography } from '@mui/material';
import { usePathname, useRouter } from 'src/routes/hooks';
import { Helmet } from 'react-helmet-async';
import config from 'src/config';
import useUserBlockUnblock from 'src/libs/mutation/user/useUserBlockUnblock';
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';
import { Add, DoNotDisturbOn, CheckCircleOutline, Block } from '@mui/icons-material';

function UserView() {
  const { searchValue } = useSearch();
  const pathname = usePathname();
  const router = useRouter();
  const [paginationModel, setPaginationModel] = React.useState({ page: 1, pageSize: 10 });
  const { mutate: update } = useUserBlockUnblock();
  const { data, isPending, isSuccess } = useGetUsers({
    page: paginationModel.page,
    pageSize: paginationModel.pageSize,
    search: searchValue[pathname],
  });

  const columns = [
    {
      field: 'avatar',
      headerName: 'Avatar',
      renderCell: (params) => <Avatar src={params.value} alt="Avatar" />,
      width: 50,
    },
    {
      field: 'ifastId',
      headerName: 'User ID',
      width: 150,
    },
    {
      field: 'fullName',
      valueGetter: (params, row) => row?.firstName + ' ' + row?.lastName,
      headerName: 'Full Name',
      width: 150,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
    },
    {
      field: 'phoneNo',
      headerName: 'Phone No',
      width: 150,
    },
    {
      field: 'role',
      headerName: 'Role',
      renderCell: (params) => <Chip size="small" label={params.value} />,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      getActions: (params) => [
        <GridActionsCellItem
          icon={params.row.status ? <Block /> : <CheckCircleOutline />}
          label={params.row.status ? 'Block' : 'Unblock'}
          onClick={() => update(params.row._id)}
        />,
      ],
      flex: 0.5,
    },
  ];

  return (
    <Container>
      <Helmet>
        <title>User View | {config?.appName}</title>
      </Helmet>

      <Typography variant="h4" sx={{ mb: 2 }}>
        Users
      </Typography>
      <Paper
        elevation={3}
        sx={{
          height: 'calc(100vh - 200px)',
          width: '100%',
        }}
      >
        <DataGrid
          columns={columns}
          rows={data?.data}
          loading={isPending}
          pageSizeOptions={[5, 10, 20, 50, 100]}
          paginationMode="server"
          getRowId={(row) => row._id}
          rowCount={data?.totalCount || 0}
          paginationModel={{ page: paginationModel.page - 1, pageSize: paginationModel.pageSize }}
          onPaginationModelChange={({ page, pageSize }) =>
            setPaginationModel({ page: page + 1, pageSize })
          }
          slots={{
            toolbar: () => (
              <GridToolbarContainer sx={{ py: 2 }}>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
                <GridToolbarExport />
                <Button
                  sx={{ padding: 0.5 }}
                  startIcon={<Add />}
                  onClick={() => router.push('/user/create')}
                >
                  Add
                </Button>
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

export default UserView;

import { Chip, Container, Tooltip } from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { DataTable } from 'src/components/data-table';
import { useSearch } from 'src/context/NavSerch';
import { usePathname } from 'src/routes/hooks';
import TopContent from './top-content';
import useGetFollowups from 'src/libs/query/followup/useGetFollowups';
import config from 'src/config';
import useDeleteFollowup from 'src/libs/mutation/followup/useDeleteFollouwp';
import { fDate } from 'src/utils/format-time';
import ActionMenu from 'src/components/data-table/ActionMenu';
import { ConfirmationModal } from 'src/components/confirmation-model';
import useDisclosure from 'src/hooks/use-disclosure';

function FollowupView() {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5);
  const [rowId, setRowId] = React.useState(null);
  const { searchValue } = useSearch();
  const pathname = usePathname();

  const { data, isLoading, isSuccess } = useGetFollowups({
    page,
    pageSize,
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

  const menus = (row, router) => {
    return [
      {
        itemText: 'View',
        icon: 'eva:eye-outline',
        onClick: () => router?.push(`/followup/view/${row?._id}`),
      },
      {
        itemText: 'Edit',
        disabled: row?.status === 'completed',
        icon: 'eva:edit-fill',
        onClick: () => router?.push(`/followup/edit/${row?._id}`),
      },
      {
        itemText: 'Delete',
        color: 'error.main',
        icon: 'eva:trash-2-outline',
        onClick: () => {
          setRowId(row?._id);
          onOpenConfirmBox();
        },
      },
    ];
  };

  const columnDef = [
    {
      accessorFn: (row) => `${row?.leadDetails?.firstName} ${row?.leadDetails?.lastName}`,
      header: 'Full Name',
      size: 100,
    },
    {
      accessorFn: (row) => `${row?.leadDetails?.phoneNo || row?.leadDetails?.mobileNo}`,
      header: 'Contact No',
      size: 100,
    },
    {
      accessorFn: (row) => `${row?.assignedTo?.firstName} ${row?.assignedTo?.lastName}`,
      header: 'Assigned To',
      size: 120,
    },

    {
      accessorFn: (row) => row?.assignedTo?.phoneNo,
      header: 'Assigned To (Phone No)',
      size: 100,
    },
    {
      cell: ({ row }) => (
        <Tooltip placement="top" title={row.original?.followupDetails}>
          {row.original?.followupDetails}
        </Tooltip>
      ),
      header: 'Followup Details',
      size: 200,
    },
    {
      cell: ({ row }) => (
        <Tooltip placement="top" title={row.original?.notes}>
          {row.original?.notes}
        </Tooltip>
      ),
      header: 'Notes',
    },
    {
      accessorFn: (row) => `${fDate(row?.dueDate)}`,
      header: 'Due Date',
      size: 100,
    },
    {
      cell: ({ row: { original } }) => (
        <Chip
          size="small"
          color={
            original?.status === 'pending'
              ? 'warning'
              : original?.status === 'completed'
              ? 'success'
              : 'error'
          }
          label={original?.status}
        />
      ),
      header: 'Status',
      size: 100,
    },

    {
      header: 'Action',
      cell: ({ row: { original } }) => <ActionMenu menus={menus} row={original} />,
      size: 50,
    },
  ];

  return (
    <Container>
      <Helmet>
        <title>Followup View | {config?.appName}</title>
      </Helmet>
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
      <DataTable
        columnDef={columnDef}
        topContent={<TopContent />}
        rows={data?.data}
        loading={isLoading}
        page={page}
        pageSize={pageSize}
        height={'55vh'}
        setPage={setPage}
        setPageSize={setPageSize}
        total={data?.count}
        stickyHeader
      />
    </Container>
  );
}

export default FollowupView;

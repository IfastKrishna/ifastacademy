import { Container } from '@mui/material';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { DataTable } from 'src/components/data-table';
import TopContent from './top-content';
import { useSearch } from 'src/context/NavSerch';
import { usePathname } from 'src/routes/hooks';
import useGetFollowupModes from 'src/libs/query/master/followup-mode/useGetFollowupModes';
import useDisclosure from 'src/hooks/use-disclosure';
import { ConfirmationModal } from 'src/components/confirmation-model';
import useDeleteFollowupMode from 'src/libs/mutation/master/followup-mode/useDeleteFollowupMode';
import ActionMenu from 'src/components/data-table/ActionMenu';
import config from 'src/config';

function FeeCategoryView() {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5);
  const [followupModeId, setFollowupModeId] = React.useState(null);
  const { searchValue } = useSearch();
  const pathname = usePathname();
  const { data, isLoading } = useGetFollowupModes({
    page,
    pageSize,
    search: searchValue[pathname],
  });
  const { mutate: onDelete, isPending, isSuccess } = useDeleteFollowupMode();
  const { isOpen: deleteModal, open: onDeleteOpen, close: onDeleteClose } = useDisclosure();

  useEffect(() => {
    if (isSuccess) {
      onDeleteClose();
    }
  }, [isSuccess]);

  const handleDeleteHandler = () => {
    onDelete(followupModeId);
  };

  const menus = (row, router) => {
    return [
      {
        itemText: 'View',
        icon: 'eva:eye-outline',
        onClick: () => router?.push(`/masters-followup-mode/view/${row?._id}`),
      },
      {
        itemText: 'Edit',
        icon: 'eva:edit-fill',
        onClick: () => router?.push(`/masters-followup-mode/edit/${row?._id}`),
      },
      {
        itemText: 'Delete',
        color: 'error.main',
        icon: 'eva:trash-2-outline',
        onClick: () => {
          setFollowupModeId(row?._id);
          onDeleteOpen();
        },
      },
    ];
  };

  const columnDef = [
    {
      accessorKey: 'followupMode',
      header: 'Followup Mode',
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
        <title>Followup Mode | {config?.appName}</title>
      </Helmet>

      <ConfirmationModal
        confirmationTitle="Delete Followup Mode"
        confirmationMessage="Are you sure you want to delete this Followup Mode?"
        open={deleteModal}
        onClose={onDeleteClose}
        onConfirm={handleDeleteHandler}
        confirming={isPending}
      />

      <DataTable
        rows={data?.data}
        columnDef={columnDef}
        total={data?.count}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        topContent={<TopContent />}
        loading={isLoading}
        stickyHeader
        height={'60vh'}
      />
    </Container>
  );
}

export default FeeCategoryView;

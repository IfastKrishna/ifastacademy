import { Container } from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { DataTable } from 'src/components/data-table';
import TopContent from './top-content';
import { useSearch } from 'src/context/NavSerch';
import { usePathname } from 'src/routes/hooks';
import useGetFeeCategories from 'src/libs/query/master/fee-categories/useGetFeeCategories';
import { createColumnHelper } from '@tanstack/react-table';
import ActionMenu from 'src/components/data-table/ActionMenu';
import { ConfirmationModal } from 'src/components/confirmation-model';
import useDisclosure from 'src/hooks/use-disclosure';
import useDeleteFeeCategories from 'src/libs/mutation/master/fee-category/useDeleteFeeCategories';

function FeeCategoryView() {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5);
  const [deleteId, setDeleteId] = React.useState(null);
  const { searchValue } = useSearch();
  const pathname = usePathname();
  const { data, isLoading } = useGetFeeCategories({
    page,
    pageSize,
    search: searchValue[pathname],
  });

  const { mutate: deleteFeeCategories, isPending, isSuccess } = useDeleteFeeCategories();

  const {
    isOpen: isOpenDeleteModal,
    open: openDeleteModal,
    close: closeDeleteModal,
  } = useDisclosure();

  const columnHelper = createColumnHelper();

  const handlerConfirmDelete = () => {
    deleteFeeCategories(deleteId);
  };

  React.useEffect(() => {
    if (isSuccess) {
      closeDeleteModal();
    }
  }, [isSuccess]);

  const menus = (row, router) => {
    return [
      {
        itemText: 'View',
        icon: 'eva:eye-outline',
        onClick: () => router?.push(`/masters-fee-category/view/${row?._id}`),
      },
      {
        itemText: 'Edit',
        icon: 'eva:edit-fill',
        onClick: () => router?.push(`/masters-fee-category/edit/${row?._id}`),
      },

      {
        itemText: 'Delete',
        color: 'error.main',
        icon: 'eva:trash-2-outline',
        onClick: () => {
          openDeleteModal();
          setDeleteId(row?._id);
        },
      },
    ];
  };

  const columnDef = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    columnHelper.accessor('description', {
      header: 'Description',
    }),
    {
      accessorKey: 'amount',
      header: 'Amount',
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
        <title>Fee Categories View | IfastAcadeny</title>
      </Helmet>
      <ConfirmationModal
        open={isOpenDeleteModal}
        onClose={closeDeleteModal}
        confirmationTitle="Delete Fee Category"
        confirmationDescription="Are you sure you want to delete this Fee Category?"
        confirming={isPending}
        onConfirm={handlerConfirmDelete}
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

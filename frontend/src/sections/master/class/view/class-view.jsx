import { Chip, Container } from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { DataTable } from 'src/components/data-table';
import TopContent from './top-content';
import { useSearch } from 'src/context/NavSerch';
import { usePathname } from 'src/routes/hooks';
import useGetBatches from 'src/libs/query/master/batch-class/useGetBatches';
import useDisclosure from 'src/hooks/use-disclosure';
import ActionMenu from 'src/components/data-table/ActionMenu';
import { createColumnHelper } from '@tanstack/react-table';
import { BreadcrumbsGen } from 'src/components/navigation-breadcumbs';
import { fDate } from 'src/utils/format-time';
import { ConfirmationModal } from 'src/components/confirmation-model';
import useDeleteBatch from 'src/libs/mutation/master/batch-class/useDeleteBatchClass';

function ClassView() {
  const [classId, setClassId] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5);
  const { searchValue } = useSearch();
  const pathname = usePathname();
  const { data, isLoading } = useGetBatches({ search: searchValue[pathname], pageSize, page });
  const {
    mutate: deleteBatch,
    isPending: deletingBatch,
    isSuccess: batchDeleted,
  } = useDeleteBatch();

  const { isOpen, open, close } = useDisclosure();
  const columnHelper = createColumnHelper();

  React.useEffect(() => {
    if (batchDeleted) {
      setClassId(null);
      close();
    }
  }, [batchDeleted]);

  const confirmDelete = () => {
    deleteBatch([classId]);
  };

  const menus = (row, router) => {
    return [
      {
        itemText: 'View',
        icon: 'eva:eye-outline',
        onClick: () => router?.push(`/masters-batch/view/${row?._id}`),
      },
      {
        itemText: 'Attendance',
        icon: 'eva:clipboard-outline',
        onClick: () => router?.push(`/batch-attendance/take/${row?._id}`),
      },
      {
        itemText: 'Edit',
        icon: 'eva:edit-fill',
        onClick: () => router?.push(`/masters-batch/edit/${row?._id}`),
      },
      {
        itemText: 'Delete',
        color: 'error.main',
        icon: 'eva:trash-2-outline',
        onClick: () => {
          setClassId(row?._id);
          open();
        },
      },
    ];
  };

  const columnDef = [
    {
      accessorKey: 'name',
      header: 'Name',
      size: 100,
    },
    columnHelper.accessor('description', {
      header: 'Description',
      size: 200,
    }),
    {
      accessorFn: (row) => `${row?.course?.name}`,
      header: 'Course Name',
      size: 200,
    },
    {
      accessorFn: (row) => row?.course?.duration,
      header: 'Course Duration',
      size: 120,
    },
    {
      accessorFn: (row) => fDate(row?.course?.startDate),
      header: 'Course Start Date',
      size: 120,
    },
    {
      accessorFn: (row) => row?.course?.level,
      header: 'Course Level',
      size: 120,
    },
    {
      cell: ({ row: { original } }) =>
        original?.course?.isActive ? (
          <Chip label="Active" color="success" />
        ) : (
          <Chip label="Inactive" color="error" />
        ),
      header: 'Course Status',
      size: 120,
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
        <title>Class/Batch View | IfastAcadeny</title>
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

      <DataTable
        rows={data?.data}
        columnDef={columnDef}
        height={'65vh'}
        topContent={<TopContent />}
        setPage={setPage}
        page={page}
        total={data?.count}
        pageSize={pageSize}
        setPageSize={setPageSize}
        loading={isLoading}
      />
    </Container>
  );
}

export default ClassView;

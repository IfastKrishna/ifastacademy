import { Chip, Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { DataTable } from 'src/components/data-table';
import TopContent from './top-content';
import useGetCourses from 'src/libs/query/master/course/useGetCourses';
import { useSearch } from 'src/context/NavSerch';
import { usePathname } from 'src/routes/hooks';
import { createColumnHelper } from '@tanstack/react-table';
import ActionMenu from 'src/components/data-table/ActionMenu';
import { fDate } from 'src/utils/format-time';
import useDisclosure from 'src/hooks/use-disclosure';
import { ConfirmationModal } from 'src/components/confirmation-model';
import useDeleteCourse from 'src/libs/mutation/master/course/useDeleteCourse';
import config from 'src/config';

function CourseView() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selectedRow, setSelectedRow] = useState(null);
  const { searchValue } = useSearch();
  const pathname = usePathname();
  const { data, isLoading } = useGetCourses({ page, pageSize, search: searchValue[pathname] });
  const {
    mutate: handleDeleteCourse,
    isPending: deletingCourse,
    isSuccess: deletedCourse,
  } = useDeleteCourse();
  const { isOpen: isOpenDelete, open: openDelete, close: closeDelete } = useDisclosure();

  const columnHelper = createColumnHelper();

  useEffect(() => {
    if (deletedCourse) {
      closeDelete();
    }
  }, [deletedCourse]);

  const confirmDelete = (row) => {
    setSelectedRow(row);
    openDelete();
  };

  const handleConfirmDelete = () => {
    if (selectedRow) {
      handleDeleteCourse([selectedRow?._id]);
    }
  };

  const menus = (row, router) => [
    {
      itemText: 'View',
      icon: 'eva:eye-outline',
      onClick: () => router?.push(`/masters-course/view/${row?._id}`),
    },
    {
      itemText: 'Edit',
      icon: 'eva:edit-fill',
      onClick: () => router?.push(`/masters-course/edit/${row?._id}`),
    },
    {
      itemText: 'Delete',
      color: 'error.main',
      icon: 'eva:trash-2-outline',
      onClick: () => confirmDelete(row),
    },
  ];

  const columnDef = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    columnHelper.accessor('description', {
      header: 'Description',
      size: 200,
    }),
    {
      accessorFn: (row) => row?.duration,
      header: 'Course Duration',
      size: 120,
    },
    {
      accessorFn: (row) => fDate(row?.startDate),
      header: 'Course Start Date',
      size: 120,
    },
    {
      accessorFn: (row) => row?.level,
      header: 'Course Level',
      size: 120,
    },
    {
      cell: ({ row: { original } }) =>
        original?.isActive ? (
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
        <title>Course View | {config?.appName}</title>
      </Helmet>
      <ConfirmationModal
        confirmationTitle="Are you sure you want to delete this course?"
        confirmationDescription="This action cannot be undone. Deleting this course will remove all the data associated with this course."
        open={isOpenDelete}
        onClose={closeDelete}
        confirming={deletingCourse}
        onConfirm={handleConfirmDelete}
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

export default CourseView;

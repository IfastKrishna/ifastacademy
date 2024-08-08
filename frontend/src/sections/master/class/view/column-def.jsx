import { Chip } from '@mui/material';
import { createColumnHelper } from '@tanstack/react-table';
import React from 'react';
import ActionMenu from 'src/components/data-table/ActionMenu';
import { fData } from 'src/utils/format-number';
import { fDate } from 'src/utils/format-time';

const columnHelper = createColumnHelper();

const menus = (row, router) => {
  return [
    {
      itemText: 'View',
      icon: 'eva:eye-outline',
      onClick: () => router?.push(`/masters-batch/view/${row?._id}`),
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
        console.log('Delete', row?._id);
      },
    },
  ];
};

export const columnDef = [
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

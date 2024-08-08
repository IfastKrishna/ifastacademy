import { Avatar, Chip } from '@mui/material';
import { createColumnHelper } from '@tanstack/react-table';
import React from 'react';
import ActionMenu from 'src/components/data-table/ActionMenu';
import { fDate } from 'src/utils/format-time';

const columnHelper = createColumnHelper();

const menus = (row, router) => {
  return [
    {
      itemText: 'View',
      icon: 'eva:eye-outline',
      onClick: () => router?.push(`/followup/view/${row?._id}`),
    },
    {
      itemText: 'Edit',
      icon: 'eva:edit-fill',
      onClick: () => router?.push(`/followup/edit/${row?._id}`),
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
    accessorFn: (row) => `${'Web Development'}`,
    header: 'Interested Courses',
    size: 200,
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
    accessorKey: 'description',
    header: 'Description',
    size: 200,
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
            : original?.status === 'complete'
            ? 'success'
            : 'error'
        }
        label={original?.status}
      />
    ),
    header: 'Status',
    size: 70,
  },

  {
    header: 'Action',
    cell: ({ row: { original } }) => <ActionMenu menus={menus} row={original} />,
    size: 50,
  },
];

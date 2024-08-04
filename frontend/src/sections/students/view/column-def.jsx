import React from 'react';
import { Avatar } from '@mui/material';
import { createColumnHelper } from '@tanstack/react-table';
import ActionMenu from 'src/components/data-table/ActionMenu';
import { fDate } from 'src/utils/format-time';

const columnHelper = createColumnHelper();

const menus = (row, router) => {
  return [
    {
      itemText: 'View',
      icon: 'eva:eye-outline',
      onClick: () => router?.push(`/student/view/${row?._id}`),
    },
    {
      itemText: 'Edit',
      icon: 'eva:edit-fill',
      onClick: () => router?.push(`/student/edit/${row?._id}`),
    },
    {
      itemText: 'Delete',
      color: 'error.main',
      icon: 'eva:trash-2-outline',
      onClick: (row) => {},
    },
  ];
};

export const columnDef = [
  {
    accessorKey: 'avatar',
    cell: ({ getValue }) => <Avatar src={getValue()} alt="Avatar" />,
    size: 50,
  },
  {
    accessorFn: (row) => `${row?.firstName} ${row?.lastName}`,
    header: 'Full Name',
    size: 100,
  },
  columnHelper.accessor('email', {
    header: 'Email',
    size: 120,
  }),
  columnHelper.accessor('phoneNo', {
    header: 'Phone',
    size: 120,
  }),
  columnHelper.accessor((row) => fDate(row.dob), {
    header: 'DOB',
    size: 90,
  }),
  {
    accessorFn: (row) => row?.address?.streetAddress,
    header: 'Street Address',
    size: 120,
  },
  columnHelper.accessor((row) => row?.address?.city, {
    header: 'City',
    size: 120,
  }),
  {
    accessorFn: (row) => row?.address?.state,
    header: 'State',
    size: 100,
  },
  {
    header: 'Action',
    cell: ({ row: { original } }) => <ActionMenu menus={menus} row={original} />,
    size: 50,
  },
];

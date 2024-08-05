import { Avatar } from '@mui/material';
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
      onClick: () => router?.push(`/enquire/view/${row?._id}`),
    },
    {
      itemText: 'Edit',
      icon: 'eva:edit-fill',
      onClick: () => router?.push(`/enquire/edit/${row?._id}`),
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
    accessorFn: (row) => `${row?.firstName} ${row?.lastName}`,
    header: 'Full Name',
    size: 100,
  },
  columnHelper.accessor('email', {
    header: 'Email',
    size: 120,
  }),
  {
    accessorFn: (row) =>
      `${row?.address?.streetAddress} ${row?.address?.city} ${row?.address?.postalCode} ${row?.address?.state} ${row?.address?.country}`,
    header: 'Address',
    size: 200,
  },
  {
    accessorKey: 'mobileNo',
    header: 'Mobile No',
    size: 120,
  },
  {
    accessorKey: 'gender',
    header: 'Gender',
    size: 70,
  },
  {
    header: 'Action',
    cell: ({ row: { original } }) => <ActionMenu menus={menus} row={original} />,
    size: 50,
  },
];

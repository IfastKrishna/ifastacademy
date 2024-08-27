import React from 'react';
import { Avatar, Tooltip } from '@mui/material';
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
      itemText: 'New Followup',
      icon: 'eva:phone-fill',
      onClick: () => router?.push(`/followup/create/students/${row?._id}`),
    },
    {
      itemText: 'New Fee',
      icon: 'eva:credit-card-fill',
      onClick: () => router?.push(`/student-fee/create/${row?._id}`),
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
    accessorKey: 'ifastId',
    header: 'Student ID',
    size: 150,
  },
  {
    header: 'Full Name',
    size: 100,
    cell: ({ row }) => (
      <Tooltip placement="top" title={`${row.original.firstName} ${row.original.lastName}`}>
        <div>
          {row.original.firstName} {row.original.lastName}
        </div>
      </Tooltip>
    ),
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
    accessorFn: (row) => row?.enrolledBatch?.map((batch) => batch.name).join(', '),
    header: 'Batches',
    size: 150,
  },

  {
    header: 'Action',
    cell: ({ row: { original } }) => <ActionMenu menus={menus} row={original} />,
    size: 50,
  },
];

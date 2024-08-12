import React, { useEffect, useState } from 'react';
import TopContent from './top-content';
import { DataTable } from 'src/components/data-table';
import { useSearch } from 'src/context/NavSerch';
import { usePathname } from 'src/routes/hooks';
import { debounce, size } from 'lodash';
import { Avatar, Chip, Container } from '@mui/material';
import ActionMenu from 'src/components/data-table/ActionMenu';
import { Helmet } from 'react-helmet-async';
import useGetStudentFees from 'src/libs/query/student-fee/useGetStudentFees';
import { fDate } from 'src/utils/format-time';
import config from 'src/config';

function StudentFeesView() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const { serchValue } = useSearch();
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState(serchValue ? serchValue[pathname] : '');

  const { data, isLoading, error } = useGetStudentFees({
    page,
    pageSize,
    search: searchTerm,
  });

  useEffect(() => {
    if (serchValue) {
      const debouncedSearch = debounce(() => {
        setSearchTerm(serchValue[pathname] || '');
      }, 300);
      debouncedSearch();
      return () => {
        debouncedSearch.cancel();
      };
    }
  }, [serchValue, pathname]);

  const menus = (row, router) => {
    return [
      {
        itemText: 'Accept',
        icon: 'pepicons-pencil:checkmark-filled',
        onClick: () => {
          console.log('Accept', row?._id);
        },
      },
      {
        itemText: 'Reject',
        icon: 'pepicons-pencil:checkmark-filled-off',
        onClick: () => {
          console.log('Reject' + row?._id);
        },
      },
      {
        itemText: 'View',
        icon: 'pepicons-eye',
        onClick: () => {
          console.log('View', row?._id);
        },
      },
    ];
  };

  const columnDef = [
    {
      header: 'Avatar',
      cell: ({ row: { original } }) => <Avatar src={original?.studentId?.avatar} />,
      size: 50,
    },
    {
      accessorFn: (row) => `${row?.studentId?.firstName} ${row?.studentId?.lastName}`,
      header: 'Full Name',
      size: 100,
    },

    {
      accessorFn: (row) => row?.studentId?.ifastId,
      header: 'Student ID',
      size: 150,
    },
    {
      accessorFn: (row) => row?.batchId?.name,
      header: 'Batch',
      size: 150,
    },
    {
      accessorFn: (row) => row?.batchId?.course?.name,
      header: 'Course',
    },
    {
      accessorFn: (row) => row?.paymentReference,
      header: 'Receipt No',
      size: 100,
    },
    {
      accessorFn: (row) => fDate(row?.paymentDate),
      header: 'Payment Date',
    },
    {
      accessorFn: (row) => row?.paymentType?.name,
      header: 'Payment Type',
    },
    {
      accessorFn: (row) => row?.month,
      header: 'Month',
    },
    {
      accessorFn: (row) => row?.amount,
      header: 'Amount',
    },
    {
      accessorFn: (row) => row?.collectedBy?.firstName + ' ' + row?.collectedBy?.lastName,
      header: 'Collected By',
    },
    {
      header: 'Action',
      cell: ({ row: { original } }) => <ActionMenu menus={menus} row={original} />,
      size: 50,
    },
  ];

  if (error) {
    return <div>Error loading employees: {error.message}</div>;
  }

  return (
    <Container>
      <Helmet>
        <title>Employee | {config?.appName}</title>
      </Helmet>

      <DataTable
        columnDef={columnDef}
        page={page}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
        rows={data?.data}
        count={data?.count}
        topContent={<TopContent />}
        loading={isLoading}
        stickyHeader
        height="65vh"
      />
    </Container>
  );
}

export default StudentFeesView;

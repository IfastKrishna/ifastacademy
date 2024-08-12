import React, { useEffect, useState } from 'react';
import TopContent from './top-content';
import { DataTable } from 'src/components/data-table';
import { useSearch } from 'src/context/NavSerch';
import { usePathname } from 'src/routes/hooks';
import useGetEmployees from 'src/libs/query/employee/useGetEmployees';
import { debounce } from 'lodash';
import { createColumnHelper } from '@tanstack/react-table';
import { Avatar, Chip, Container } from '@mui/material';
import ActionMenu from 'src/components/data-table/ActionMenu';
import useDisclosure from 'src/hooks/use-disclosure';
import { Helmet } from 'react-helmet-async';
import { ConfirmationModal } from 'src/components/confirmation-model';
import useDeleteEmployee from 'src/libs/mutation/employee/useDeleteEmployee';
import config from 'src/config';

function EmployeeView() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const { serchValue } = useSearch();
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState(serchValue ? serchValue[pathname] : '');
  const [employeeId, setEmployeeId] = useState('');
  const columnHelper = createColumnHelper();

  const { data, isLoading, error } = useGetEmployees({
    page,
    pageSize,
    search: searchTerm,
  });
  const {
    mutate: deleteEmployee,
    isPending: deletingEmployee,
    isSuccess: deletedEmployee,
  } = useDeleteEmployee();

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

  useEffect(() => {
    if (deletedEmployee) {
      close();
      setEmployeeId('');
    }
  }, [deletedEmployee]);

  const { isOpen, close, open } = useDisclosure();

  const confirmDelete = () => {
    deleteEmployee([employeeId]);
  };

  const menus = (row, router) => {
    return [
      {
        itemText: 'View',
        icon: 'eva:eye-outline',
        onClick: () => router?.push(`/employee/view/${row?._id}`),
      },
      {
        itemText: 'Edit',
        icon: 'eva:edit-fill',
        onClick: () => router?.push(`/employee/edit/${row?._id}`),
      },
      {
        itemText: 'Delete',
        color: 'error.main',
        icon: 'eva:trash-2-outline',
        onClick: () => {
          setEmployeeId(row?._id);
          open();
        },
      },
    ];
  };

  const columnDef = [
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
    columnHelper.accessor('ifastId', {
      header: 'Staff ID',
      size: 120,
    }),

    {
      accessorFn: (row) => row?.address?.streetAddress,
      header: 'Street Address',
      size: 120,
    },
    {
      header: 'Job Title',
      cell: ({ row: { original } }) => <Chip size="small" label={original?.jobTitle} />,
      size: 70,
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
        <title>Staff | {config?.appName}</title>
      </Helmet>
      <ConfirmationModal
        open={isOpen}
        onClose={close}
        onConfirm={confirmDelete}
        confirming={deletingEmployee}
        confirmationDescription="Are you sure you want to delete this staff?"
        confirmationTitle="Delete Staff"
      />
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
        height="65vh"
      />
    </Container>
  );
}

export default EmployeeView;

import React, { useEffect, useState } from 'react';
import useGetStudent from 'src/libs/query/student/useGetStudent';

import { DataTable } from 'src/components/data-table';
import { createColumnHelper } from '@tanstack/react-table';
import { fDate } from 'src/utils/format-time';
import { Avatar } from '@mui/material';
import { useSearch } from 'src/context/NavSerch';

function StudentView() {
  const [students, setStudents] = useState([]);
  const { data, isLoading, isSuccess } = useGetStudent();
  const { serchValue } = useSearch();
  console.log(serchValue);

  useEffect(() => {
    if (isSuccess) {
      setStudents(data?.data || []);
    }
  }, [data, isSuccess]);

  const columnHelper = createColumnHelper();
  const columnDef = [
    {
      accessorKey: 'avatar',
      cell: ({ getValue }) => <Avatar src={getValue()} alt="Avatar" />,
      size: 50,
    }, // first way
    // {
    //   header: 'Full Name',
    //   // columns: [
    //   // { accessorKey: 'firstName', header: 'First Name', size: 150 }, // first way
    //   // columnHelper.accessor('lastName', { header: 'Last Name', size: 150 }), // second way
    //   // ],
    // },
    { accessorKey: 'firstName', header: 'First Name', size: 70 }, // first way
    columnHelper.accessor('lastName', { header: 'Last Name', size: 70 }), //
    columnHelper.accessor('email', { header: 'Email', size: 120 }),
    columnHelper.accessor('phoneNo', { header: 'Phone', size: 120 }),
    columnHelper.accessor((row) => fDate(row.dob), {
      header: 'DOB',
      size: 90,
    }),
    { accessorFn: (row) => row?.address?.streetAddress, header: 'Street Address', size: 120 }, // third way
    columnHelper.accessor((row) => row?.address?.city, { header: 'City', size: 120 }),
    { accessorFn: (row) => row?.address?.postalCode, header: 'Postal Code', size: 120 },
    { accessorFn: (row) => row?.address?.state, header: 'State', size: 120 },
  ];

  return (
    <>
      <h3>Students</h3>
      <DataTable columnDef={columnDef} rows={students} />
    </>
  );
}

export default StudentView;

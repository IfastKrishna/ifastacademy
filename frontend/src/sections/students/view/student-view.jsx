import React, { useEffect, useState } from 'react';
import useGetStudent from 'src/libs/query/student/useGetStudent';
import TopContent from './top-content';
import { DataTable } from 'src/components/data-table';
import { useSearch } from 'src/context/NavSerch';
import { columnDef } from './column-def';

function StudentView() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [students, setStudents] = useState([]);
  const { data, isLoading, isSuccess } = useGetStudent();
  const { serchValue } = useSearch();

  useEffect(() => {
    if (isSuccess) {
      setStudents(data?.data || []);
    }
  }, [data, isSuccess]);

  return (
    <>
      <DataTable
        columnDef={columnDef}
        page={page}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
        rows={students}
        count={data?.count}
        topContent={<TopContent />}
        loading={isLoading}
        height="65vh"
      />
    </>
  );
}

export default StudentView;

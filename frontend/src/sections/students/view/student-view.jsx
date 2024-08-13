import React, { useEffect, useState } from 'react';
import TopContent from './top-content';
import { usePathname } from 'src/routes/hooks';
import useGetStudents from 'src/libs/query/student/useGetStudents';
import { useSearch } from 'src/context/NavSerch';
import { columnDef } from './column-def';
import { DataTable } from 'src/components/data-table';
import { Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import config from 'src/config';

function StudentView() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [students, setStudents] = useState([]);
  const { searchValue } = useSearch();
  const pathname = usePathname();
  const { data, isLoading, isSuccess } = useGetStudents({
    page,
    pageSize,
    search: searchValue[pathname] || '',
  });

  useEffect(() => {
    if (isSuccess) {
      setStudents(data?.data || []);
    }
  }, [data, isSuccess]);

  return (
    <Container>
      <Helmet>
        <title>Student View | {config?.appName}</title>
      </Helmet>
      <DataTable
        columnDef={columnDef}
        rows={students}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        total={data?.count}
        topContent={<TopContent />}
        loading={isLoading}
        stickyHeader
        height="65vh"
      />
    </Container>
  );
}

export default StudentView;

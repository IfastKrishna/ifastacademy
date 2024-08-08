import { Container } from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { DataTable } from 'src/components/data-table';
import TopContent from './top-content';
import { useSearch } from 'src/context/NavSerch';
import { usePathname } from 'src/routes/hooks';
import useGetBatches from 'src/libs/query/master/batch-class/useGetBatches';
import { columnDef } from './column-def';

function ClassView() {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5);
  const { searchValue } = useSearch();
  const pathname = usePathname();
  const { data, isLoading } = useGetBatches({ search: searchValue[pathname], pageSize, page });

  return (
    <Container>
      <Helmet>
        <title>Class/Batch View | IfastAcadeny</title>
      </Helmet>
      <DataTable
        rows={data?.data}
        columnDef={columnDef}
        height={'65vh'}
        topContent={<TopContent />}
        setPage={setPage}
        page={page}
        total={data?.count}
        pageSize={pageSize}
        setPageSize={setPageSize}
        loading={isLoading}
      />
    </Container>
  );
}

export default ClassView;

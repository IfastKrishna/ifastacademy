import { Container } from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { DataTable } from 'src/components/data-table';
import TopContent from './top-content';
import { useSearch } from 'src/context/NavSerch';
import { usePathname } from 'src/routes/hooks';
import { columnDef } from './column-def';
import useGetLeadSources from 'src/libs/query/master/leace-source/useGetLeadSource';
import config from 'src/config';

function LeadSourceView() {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5);
  const { searchValue } = useSearch();
  const pathname = usePathname();
  const { data, isLoading } = useGetLeadSources({
    page,
    pageSize,
    search: searchValue[pathname],
  });

  return (
    <Container>
      <Helmet>
        <title>Lead Source View | {config?.appName}</title>
      </Helmet>

      <DataTable
        rows={data?.data}
        columnDef={columnDef}
        total={data?.count}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        topContent={<TopContent />}
        loading={isLoading}
        stickyHeader
        height={'60vh'}
      />
    </Container>
  );
}

export default LeadSourceView;

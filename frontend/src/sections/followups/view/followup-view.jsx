import { Container } from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { DataTable } from 'src/components/data-table';
import { useSearch } from 'src/context/NavSerch';
import { usePathname } from 'src/routes/hooks';
import { columnDef } from './column-def';
import TopContent from './top-content';
import useGetFollowups from 'src/libs/query/followup/useGetFollowups';
import config from 'src/config';

function FollowupCreate() {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5);
  const { searchValue } = useSearch();
  const pathname = usePathname();

  const { data, isLoading, isSuccess } = useGetFollowups({
    page,
    pageSize,
    search: searchValue[pathname],
  });

  return (
    <Container>
      <Helmet>
        <title>Followup View | {config?.appName}</title>
      </Helmet>
      <DataTable
        columnDef={columnDef}
        topContent={<TopContent />}
        rows={data?.data}
        loading={isLoading}
        page={page}
        pageSize={pageSize}
        height={'55vh'}
        setPage={setPage}
        setPageSize={setPageSize}
        total={data?.count}
        stickyHeader
      />
    </Container>
  );
}

export default FollowupCreate;

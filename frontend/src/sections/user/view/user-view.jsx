import React from 'react';
import { DataTable } from 'src/components/data-table';
import useDisclosure from 'src/hooks/use-disclosure';
import useGetUsers from 'src/libs/query/user/useGetUsers';
import columnDef from '../column-def';
import TopContent from '../top-content';
import { useSearch } from 'src/context/NavSerch';
import { Box, Container } from '@mui/material';
import { usePathname, useRouter } from 'src/routes/hooks';
import { Helmet } from 'react-helmet-async';
import config from 'src/config';

function UserView() {
  const { searchValue } = useSearch();
  const pathname = usePathname();
  const router = useRouter();
  const [users, setUsers] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5);

  const { data, isPending, isSuccess } = useGetUsers({
    page: page,
    pageSize: pageSize,
    search: searchValue[pathname],
  });

  React.useEffect(() => {
    if (isSuccess) {
      setUsers(data?.data || []);
    }
  }, [data, isSuccess]);

  return (
    <Container>
      <Helmet>
        <title>User View | {config?.appName}</title>
      </Helmet>
      <DataTable
        columnDef={columnDef}
        rows={users}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        total={data?.totalCount}
        setPageSize={setPageSize}
        height="55vh"
        stickyHeader
        loading={isPending}
        topContent={<TopContent />}
      />
    </Container>
  );
}

export default UserView;

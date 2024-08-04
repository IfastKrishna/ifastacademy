import React from 'react';
import { DataTable } from 'src/components/data-table';
import useDisclosure from 'src/hooks/use-disclosure';
import useGetUsers from 'src/libs/query/user/useGetUsers';
import columnDef from '../column-def';
import TopContent from '../top-content';
import { ConfirmationModal } from 'src/components/confirmation-model';
import { FileUploader } from 'src/components/file-uploader';
import { FileView } from 'src/components/file-view';
import { FloatMenu } from 'src/components/float-menu';
import { useSearch } from 'src/context/NavSerch';
import { Box } from '@mui/material';
import { usePathname, useRouter } from 'src/routes/hooks';

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

  let { isOpen: isOpen2, close: close2, open: open2 } = useDisclosure(false);
  let { isOpen: isOpen1, close: close1, open: open1 } = useDisclosure(false);

  return (
    <Box>
      {/* <FileView /> */}

      <FileUploader isOpen={isOpen2} onClose={close2} />
      <ConfirmationModal open={isOpen1} onClose={close1} />
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
      {/* <Box sx={{ p: '10px 0', zIndex: 999 }}>
        <FloatMenu
          onDeleteHandler={open1}
          onUploadHandler={open2}
          onAddHandler={() => router.push('/user/create')}
        />
      </Box> */}
    </Box>
  );
}

export default UserView;

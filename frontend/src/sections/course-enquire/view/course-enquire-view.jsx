import { Container } from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { DataTable } from 'src/components/data-table';
import { useSearch } from 'src/context/NavSerch';
import useGetCourseEnquiers from 'src/libs/query/course-enquire/useGetCourseEnquiers';
import { usePathname } from 'src/routes/hooks';
import TopContent from 'src/sections/user/top-content';

function CourseEnquireView() {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5);
  const { searchValue } = useSearch();
  const pathname = usePathname();

  const { data, isLoading, isSuccess } = useGetCourseEnquiers({
    page,
    pageSize,
    search: searchValue[pathname],
  });

  console.log(data);
  return (
    <Container>
      <Helmet>
        <title>Course Enquire View | IfastAcademy</title>
      </Helmet>
      <DataTable
        columnDef={[]}
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

export default CourseEnquireView;

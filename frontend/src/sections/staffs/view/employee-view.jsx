import React, { useEffect, useState } from 'react';
import TopContent from './top-content';
import { DataTable } from 'src/components/data-table';
import { useSearch } from 'src/context/NavSerch';
import { columnDef } from './column-def';
import { usePathname } from 'src/routes/hooks';
import useGetEmployees from 'src/libs/query/employee/useGetEmployees';
import { debounce } from 'lodash';

function EmployeeView() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const { serchValue } = useSearch();
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState(serchValue ? serchValue[pathname] : '');

  const { data, isLoading, error } = useGetEmployees({
    page,
    pageSize,
    search: searchTerm,
  });

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

  if (error) {
    return <div>Error loading employees: {error.message}</div>;
  }

  return (
    <>
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
    </>
  );
}

export default EmployeeView;

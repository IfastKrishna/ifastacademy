import { Chip, Container, Tooltip } from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { DataTable } from 'src/components/data-table';
import { useSearch } from 'src/context/NavSerch';
import { usePathname } from 'src/routes/hooks';
import TopContent from './top-content';
import config from 'src/config';
import useGetCourseEnquires from 'src/libs/query/course-enquire/useGetCourseEnquiers';
import { fDate } from 'src/utils/format-time';
import useUpdateEnquireStatus from 'src/libs/mutation/course-enquire/useUpdateEnquireStatus';
import { ConfirmationModal } from 'src/components/confirmation-model';
import useDisclosure from 'src/hooks/use-disclosure';
import ActionMenu from 'src/components/data-table/ActionMenu';
import useDeleteEnquire from 'src/libs/mutation/course-enquire/useDeleteEnquire';
import { de } from 'date-fns/locale';

function CourseEnquireView() {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5);
  const [enquireId, setEnquireId] = React.useState(null);
  const { searchValue } = useSearch();
  const pathname = usePathname();
  const { isOpen: deleteModeOn, open: onDeleteOpen, close: onDeleteClose } = useDisclosure();

  const { data, isLoading, isSuccess } = useGetCourseEnquires({
    page,
    pageSize,
    search: searchValue[pathname],
  });

  const { mutate: updateStatus } = useUpdateEnquireStatus();
  const {
    mutate: onDeleteEnquire,
    isPending: deleingEnquire,
    isSuccess: deletedEnquire,
  } = useDeleteEnquire();

  React.useEffect(() => {
    if (deletedEnquire) {
      onDeleteClose();
      setEnquireId(null);
    }
  }, [deletedEnquire]);

  const menus = (row, router) => {
    return [
      {
        itemText: 'View',
        icon: 'eva:eye-outline',
        onClick: () => router?.push(`/enquire/view/${row?._id}`),
      },
      {
        itemText: 'Edit',
        icon: 'eva:edit-fill',
        onClick: () => router?.push(`/enquire/edit/${row?._id}`),
      },
      {
        itemText: 'New Followup',
        icon: 'eva:phone-fill',
        onClick: () => router?.push(`/followup/create/courseenquires/${row?._id}`),
      },
      {
        itemText: 'New Admission',
        icon: 'eva:person-fill',
        onClick: () => router?.push(`/student/new-admission/${row?._id}`),
      },
      {
        itemText: 'Cancel Enquire',
        disabled: row?.status == 'cancelled',
        icon: 'eva:minus-circle-fill',
        onClick: () => {
          updateStatus({
            ...row,
            streetAddress: row?.address?.streetAddress,
            city: row?.address?.city,
            postalCode: row?.address?.postalCode,
            state: row?.address?.state,
            status: 'cancelled',
          });
        },
      },
      {
        itemText: 'Delete',
        color: 'error.main',
        icon: 'eva:trash-2-outline',
        onClick: () => {
          setEnquireId(row?._id);
          onDeleteOpen();
        },
      },
    ];
  };

  const columnDef = [
    {
      accessorFn: (row) => `${row?.firstName} ${row?.lastName}`,
      header: 'Full Name',
      size: 150,
    },
    {
      header: 'Email',
      cell: ({ row: { original } }) => (
        <Tooltip title={original?.email}>
          <span>{original?.email}</span>
        </Tooltip>
      ),
      size: 120,
    },
    {
      accessorKey: 'phoneNo',
      header: 'Mobile No',
      size: 120,
    },
    {
      accessorKey: 'gender',
      header: 'Gender',
      size: 70,
    },
    {
      cell: ({ row: { original } }) => (
        <Tooltip
          title={`${original?.address?.streetAddress} ${original?.address?.city} $
          ${original?.address?.postalCode} ${original?.address?.state} ${original?.address?.country}`}
        >
          <span>{original?.address?.streetAddress}</span>
        </Tooltip>
      ),
      header: 'Address',
      size: 150,
    },
    {
      cell: ({ row: { original } }) => (
        <Tooltip title={original?.courseInterest?.map((course) => course?.name).join(', ')}>
          <span>{original?.courseInterest?.map((course) => course?.name).join(', ')}</span>
        </Tooltip>
      ),

      header: 'Course Interest',
    },
    {
      header: 'Enquire Date',
      accessorFn: (row) => fDate(row?.enquireDate),
    },
    {
      header: 'Status',
      cell: ({ row: { original } }) => (
        <Chip
          size="small"
          label={original.status}
          color={original.status == 'pending' ? 'warning' : 'error'}
        />
      ),
      size: 100,
    },

    {
      header: 'Action',
      cell: ({ row: { original } }) => <ActionMenu menus={menus} row={original} />,
      size: 50,
    },
  ];

  return (
    <Container>
      <Helmet>
        <title>Course Enquire View | {config?.appName}</title>
      </Helmet>
      <ConfirmationModal
        confirmationTitle="Delete Enquire"
        confirmationMessage="Are you sure you want to delete this enquire?"
        open={deleteModeOn}
        onClose={onDeleteClose}
        confirming={deleingEnquire}
        onConfirm={() => {
          onDeleteEnquire([enquireId]);
        }}
      />
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

export default CourseEnquireView;

import { Avatar, Chip } from '@mui/material';
import ActionMenu from 'src/components/data-table/ActionMenu';

const columnDef = [
  {
    accessorKey: 'avatar',
    header: 'Avatar',
    cell: ({ getValue }) => <Avatar src={getValue()} alt="Avatar" />,
    size: 50,
  },
  { accessorKey: 'ifastId', header: 'Ifast ID', size: 150 },
  { accessorFn: (row) => row?.firstName + ' ' + row?.lastName, header: 'Full Name', size: 150 },
  { accessorKey: 'email', header: 'Email', size: 150 },
  { accessorKey: 'phoneNo', header: 'Phone', size: 100 },
  {
    header: 'Role',
    cell: ({ row: { original } }) => <Chip size="small" label={original?.role} />,
    size: 100,
  },
  // { header: 'Action', cell: () => <ActionMenu />, size: 50 },
];

export default columnDef;

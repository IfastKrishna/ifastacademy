import { Avatar, Chip } from '@mui/material';
import ActionMenu from 'src/components/data-table/ActionMenu';
import useUserBlockUnblock from 'src/libs/mutation/user/useUserBlockUnblock';

const menus = (row, router) => {
  const { mutate: update } = useUserBlockUnblock();
  return [
    {
      itemText: row?.status ? 'Block' : 'Unblock',
      icon: row?.status
        ? 'material-symbols-light:hide-source'
        : 'material-symbols-light:hide-source-outline',
      onClick: () => update(row?._id),
    },
  ];
};

const columnDef = [
  {
    accessorKey: 'avatar',
    header: 'Avatar',
    cell: ({ getValue }) => <Avatar src={getValue()} alt="Avatar" />,
    size: 50,
  },
  { accessorKey: 'ifastId', header: 'User ID', size: 150 },
  { accessorFn: (row) => row?.firstName + ' ' + row?.lastName, header: 'Full Name', size: 150 },
  { accessorKey: 'email', header: 'Email', size: 150 },
  { accessorKey: 'phoneNo', header: 'Phone', size: 100 },
  {
    header: 'Role',
    cell: ({ row: { original } }) => <Chip size="small" label={original?.role} />,
    size: 100,
  },
  {
    header: 'Block',
    cell: ({ row: { original } }) => <ActionMenu menus={menus} row={original} />,
    size: 50,
  },
];

export default columnDef;

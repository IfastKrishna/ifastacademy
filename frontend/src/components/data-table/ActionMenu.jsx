import { IconButton, ListItemIcon, ListItemText, MenuItem, Popover } from '@mui/material';
import React, { useRef } from 'react';
import Iconify from '../iconify';
import useDisclosure from 'src/hooks/use-disclosure';
import { useRouter } from 'src/routes/hooks';

function ActionMenu({
  row = {},
  menus = () => [
    {
      itemText: 'View',
      // color: 'primary.main',
      icon: 'eva:eye-outline',
      onClick: () => {},
    },
    {
      itemText: 'Edit',
      // color: 'primary.main',
      icon: 'eva:edit-fill',
      onClick: () => {},
    },
    {
      itemText: 'Delete',
      color: 'error.main',
      icon: 'eva:trash-2-outline',
      onClick: () => {},
    },
  ],
}) {
  const { open, close, isOpen } = useDisclosure();
  const anchorRef = useRef(null);
  const router = useRouter();

  return (
    <>
      <IconButton ref={anchorRef} onClick={open}>
        <Iconify icon="pepicons-pop:dots-y" />
      </IconButton>
      <Popover
        open={isOpen}
        anchorEl={anchorRef.current}
        onClose={close}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        {menus(row, router).map((menu, index) => (
          <MenuItem
            key={index}
            onClick={menu?.onClick}
            sx={{ color: menu?.color, display: 'flex', gap: '10px', alignItems: 'center' }}
          >
            <Iconify icon={menu?.icon} width={20} />
            <ListItemText primary={menu?.itemText} color={menu?.color} />
          </MenuItem>
        ))}
      </Popover>
    </>
  );
}

export default ActionMenu;

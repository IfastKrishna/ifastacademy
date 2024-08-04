import {
  Delete,
  CloudUpload,
  GetApp,
  Print,
  Refresh,
  AddBox,
  FilterAlt,
  FilterAltOff,
  Menu,
} from '@mui/icons-material';
import { Box, IconButton, Popover, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import React, { useState } from 'react';
import useDisclosure from 'src/hooks/use-disclosure';

function HeaderMenu({
  onAdd,
  onDelete,
  onUpload,
  onCsvDownload,
  onExcelDownload,
  onTemplateDownload,
  onRefresh,
  onPrint,
  onColumnFilter,
}) {
  const { isOpen, open, close } = useDisclosure();
  const [anchorEl, setAnchorEl] = useState(null);
  const [filter, setFilter] = useState(false);

  const toggle = () => setFilter(!filter);

  const handleClick = (event) => {
    open();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    close();
    setAnchorEl(null);
  };

  return (
    <Box>
      <IconButton onClick={handleClick}>
        <Menu />
      </IconButton>
      <Popover
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Box>
          {!!onRefresh && (
            <MenuItem onClick={onRefresh}>
              <ListItemIcon>
                <Refresh />
              </ListItemIcon>
              <ListItemText primary="Refresh" />
            </MenuItem>
          )}
          {!!onColumnFilter && (
            <MenuItem
              onClick={() => {
                onColumnFilter();
                toggle();
              }}
            >
              <ListItemIcon>{filter ? <FilterAltOff /> : <FilterAlt />}</ListItemIcon>
              <ListItemText primary="Filter" />
            </MenuItem>
          )}
          {!!onAdd && (
            <MenuItem onClick={onAdd}>
              <ListItemIcon>
                <AddBox />
              </ListItemIcon>
              <ListItemText primary="Add" />
            </MenuItem>
          )}
          {!!onUpload && (
            <MenuItem onClick={onUpload}>
              <ListItemIcon>
                <CloudUpload />
              </ListItemIcon>
              <ListItemText primary="Upload" />
            </MenuItem>
          )}
          {!!onCsvDownload && (
            <MenuItem onClick={onCsvDownload}>
              <ListItemIcon>
                <GetApp />
              </ListItemIcon>
              <ListItemText primary="CSV" />
            </MenuItem>
          )}
          {!!onExcelDownload && (
            <MenuItem onClick={onExcelDownload}>
              <ListItemIcon>
                <GetApp />
              </ListItemIcon>
              <ListItemText primary="Excel" />
            </MenuItem>
          )}
          {!!onTemplateDownload && (
            <MenuItem onClick={onTemplateDownload}>
              <ListItemIcon>
                <GetApp />
              </ListItemIcon>
              <ListItemText primary="Template" />
            </MenuItem>
          )}

          {!!onPrint && (
            <MenuItem onClick={onPrint}>
              <ListItemIcon>
                <Print />
              </ListItemIcon>
              <ListItemText primary="Print" />
            </MenuItem>
          )}
          {!!onDelete && (
            <MenuItem onClick={onDelete} sx={{ color: 'error.main' }}>
              <ListItemIcon
                sx={{
                  color: 'error.main',
                }}
              >
                <Delete />
              </ListItemIcon>
              <ListItemText primary="Delete" />
            </MenuItem>
          )}
        </Box>
      </Popover>
    </Box>
  );
}

export default HeaderMenu;

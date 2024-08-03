import React from 'react';
import { Button, Menu, MenuItem } from '@mui/material';

function RowPerPage({ pageSize = 10, setPageSize = () => {}, pageMenus = [5, 10, 20, 50] }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [pagesize, setpagesize] = React.useState(pageSize);

  const open = Boolean(anchorEl);

  React.useEffect(() => {
    setPageSize(pagesize);
  }, [pagesize, setPageSize]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (size) => {
    setpagesize(size);
    handleClose();
  };

  return (
    <div>
      Rows :
      <Button
        id="rows-per-page-button"
        aria-controls={open ? 'rows-per-page-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {pagesize}
      </Button>
      <Menu
        id="rows-per-page-menu"
        aria-labelledby="rows-per-page-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {pageMenus.map((size) => (
          <MenuItem key={size} onClick={() => handleMenuItemClick(size)}>
            {size}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default RowPerPage;

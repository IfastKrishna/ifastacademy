import {
  Delete,
  CloudUpload,
  GetApp,
  Print,
  Refresh,
  Add,
  FilterAlt,
  FilterAltOff,
} from '@mui/icons-material';
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import React, { useState } from 'react';

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
  const [filter, setFilter] = useState(false);

  const toggle = () => setFilter(!filter);

  const actions = [
    onRefresh && {
      icon: <Refresh />,
      name: 'Refresh',
      onClick: onRefresh,
    },
    onColumnFilter && {
      icon: filter ? <FilterAltOff /> : <FilterAlt />,
      name: 'Filter',
      onClick: () => {
        onColumnFilter();
        toggle();
      },
    },
    onAdd && {
      icon: <Add />,
      name: 'Add',
      onClick: onAdd,
    },
    onUpload && {
      icon: <CloudUpload />,
      name: 'Upload',
      onClick: onUpload,
    },
    onCsvDownload && {
      icon: <GetApp />,
      name: 'CSV',
      onClick: onCsvDownload,
    },
    onExcelDownload && {
      icon: <GetApp />,
      name: 'Excel',
      onClick: onExcelDownload,
    },
    onTemplateDownload && {
      icon: <GetApp />,
      name: 'Template',
      onClick: onTemplateDownload,
    },
    onPrint && {
      icon: <Print />,
      name: 'Print',
      onClick: onPrint,
    },
    onDelete && {
      icon: <Delete />,
      name: 'Delete',
      onClick: onDelete,
      color: 'error.main',
    },
  ].filter(Boolean); // Filter out undefined actions

  return (
    <Box>
      <SpeedDial ariaLabel="Header Menu" icon={<SpeedDialIcon />} direction="left">
        {actions.map((action, index) => (
          <SpeedDialAction
            key={index}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onClick}
            sx={{ color: action.color || 'inherit' }}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}

export default HeaderMenu;

import { Breadcrumbs, Paper, Typography } from '@mui/material';
import React from 'react';
import { useRouter } from 'src/routes/hooks';

function BreadcrumbsGen({ menus = [] }) {
  const router = useRouter();

  return (
    <Breadcrumbs>
      {menus.map((menu, index) =>
        index === menus.length - 1 ? (
          <Typography color="text.primary" key={index}>
            {menu?.title}
          </Typography>
        ) : (
          <Paper elevation={0} sx={{ px: 1, cursor: 'pointer' }} key={index}>
            <Typography color="text.primary" onClick={() => router.push(`/${menu.url}`)}>
              {menu?.title}
            </Typography>
          </Paper>
        )
      )}
    </Breadcrumbs>
  );
}

export default BreadcrumbsGen;

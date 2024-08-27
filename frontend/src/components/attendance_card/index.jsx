import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

const AttendanceCard = ({ sx }) => {
  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = Array.from({ length: daysInMonth }, (_, index) => index + 1);

  // Weekdays without Sunday
  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <Card sx={{ height: 'auto', ...sx }}>
      <CardContent>
        <Grid container spacing={1}>
          {weekdays.map((weekday, index) => (
            <Grid item xs={12 / 6} key={index}>
              <Typography variant="body1" align="center">
                {weekday}
              </Typography>
            </Grid>
          ))}

          {days.map((day) => {
            const dayOfWeek = new Date(year, month, day).getDay();
            // Skip Sundays
            if (dayOfWeek === 0) {
              return null;
            }
            return (
              <Grid item xs={12 / 6} key={day}>
                <Typography variant="body1" align="center">
                  {day}
                </Typography>
                {/* Example: <Typography variant="body2" align="center">{attendance[day]}</Typography> */}
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AttendanceCard;

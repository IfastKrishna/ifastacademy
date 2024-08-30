import { MoreVert } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  IconButton,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import React from 'react';
import useIsAuth from 'src/libs/query/isAuth/useIsAuth';
import useGetStudentMyBatch from 'src/libs/query/student/report/useGetMyBatch';
import { fDate } from 'src/utils/format-time';

function StudentMyBatchView() {
  const user = useIsAuth()?.data?.data;
  const batches = useGetStudentMyBatch({ studentId: user?._id }).data?.data;

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 2 }}>
        My Batches
      </Typography>
      <Grid container spacing={3}>
        {batches?.map((batch) => (
          <Grid xs={12} md={6} key={batch?._id}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="300"
                  image="/public/assets/images/ui/course.png"
                />
                <CardContent>
                  <Typography variant="h5">{batch?.name}</Typography>
                  <Typography variant="h5">
                    {batch?.course?.name} {batch?.course?.duration}
                  </Typography>
                  <Typography variant="h6">
                    Start Date :- <span style={{ fontWeight: 400 }}>{fDate(batch.startDate)}</span>
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Button color="primary">View Details</Button>
                  <IconButton>
                    <MoreVert />
                  </IconButton>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default StudentMyBatchView;

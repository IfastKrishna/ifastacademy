import { LoadingButton } from '@mui/lab';
import {
  Autocomplete,
  Box,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import useAddFollowup from 'src/libs/mutation/followup/useAddFollowup';
import useGetAssignableUser from 'src/libs/query/user/useGetAssigedUser';

// Please provide leadId, assignedTo, dueDate, and description
function FollowupCreate({
  size = 'medium',
  variant = 'standard',
  btnSize = 'medium',
  btnVariant = 'contained',
}) {
  const [status, setStatus] = React.useState('completed');
  const { id, collection } = useParams();
  const {
    control,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      followupDate: new Date().toISOString().split('T')[0],
      status: 'completed',
      dueDate: new Date().toISOString().split('T')[0],
    },
  });
  const { data: assignableUsers } = useGetAssignableUser({
    roles: ['employee', 'admin', 'superadmin'],
  });

  const { mutate: addFollowup, isPending: adding, isSuccess: addedFollowup } = useAddFollowup();

  React.useEffect(() => {
    if (addedFollowup) {
      reset();
    }
  }, [addedFollowup]);

  const onSubmit = (data) => {
    data.leadId = {
      collectionName: collection,
      id,
    };
    addFollowup(data);
  };

  return (
    <Container>
      <h1>Followup Create</h1>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid2 container spacing={2}>
          <Grid2 item xs={12} md={6}>
            <Controller
              name="followupDate"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  label="Followup Date"
                  type="date"
                  variant={variant}
                  size={size}
                  {...field}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </Grid2>
          <Grid2 item xs={12} md={6}>
            <Controller
              name="followupDetails"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  label="Followup Details"
                  variant={variant}
                  size={size}
                  fullWidth
                  {...field}
                />
              )}
            />
          </Grid2>
          <Grid2 item xs={12} md={6}>
            <Controller
              name="notes"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField label="Notes" variant={variant} size={size} fullWidth {...field} />
              )}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <Controller
              name="assignedTo"
              control={control}
              rules={{ required: 'Assign To is required' }}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  options={assignableUsers?.data || []}
                  getOptionLabel={(option) =>
                    option.firstName +
                    ' ' +
                    option.lastName +
                    (option.ifastId ? ` (${option.ifastId})` : '')
                  }
                  onChange={(_, data) => field.onChange(data?._id)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Assign To"
                      variant={variant}
                      size={size}
                      error={!!errors?.assignedTo}
                      helperText={errors?.assignedTo?.message}
                    />
                  )}
                />
              )}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <FormControl variant={variant} size={size} fullWidth error={!!errors.status}>
              <InputLabel>Status</InputLabel>
              <Controller
                name="status"
                control={control}
                rules={{ required: 'Status is required' }}
                render={({ field }) => (
                  <Select
                    value={status}
                    onChange={(e) => {
                      setStatus(e.target.value);
                      field.onChange(e);
                    }}
                    label="Status"
                  >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="cancelled">cancelled</MenuItem>
                    <MenuItem value="completed">completed</MenuItem>
                  </Select>
                )}
              />
              <FormHelperText>{errors.status?.message}</FormHelperText>
            </FormControl>
          </Grid2>
          <Grid2 item xs={12} md={6}>
            <Controller
              name="dueDate"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  label="Due Date"
                  type="date"
                  variant={variant}
                  size={size}
                  {...field}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </Grid2>
          <Grid2 item xs={12} md={6}>
            <LoadingButton type="submit" loading={adding} variant={btnVariant} size={btnSize}>
              Add Followup
            </LoadingButton>
          </Grid2>
        </Grid2>
      </Box>
    </Container>
  );
}

export default FollowupCreate;

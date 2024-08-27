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
import useUpdateFollowup from 'src/libs/mutation/followup/useUpdateFollowup';
import useGetFollowupById from 'src/libs/query/followup/useGetFollowupById';
import useGetAssignableUser from 'src/libs/query/user/useGetAssigedUser';
import { usePathname } from 'src/routes/hooks';

function FollowupEdit({
  size = 'medium',
  variant = 'standard',
  btnSize = 'medium',
  btnVariant = 'contained',
}) {
  const [status, setStatus] = React.useState('completed');
  const { id } = useParams();
  const pathname = usePathname();
  const isEdit = pathname.includes('edit');

  const {
    control,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data: assignableUsers } = useGetAssignableUser({
    roles: ['employee', 'admin', 'superadmin'],
  });

  const { data: followup, isSuccess: gatedFollowup } = useGetFollowupById({ id });

  React.useEffect(() => {
    if (gatedFollowup) {
      reset({
        followupDate: followup?.data?.createdAt?.split('T')[0],
        followupDetails: followup?.data?.followupDetails,
        notes: followup?.data?.notes,
        assignedTo: followup?.data?.assignedTo?._id,
        status: followup?.data?.status,
        dueDate: followup?.data?.dueDate?.split('T')[0],
      });
      setStatus(followup?.data?.status);
    }
  }, [gatedFollowup]);

  const { mutate: addFollowup, isPending: adding, isSuccess: addedFollowup } = useUpdateFollowup();

  React.useEffect(() => {
    if (addedFollowup) {
      reset();
    }
  }, [addedFollowup]);

  const onSubmit = (data) => {
    data.id = id;
    addFollowup(data);
    console.log(data);
  };

  return (
    <Container>
      <h1>Followup {isEdit ? 'Edit' : 'View'}</h1>
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
                  disabled={!isEdit}
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
                  disabled={!isEdit}
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
                <TextField
                  label="Notes"
                  variant={variant}
                  size={size}
                  fullWidth
                  {...field}
                  disabled={!isEdit}
                />
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
                  value={assignableUsers?.data?.find((user) => user._id === watch('assignedTo'))}
                  onChange={(_, data) => field.onChange(data?._id)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Assign To"
                      variant={variant}
                      size={size}
                      error={!!errors?.assignedTo}
                      helperText={errors?.assignedTo?.message}
                      disabled={!isEdit}
                    />
                  )}
                />
              )}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <FormControl
              variant={variant}
              size={size}
              fullWidth
              error={!!errors.status}
              disabled={!isEdit}
            >
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
                    disabled={!isEdit}
                  >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="cancelled">Cancelled</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
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
                  disabled={!isEdit}
                />
              )}
            />
          </Grid2>
          {isEdit && (
            <Grid2 item xs={12} md={6}>
              <LoadingButton type="submit" loading={adding} variant={btnVariant} size={btnSize}>
                Update Followup
              </LoadingButton>
            </Grid2>
          )}
        </Grid2>
      </Box>
    </Container>
  );
}

export default FollowupEdit;

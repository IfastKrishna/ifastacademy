import { Autocomplete, Checkbox, CircularProgress, TextField } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

export default function AsyncSelect({
  sx = {},
  loading,
  options = [],
  handleSearch = () => {},
  selectedOptions = [],
  setSelectedOptions = () => {},
  isOptionEqualToValue = (option, value) => option._id === value._id,
  getOptionLabel = (option) => option.name,
  label = 'Select an option',
  variant = 'standard',
  control,
  name,
  disabled = false,
  readOnly = false,
  rules = {},
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Autocomplete
          multiple
          sx={sx}
          disabled={disabled}
          readOnly={readOnly}
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          isOptionEqualToValue={isOptionEqualToValue}
          getOptionLabel={getOptionLabel}
          options={options}
          loading={loading}
          onChange={(event, newValue) => {
            setSelectedOptions(newValue);
            onChange(newValue);
            handleSearch({ target: { value: '' } });
          }}
          value={value || selectedOptions}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox checked={selected} style={{ marginRight: 8 }} />
              {option.name}
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label={`${label} (${selectedOptions.length} selected)`}
              variant={variant}
              onChange={handleSearch}
              error={!!error}
              helperText={error ? error.message : null}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
      )}
    />
  );
}

// import { Autocomplete, Checkbox, CircularProgress, TextField } from '@mui/material';
// import React, { forwardRef } from 'react';

// const AsyncSelect = forwardRef(
//   (
//     {
//       sx = {},
//       loading,
//       options = [],
//       handleSearch = () => {},
//       selectedOptions = [],
//       setSelectedOptions = () => {},
//       isOptionEqualToValue = (option, value) => option._id === value._id,
//       getOptionLabel = (option) => option.name,
//       label = 'Select an option',
//       variant = 'standard',
//       error,
//       helperText,
//       ...props
//     },
//     ref
//   ) => {
//     const [open, setOpen] = React.useState(false);

//     return (
//       <Autocomplete
//         multiple
//         sx={sx}
//         open={open}
//         onOpen={() => setOpen(true)}
//         onClose={() => setOpen(false)}
//         isOptionEqualToValue={isOptionEqualToValue}
//         getOptionLabel={getOptionLabel}
//         options={options}
//         loading={loading}
//         onChange={(event, newValue) => {
//           setSelectedOptions(newValue);
//           handleSearch({ target: { value: '' } });
//         }}
//         value={selectedOptions}
//         ref={ref}
//         renderOption={(props, option, { selected }) => (
//           <li {...props}>
//             <Checkbox checked={selected} style={{ marginRight: 8 }} />
//             {option.name}
//           </li>
//         )}
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             label={label}
//             variant={variant}
//             onChange={handleSearch}
//             error={!!error}
//             helperText={helperText}
//             InputProps={{
//               ...params.InputProps,
//               endAdornment: (
//                 <React.Fragment>
//                   {loading ? <CircularProgress color="inherit" size={20} /> : null}
//                   {params.InputProps.endAdornment}
//                 </React.Fragment>
//               ),
//             }}
//           />
//         )}
//         {...props} // Pass remaining props to Autocomplete
//       />
//     );
//   }
// );

// export default AsyncSelect;

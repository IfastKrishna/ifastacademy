import {
  Box,
  Button,
  Container,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Typography,
  Paper,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import React from 'react';
import { useUI } from 'src/context/CostomeUi';

function SettingsView() {
  const { uiSettings, updateUISettings } = useUI();

  const handleVariantChange = (e) => {
    updateUISettings('textFieldVariant', e.target.value);
  };

  const handleSizeChange = (e) => {
    updateUISettings('textFieldSize', e.target.value);
  };

  const handleBtnSizeChange = (e) => {
    updateUISettings('btnSize', e.target.value);
  };

  const handleBtnVariantChange = (e) => {
    updateUISettings('btnVariant', e.target.value);
  };

  const handleBtnColorChange = (e) => {
    updateUISettings('btnColor', e.target.value);
  };

  return (
    <Container maxWidth="md">
      <Paper
        elevation={3}
        sx={{
          padding: {
            xs: 2,
            md: 4,
          },
          marginTop: 4,
        }}
      >
        <Typography variant="h5" gutterBottom>
          UI Settings
        </Typography>
        <Grid container spacing={3}>
          {/* TextField Settings */}
          <Grid xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="textFieldVariant-label">Text Field Variant</InputLabel>
              <Select
                labelId="textFieldVariant-label"
                id="textFieldVariant-select"
                value={uiSettings.textFieldVariant}
                label="Text Field Variant"
                onChange={handleVariantChange}
              >
                <MenuItem value="outlined">Outlined</MenuItem>
                <MenuItem value="filled">Filled</MenuItem>
                <MenuItem value="standard">Standard</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="textFieldSize-label">Text Field Size</InputLabel>
              <Select
                labelId="textFieldSize-label"
                id="textFieldSize-select"
                value={uiSettings.textFieldSize}
                label="Text Field Size"
                onChange={handleSizeChange}
              >
                <MenuItem value="small">Small</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="large">Large</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid xs={12}>
            <Box mt={3} textAlign="center">
              <TextField
                label="Preview Text Field"
                variant={uiSettings.textFieldVariant}
                size={uiSettings.textFieldSize}
              />
            </Box>
          </Grid>

          {/* Divider */}
          <Grid xs={12}>
            <Box mt={2} mb={2}>
              <hr />
            </Box>
          </Grid>

          {/* Button Settings */}
          <Grid xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="btnSize-label">Button Size</InputLabel>
              <Select
                labelId="btnSize-label"
                id="btnSize-select"
                value={uiSettings.btnSize}
                label="Button Size"
                onChange={handleBtnSizeChange}
              >
                <MenuItem value="small">Small</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="large">Large</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="btnVariant-label">Button Variant</InputLabel>
              <Select
                labelId="btnVariant-label"
                id="btnVariant-select"
                value={uiSettings.btnVariant}
                label="Button Variant"
                onChange={handleBtnVariantChange}
              >
                <MenuItem value="text">Text</MenuItem>
                <MenuItem value="contained">Contained</MenuItem>
                <MenuItem value="outlined">Outlined</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="btnColor-label">Button Color</InputLabel>
              <Select
                labelId="btnColor-label"
                id="btnColor-select"
                value={uiSettings.btnColor}
                label="Button Color"
                onChange={handleBtnColorChange}
              >
                <MenuItem value="primary">Primary</MenuItem>
                <MenuItem value="secondary">Secondary</MenuItem>
                <MenuItem value="success">Success</MenuItem>
                <MenuItem value="error">Error</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Preview */}
          <Grid xs={12}>
            <Box mt={3} textAlign="center">
              <Button
                size={uiSettings.btnSize}
                variant={uiSettings.btnVariant}
                color={uiSettings.btnColor}
              >
                Preview Button
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default SettingsView;

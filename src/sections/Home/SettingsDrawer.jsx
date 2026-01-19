import React from 'react';
import {
  Box,
  Drawer,
  IconButton,
  Typography,
  Stack,
  Switch,
  Paper,
  Grid,
  Slider,
  Divider,
  alpha,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { useThemeSettings } from './ThemeContext';

export default function SettingsDrawer({ open, onClose }) {
  const {
    mode,
    contrast,
    direction,
    layout,
    colorPreset,
    toggleMode,
    toggleContrast,
    toggleDirection,
    setLayout,
    setColorPreset,
    colorPresets,
  } = useThemeSettings();

  const [fontSize, setFontSize] = React.useState(16);

  const layoutOptions = [
    { value: 'vertical', icon: 'mdi:page-layout-sidebar-left', label: 'Vertical' },
    { value: 'horizontal', icon: 'mdi:page-layout-header', label: 'Horizontal' },
    { value: 'mini', icon: 'mdi:page-layout-sidebar-left', label: 'Mini' },
  ];

  const presetColors = Object.keys(colorPresets).map((key) => ({
    name: key,
    value: colorPresets[key].main,
  }));

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 320,
          bgcolor: mode === 'light' ? '#ffffff' : '#1a1d29',
          backgroundImage: 'none',
        },
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            p: 2.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Settings
          </Typography>
          <Stack direction="row" spacing={1}>
            <IconButton size="small" sx={{ color: 'text.secondary' }}>
              <Icon icon="mdi:refresh" width="20" />
            </IconButton>
            <IconButton size="small" onClick={onClose} sx={{ color: 'text.secondary' }}>
              <Icon icon="mdi:close" width="20" />
            </IconButton>
          </Stack>
        </Box>

        <Box sx={{ flex: 1, overflow: 'auto', p: 2.5 }}>
          <Stack spacing={3}>
            <Box>
              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                Mode
              </Typography>
              <Paper
                sx={{
                  p: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  bgcolor: mode === 'light' ? 'grey.100' : 'grey.900',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Icon icon="mdi:white-balance-sunny" width="20" />
                  <Typography variant="body2">
                    {mode === 'light' ? 'Light' : 'Dark'}
                  </Typography>
                </Box>
                <Switch checked={mode === 'dark'} onChange={toggleMode} />
              </Paper>
            </Box>

            <Box>
              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                Contrast
              </Typography>
              <Paper
                sx={{
                  p: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  bgcolor: mode === 'light' ? 'grey.100' : 'grey.900',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Icon icon="mdi:contrast" width="20" />
                  <Typography variant="body2">Bold</Typography>
                </Box>
                <Switch checked={contrast === 'bold'} onChange={toggleContrast} />
              </Paper>
            </Box>

            <Box>
              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                Right to left
              </Typography>
              <Paper
                sx={{
                  p: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  bgcolor: mode === 'light' ? 'grey.100' : 'grey.900',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Icon icon="mdi:format-align-right" width="20" />
                  <Typography variant="body2">RTL</Typography>
                </Box>
                <Switch checked={direction === 'rtl'} onChange={toggleDirection} />
              </Paper>
            </Box>

            <Divider />

            <Box>
              <Typography variant="subtitle2" fontWeight="bold" gutterBottom sx={{ mb: 2 }}>
                Layout
              </Typography>
              <Grid container spacing={1.5}>
                {layoutOptions.map((option) => (
                  <Grid item xs={4} key={option.value}>
                    <Paper
                      onClick={() => setLayout(option.value)}
                      sx={{
                        p: 2,
                        cursor: 'pointer',
                        textAlign: 'center',
                        border: 2,
                        borderColor:
                          layout === option.value ? 'primary.main' : 'transparent',
                        bgcolor: mode === 'light' ? 'grey.100' : 'grey.900',
                        transition: 'all 0.2s',
                        '&:hover': {
                          borderColor: 'primary.main',
                          bgcolor: alpha(
                            mode === 'light' ? '#000' : '#fff',
                            mode === 'light' ? 0.05 : 0.08
                          ),
                        },
                      }}
                    >
                      <Icon icon={option.icon} width="32" />
                      <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                        {option.label}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Divider />

            <Box>
              <Typography variant="subtitle2" fontWeight="bold" gutterBottom sx={{ mb: 2 }}>
                Color
              </Typography>
              <Grid container spacing={1.5}>
                {presetColors.map((preset) => (
                  <Grid item xs={6} key={preset.name}>
                    <Paper
                      onClick={() => setColorPreset(preset.name)}
                      sx={{
                        p: 1.5,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        border: 2,
                        borderColor:
                          colorPreset === preset.name ? preset.value : 'transparent',
                        bgcolor: mode === 'light' ? 'grey.100' : 'grey.900',
                        transition: 'all 0.2s',
                        '&:hover': {
                          borderColor: preset.value,
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: 24,
                          height: 24,
                          borderRadius: '50%',
                          bgcolor: preset.value,
                        }}
                      />
                      <Typography
                        variant="caption"
                        sx={{ textTransform: 'capitalize', fontWeight: 500 }}
                      >
                        {preset.name}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Divider />

            <Box>
              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                Font Size
              </Typography>
              <Box sx={{ px: 1 }}>
                <Slider
                  value={fontSize}
                  onChange={(e, value) => setFontSize(value)}
                  min={12}
                  max={20}
                  step={1}
                  marks
                  valueLabelDisplay="auto"
                />
                <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    12px
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    20px
                  </Typography>
                </Stack>
              </Box>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );
}

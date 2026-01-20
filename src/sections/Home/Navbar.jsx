import React, { useState } from 'react';
import {
  Box,
  List,
  AppBar,
  Button,
  Drawer,
  Avatar,
  Toolbar,
  Divider,
  ListItem,
  useTheme,
  Container,
  IconButton,
  Typography,
  ListItemText,
  useMediaQuery,
  ListItemButton,
  alpha,
} from '@mui/material';

import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import SettingsDrawer from './SettingsDrawer';
import { useThemeSettings } from './ThemeContext';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const theme = useTheme();
  const { mode } = useThemeSettings();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileOpen(false);
  };

  const handleSignIn = () => {
    navigate('auth/jwt/login');
  };

  const handleSignUp = () => {
    navigate('auth/jwt/register');
  };

  const menuItems = [
    { label: 'Home', id: 'hero' },
    { label: 'Features', id: 'features' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'contact' },
  ];

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: 'center', bgcolor: 'background.default', height: '100%' }}
    >
      <Typography variant="h6" sx={{ my: 2, color: 'primary.main', fontWeight: 'bold' }}>
        Astaric
      </Typography>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              sx={{
                textAlign: 'center',
                color: 'text.secondary',
                '&:hover': {
                  color: 'primary.main',
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                },
              }}
              onClick={() => scrollToSection(item.id)}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding sx={{ mt: 2, px: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={handleSignIn}
            sx={{
              borderColor: 'primary.main',
              color: 'primary.main',
              '&:hover': {
                borderColor: 'primary.main',
                bgcolor: alpha(theme.palette.primary.main, 0.1),
              },
            }}
          >
            Sign In
          </Button>
        </ListItem>

        <ListItem disablePadding sx={{ mt: 2, px: 2 }}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: 'background.default',
          borderBottom: 1,
          borderColor: 'divider',
          backdropFilter: 'blur(20px)',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 72 } }}>
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar
                sx={{
                  bgcolor: 'primary.main',
                  width: 36,
                  height: 36,
                }}
              >
                <Icon icon="mdi:factory" width="20" />
              </Avatar>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    color: 'primary.main',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontSize: { xs: '1.1rem', md: '1.25rem' },
                    letterSpacing: '-0.5px',
                  }}
                  onClick={() => scrollToSection('hero')}
                >
                  Astaric
                </Typography>
              </Box>
            </Box>

            {isMobile ? (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{
                  color: 'text.primary',
                  '&:hover': { bgcolor: 'action.hover' },
                }}
              >
                <Icon icon="mdi:menu" width="24" />
              </IconButton>
            ) : (
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                {menuItems.map((item) => (
                  <Button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    sx={{
                      color: 'text.secondary',
                      fontSize: '0.95rem',
                      fontWeight: 500,
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      position: 'relative',
                      '&:hover': {
                        color: 'primary.main',
                        bgcolor: alpha(theme.palette.primary.main, 0.05),
                      },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 0,
                        height: 2,
                        bgcolor: 'primary.main',
                        transition: 'width 0.3s ease',
                      },
                      '&:hover::after': {
                        width: '60%',
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}

                <IconButton
                  onClick={() => setSettingsOpen(true)}
                  sx={{
                    color: 'text.secondary',
                    ml: 1,
                    '&:hover': {
                      color: 'primary.main',
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                    },
                  }}
                >
                  <Icon icon="mdi:cog" width="20" />
                </IconButton>

                <Button
                  variant="outlined"
                  onClick={handleSignIn}
                  sx={{
                    ml: 1,
                    borderColor: 'divider',
                    color: 'text.primary',
                    borderRadius: 2,
                    px: 2.5,
                    fontWeight: 500,
                    '&:hover': {
                      borderColor: 'primary.main',
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                      color: 'primary.main',
                    },
                  }}
                >
                  Sign in
                </Button>

                <Button
                  variant="contained"
                  onClick={handleSignUp}
                  sx={{
                    ml: 1,
                    borderRadius: 2,
                    px: 2.5,
                    fontWeight: 600,
                  }}
                >
                  Sign Up
                </Button>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            width: 280,
            bgcolor: 'background.default',
          },
        }}
      >
        {drawer}
      </Drawer>

      <SettingsDrawer open={settingsOpen} onClose={() => setSettingsOpen(false)} />

      <Toolbar sx={{ minHeight: { xs: 64, md: 72 } }} />
    </>
  );
}

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
} from '@mui/material';

import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
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
      sx={{ textAlign: 'center', bgcolor: '#1a1d29', height: '100%' }}
    >
      <Typography variant="h6" sx={{ my: 2, color: '#3b82f6', fontWeight: 'bold' }}>
        Astaric
      </Typography>
      <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              sx={{
                textAlign: 'center',
                color: 'rgba(255,255,255,0.7)',
                '&:hover': {
                  color: '#3b82f6',
                  bgcolor: 'rgba(0,212,170,0.1)',
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
              borderColor: '#3b82f6',
              color: '#3b82f6',
              '&:hover': {
                borderColor: '#3b82f6',
                bgcolor: 'rgba(0,212,170,0.1)',
              },
            }}
          >
            Sign In
          </Button>
        </ListItem>

        <ListItem disablePadding sx={{ mt: 2, px: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={handleSignUp}
            sx={{
              borderColor: '#3b82f6',
              color: '#3b82f6',
              '&:hover': {
                borderColor: '#3b82f6',
                bgcolor: 'rgba(0,212,170,0.1)',
              },
            }}
          >
            Sign In
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
          bgcolor: '#1a1d29',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 72 } }}>
            {/* Logo */}
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar
                sx={{
                  bgcolor: '#3b82f6',
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
                    color: '#3b82f6',
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
                  color: '#fff',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' },
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
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: '0.95rem',
                      fontWeight: 500,
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      position: 'relative',
                      '&:hover': {
                        color: '#3b82f6',
                        bgcolor: 'rgba(0,212,170,0.05)',
                      },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 0,
                        height: 2,
                        bgcolor: '#3b82f6',
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

                {/* <IconButton
                  sx={{
                    color: 'rgba(255,255,255,0.5)',
                    ml: 1,
                    '&:hover': {
                      color: '#3b82f6',
                      bgcolor: 'rgba(0,212,170,0.05)',
                    },
                  }}
                >
                  <Icon icon="mdi:cog" width="20" />
                </IconButton> */}

                <Button
                  variant="outlined"
                  onClick={handleSignIn}
                  sx={{
                    ml: 1,
                    borderColor: 'rgba(255,255,255,0.2)',
                    color: '#fff',
                    borderRadius: 2,
                    px: 2.5,
                    fontWeight: 500,
                    '&:hover': {
                      borderColor: '#3b82f6',
                      bgcolor: 'rgba(0,212,170,0.05)',
                      color: '#3b82f6',
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
                    bgcolor: '#fff',
                    color: '#1a1d29',
                    borderRadius: 2,
                    px: 2.5,
                    fontWeight: 600,
                    boxShadow: '0 4px 14px 0 rgba(0,212,170,0.25)',
                    '&:hover': {
                      bgcolor: '#3b82f6',
                      color: '#fff',
                      boxShadow: '0 6px 20px 0 rgba(0,212,170,0.4)',
                    },
                  }}
                >
                  SignUp
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
            bgcolor: '#1a1d29',
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Spacer for fixed navbar */}
      <Toolbar sx={{ minHeight: { xs: 64, md: 72 } }} />
    </>
  );
}

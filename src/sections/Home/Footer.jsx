import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Stack,
  IconButton,
  Divider,
  alpha,
  useTheme,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();
  const theme = useTheme();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const footerLinks = {
    company: [
      { label: 'About', action: () => scrollToSection('about') },
      { label: 'Features', action: () => scrollToSection('features') },
      { label: 'Contact', action: () => scrollToSection('contact') },
    ],
    resources: [
      { label: 'Documentation', action: () => {} },
      { label: 'Support', action: () => {} },
      { label: 'Privacy Policy', action: () => {} },
    ],
  };

  const socialLinks = [
    { icon: 'mdi:facebook', url: '#' },
    { icon: 'mdi:twitter', url: '#' },
    { icon: 'mdi:linkedin', url: '#' },
    { icon: 'mdi:github', url: '#' },
  ];

  return (
    <Box
      sx={{
        bgcolor: theme.palette.mode === 'light' ? 'grey.100' : 'background.paper',
        color: 'text.primary',
        pt: 8,
        pb: 4,
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          height: '2px',
          background: `linear-gradient(90deg, transparent 0%, ${theme.palette.primary.main} 50%, transparent 100%)`,
        }}
      />

      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h5"
                sx={{
                  color: 'primary.main',
                  fontWeight: 700,
                  mb: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <Icon icon="mdi:factory" width="28" />
                Astaric
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  lineHeight: 1.7,
                  mb: 3,
                }}
              >
                Smart fixed-asset management platform designed for construction companies. Built by
                ITG.
              </Typography>
              <Stack direction="row" spacing={1}>
                {socialLinks.map((social, index) => (
                  <IconButton
                    key={index}
                    sx={{
                      color: 'text.secondary',
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                      border: 1,
                      borderColor: 'divider',
                      '&:hover': {
                        color: 'primary.main',
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        borderColor: 'primary.main',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <Icon icon={social.icon} width="20" />
                  </IconButton>
                ))}
              </Stack>
            </Box>
          </Grid>

          <Grid item xs={6} md={2.5}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2, color: 'text.primary' }}>
              Company
            </Typography>
            <Stack spacing={1.5}>
              {footerLinks.company.map((link, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  onClick={link.action}
                  sx={{
                    color: 'text.secondary',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: 'primary.main',
                      transform: 'translateX(4px)',
                    },
                  }}
                >
                  {link.label}
                </Typography>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={6} md={2.5}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2, color: 'text.primary' }}>
              Resources
            </Typography>
            <Stack spacing={1.5}>
              {footerLinks.resources.map((link, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  onClick={link.action}
                  sx={{
                    color: 'text.secondary',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: 'primary.main',
                      transform: 'translateX(4px)',
                    },
                  }}
                >
                  {link.label}
                </Typography>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2, color: 'text.primary' }}>
              Contact
            </Typography>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Icon icon="mdi:email" width="18" color={theme.palette.primary.main} />
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  info@itgllc.ae
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Icon icon="mdi:phone" width="18" color={theme.palette.primary.main} />
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  +971 56 863 8858
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Icon icon="mdi:web" width="18" color={theme.palette.primary.main} />
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  www.itgllc.ae
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ mb: 3 }} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            © {new Date().getFullYear()} Astaric by ITG. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={3}>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                cursor: 'pointer',
                '&:hover': { color: 'primary.main' },
              }}
            >
              Terms
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                cursor: 'pointer',
                '&:hover': { color: 'primary.main' },
              }}
            >
              Privacy
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                cursor: 'pointer',
                '&:hover': { color: 'primary.main' },
              }}
            >
              Cookies
            </Typography>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

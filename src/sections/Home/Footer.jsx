import React from 'react';
import { Box, Container, Typography, Grid, Stack, IconButton, Divider, alpha } from '@mui/material';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();

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
    { icon: 'mdi:facebook', url: '#', color: '#1877f2' },
    { icon: 'mdi:twitter', url: '#', color: '#1da1f2' },
    { icon: 'mdi:linkedin', url: '#', color: '#0a66c2' },
    { icon: 'mdi:github', url: '#', color: '#ffffff' },
  ];

  return (
    <Box
      sx={{
        bgcolor: '#0f1117',
        color: 'white',
        pt: 8,
        pb: 4,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Gradient */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          height: '2px',
          background: 'linear-gradient(90deg, transparent 0%, #3b82f6 50%, transparent 100%)',
        }}
      />

      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h5"
                sx={{
                  color: '#3b82f6',
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
                  color: 'rgba(255,255,255,0.6)',
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
                      color: 'rgba(255,255,255,0.5)',
                      bgcolor: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      '&:hover': {
                        color: social.color,
                        bgcolor: alpha(social.color, 0.1),
                        borderColor: alpha(social.color, 0.3),
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

          {/* Company Links */}
          <Grid item xs={6} md={2.5}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2, color: '#fff' }}>
              Company
            </Typography>
            <Stack spacing={1.5}>
              {footerLinks.company.map((link, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  onClick={link.action}
                  sx={{
                    color: 'rgba(255,255,255,0.6)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: '#3b82f6',
                      transform: 'translateX(4px)',
                    },
                  }}
                >
                  {link.label}
                </Typography>
              ))}
            </Stack>
          </Grid>

          {/* Resources Links */}
          <Grid item xs={6} md={2.5}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2, color: '#fff' }}>
              Resources
            </Typography>
            <Stack spacing={1.5}>
              {footerLinks.resources.map((link, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  onClick={link.action}
                  sx={{
                    color: 'rgba(255,255,255,0.6)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: '#3b82f6',
                      transform: 'translateX(4px)',
                    },
                  }}
                >
                  {link.label}
                </Typography>
              ))}
            </Stack>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={3}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2, color: '#fff' }}>
              Contact
            </Typography>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Icon icon="mdi:email" width="18" style={{ color: '#3b82f6' }} />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                  info@itgllc.ae
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Icon icon="mdi:phone" width="18" style={{ color: '#3b82f6' }} />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                  +971 56 863 8858
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Icon icon="mdi:web" width="18" style={{ color: '#3b82f6' }} />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                  www.itgllc.ae
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 3 }} />

        {/* Copyright */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
            © {new Date().getFullYear()} Astaric by ITG. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={3}>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                '&:hover': { color: '#3b82f6' },
              }}
            >
              Terms
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                '&:hover': { color: '#3b82f6' },
              }}
            >
              Privacy
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                '&:hover': { color: '#3b82f6' },
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

import React from 'react';
import { Box, Container, Typography, Paper, Stack, alpha, useTheme } from '@mui/material';
import { Icon } from '@iconify/react';

const contactInfo = [
  {
    icon: 'mdi:email',
    text: 'info@itgllc.ae',
    label: 'Email',
  },
  {
    icon: 'mdi:phone',
    text: '+971 56 863 8858',
    label: 'Phone',
  },
  {
    icon: 'mdi:web',
    text: 'www.itgllc.ae',
    label: 'Website',
  },
];

export default function ContactSection() {
  const theme = useTheme();

  return (
    <Box
      id="contact"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
       <Box
        sx={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: 350,
          height: 350,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.light, 0.08)} 0%, transparent 70%)`,
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          right: '10%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(theme.palette.info.main, 0.08)} 0%, transparent 70%)`,
          filter: 'blur(70px)',
          pointerEvents: 'none',
        }}
      />

      {/* Floating Icons */}
      <Box
        sx={{
          position: 'absolute',
          top: '30%',
          right: '5%',
          width: 45,
          height: 45,
          animation: 'float 9s ease-in-out infinite',
          opacity: 0.15,
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
            '50%': { transform: 'translateY(-12px) rotate(8deg)' },
          },
        }}
      >
        <Icon icon="mdi:email-fast" width="45" color={theme.palette.primary.main} />
      </Box>

      <Box
        sx={{
          position: 'absolute',
          bottom: '25%',
          left: '8%',
          width: 50,
          height: 50,
          animation: 'float 10s ease-in-out infinite',
          animationDelay: '1s',
          opacity: 0.15,
        }}
      >
        <Icon icon="mdi:phone-classic" width="50" color={theme.palette.info.main} />
      </Box>

      {/* Dot Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: '40%',
          left: '5%',
          width: 120,
          height: 120,
          opacity: theme.palette.mode === 'light' ? 0.15 : 0.1,
          backgroundImage: `radial-gradient(${alpha(theme.palette.primary.main, 0.4)} 2px, transparent 2px)`,
          backgroundSize: '15px 15px',
        }}
      />
       {/* Grid Pattern Background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: theme.palette.mode === 'light' ? 0.02 : 0.03,
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 35px,
            ${alpha(theme.palette.primary.main, 0.4)} 35px,
            ${alpha(theme.palette.primary.main, 0.4)} 70px
          )`,
          zIndex: 0,
        }}
      />
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="overline"
            sx={{
              color: 'primary.main',
              fontSize: '0.875rem',
              fontWeight: 600,
              letterSpacing: '2px',
              mb: 2,
              display: 'block',
            }}
          >
            GET IN TOUCH
          </Typography>
          <Typography
            variant="h3"
            gutterBottom
            fontWeight="bold"
            sx={{
              color: 'text.primary',
              fontSize: { xs: '2rem', md: '2.5rem' },
              mb: 2,
            }}
          >
            Contact Us
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              maxWidth: '600px',
              mx: 'auto',
              fontSize: '1.1rem',
            }}
          >
            We love to hear from you. Reach out to learn more about Astaric.
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            maxWidth: 700,
            mx: 'auto',
            bgcolor: 'background.default',
            border: 1,
            borderColor: 'divider',
            borderRadius: 3,
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            fontWeight="bold"
            sx={{
              color: 'text.primary',
              mb: 3,
            }}
          >
            Get in Touch
          </Typography>

          <Stack spacing={2}>
            {contactInfo.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2.5,
                  p: 2.5,
                  borderRadius: 2,
                  border: 1,
                  borderColor: 'divider',
                  bgcolor: 'background.paper',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                    borderColor: 'primary.main',
                    transform: 'translateX(8px)',
                    '& .contact-icon': {
                      transform: 'scale(1.1) rotate(5deg)',
                      bgcolor: alpha(theme.palette.primary.main, 0.15),
                      borderColor: 'primary.main',
                    },
                  },
                }}
              >
                <Box
                  className="contact-icon"
                  sx={{
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    p: 1.5,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    minWidth: 56,
                    minHeight: 56,
                  }}
                >
                  <Icon
                    icon={item.icon}
                    width="24"
                    color={theme.palette.primary.main}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.secondary',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                    }}
                  >
                    {item.label}
                  </Typography>
                  <Typography
                    variant="body1"
                    fontWeight="medium"
                    sx={{
                      color: 'text.primary',
                      fontSize: '1.05rem',
                      mt: 0.5,
                    }}
                  >
                    {item.text}
                  </Typography>
                </Box>
                <Icon
                  icon="mdi:arrow-right"
                  width="20"
                  color={theme.palette.text.secondary}
                  style={{
                    transition: 'all 0.3s ease',
                  }}
                />
              </Box>
            ))}
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}

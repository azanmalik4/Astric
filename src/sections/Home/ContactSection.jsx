import React from 'react';
import { Box, Container, Typography, Paper, Stack, alpha } from '@mui/material';
import { Icon } from '@iconify/react';

const contactInfo = [
  {
    icon: 'mdi:email',
    text: 'info@itgllc.ae',
    label: 'Email',
    color: '#60a5fa',
  },
  {
    icon: 'mdi:phone',
    text: '+971 56 863 8858',
    label: 'Phone',
    color: '#00d4aa',
  },
  {
    icon: 'mdi:web',
    text: 'www.itgllc.ae',
    label: 'Website',
    color: '#a78bfa',
  },
];

export default function ContactSection() {
  return (
    <Box
      id="contact"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: '#0f1117',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Decorative Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: 350,
          height: 350,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(96,165,250,0.08) 0%, transparent 70%)',
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
          background: 'radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Section Title */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="overline"
            sx={{
              color: '#00d4aa',
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
              color: '#fff',
              fontSize: { xs: '2rem', md: '2.5rem' },
              mb: 2,
            }}
          >
            Contact Us
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255,255,255,0.6)',
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
            bgcolor: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 3,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            fontWeight="bold"
            sx={{
              color: '#fff',
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
                  border: '1px solid rgba(255,255,255,0.08)',
                  bgcolor: 'rgba(255,255,255,0.02)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: alpha(item.color, 0.05),
                    borderColor: alpha(item.color, 0.3),
                    transform: 'translateX(8px)',
                    '& .contact-icon': {
                      transform: 'scale(1.1) rotate(5deg)',
                      bgcolor: alpha(item.color, 0.15),
                      borderColor: alpha(item.color, 0.3),
                    },
                  },
                }}
              >
                <Box
                  className="contact-icon"
                  sx={{
                    bgcolor: alpha(item.color, 0.1),
                    p: 1.5,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `1px solid ${alpha(item.color, 0.2)}`,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    minWidth: 56,
                    minHeight: 56,
                  }}
                >
                  <Icon
                    icon={item.icon}
                    width="24"
                    style={{ color: item.color }}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'rgba(255,255,255,0.5)',
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
                      color: '#fff',
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
                  style={{
                    color: 'rgba(255,255,255,0.3)',
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

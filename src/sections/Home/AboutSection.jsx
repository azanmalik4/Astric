import React from 'react';
import { Box, Container, Typography, Grid, Stack, alpha } from '@mui/material';
import { Icon } from '@iconify/react';

const steps = [
  'Register all assets with complete financial and operational details',
  'Assign assets to sites, projects, and responsible personnel',
  'Track movements with complete audit trail and approval workflow',
  'Monitor real-time dashboard and automated depreciation calculations',
];

export default function AboutSection() {
  return (
    <Box
      id="about"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: '#1a1d29',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Decorative Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '30%',
          right: '0%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,212,170,0.08) 0%, transparent 70%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          left: '0%',
          width: 350,
          height: 350,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(74,222,128,0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Section Title */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="overline"
            sx={{
              color: '#3b82f6',
              fontSize: '0.875rem',
              fontWeight: 600,
              letterSpacing: '2px',
              mb: 2,
              display: 'block',
            }}
          >
            ABOUT US
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
            About Astaric
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
            Smart asset management designed for construction excellence
          </Typography>
        </Box>

        <Grid container spacing={6}>
          {/* Who We Are */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 4,
                borderRadius: 3,
                bgcolor: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.1)',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '4px',
                  height: '100%',
                  background: 'linear-gradient(180deg, #3b82f6 0%, #60a5fa 100%)',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Box
                  sx={{
                    bgcolor: alpha('#3b82f6', 0.1),
                    p: 1.5,
                    borderRadius: 2,
                    border: `1px solid ${alpha('#3b82f6', 0.2)}`,
                  }}
                >
                  <Icon
                    icon="mdi:information"
                    width="28"
                    style={{ color: '#3b82f6' }}
                  />
                </Box>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  sx={{ color: '#fff' }}
                >
                  Who We Are
                </Typography>
              </Box>

              <Typography
                variant="body1"
                paragraph
                sx={{
                  color: 'rgba(255,255,255,0.7)',
                  lineHeight: 1.8,
                  fontSize: '1.05rem',
                }}
              >
                Astaric is a smart fixed-asset management platform designed by ITG
                specifically for construction companies. We understand that in
                construction, assets are constantly on the move across different sites,
                teams, and projects.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(255,255,255,0.7)',
                  lineHeight: 1.8,
                  fontSize: '1.05rem',
                }}
              >
                Our platform provides real-time visibility, control, and compliance for
                all your fixed assets, ensuring nothing gets lost and everything is
                optimally utilized.
              </Typography>
            </Box>
          </Grid>

          {/* How It Works */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 4,
                borderRadius: 3,
                bgcolor: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.1)',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '4px',
                  height: '100%',
                  background: 'linear-gradient(180deg, #60a5fa 0%, #a78bfa 100%)',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Box
                  sx={{
                    bgcolor: alpha('#60a5fa', 0.1),
                    p: 1.5,
                    borderRadius: 2,
                    border: `1px solid ${alpha('#60a5fa', 0.2)}`,
                  }}
                >
                  <Icon
                    icon="mdi:cog"
                    width="28"
                    style={{ color: '#60a5fa' }}
                  />
                </Box>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  sx={{ color: '#fff' }}
                >
                  How It Works
                </Typography>
              </Box>

              <Stack spacing={3}>
                {steps.map((step, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      gap: 2,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateX(8px)',
                        '& .step-number': {
                          bgcolor: '#3b82f6',
                          transform: 'scale(1.1)',
                        },
                      },
                    }}
                  >
                    <Box
                      className="step-number"
                      sx={{
                        bgcolor: alpha('#3b82f6', 0.15),
                        color: '#3b82f6',
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                        border: `2px solid ${alpha('#3b82f6', 0.3)}`,
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    >
                      {index + 1}
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{
                        pt: 1,
                        color: 'rgba(255,255,255,0.7)',
                        lineHeight: 1.7,
                        fontSize: '1.05rem',
                      }}
                    >
                      {step}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

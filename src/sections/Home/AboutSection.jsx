import React from 'react';
import { Box, Container, Typography, Grid, Stack, alpha, useTheme } from '@mui/material';
import { Icon } from '@iconify/react';

const steps = [
  'Register all assets with complete financial and operational details',
  'Assign assets to sites, projects, and responsible personnel',
  'Track movements with complete audit trail and approval workflow',
  'Monitor real-time dashboard and automated depreciation calculations',
];

export default function AboutSection() {
  const theme = useTheme();

  return (
    <Box
      id="about"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: 'background.default',
         position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '30%',
          right: '0%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.08)} 0%, transparent 70%)`,
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
          background: `radial-gradient(circle, ${alpha(theme.palette.success.main, 0.06)} 0%, transparent 70%)`,
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      {/* Floating Icons */}
      <Box
        sx={{
          position: 'absolute',
          top: '25%',
          left: '10%',
          width: 50,
          height: 50,
          animation: 'float 11s ease-in-out infinite',
          opacity: 0.12,
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-18px)' },
          },
        }}
      >
        <Icon icon="mdi:clipboard-check" width="50" color={theme.palette.primary.main} />
      </Box>

      <Box
        sx={{
          position: 'absolute',
          bottom: '30%',
          right: '8%',
          width: 55,
          height: 55,
          animation: 'float 13s ease-in-out infinite',
          animationDelay: '1.5s',
          opacity: 0.12,
        }}
      >
        <Icon icon="mdi:chart-timeline-variant" width="55" color={theme.palette.success.main} />
      </Box>

      {/*  Geometric Shapes */}
      <Box
        sx={{
          position: 'absolute',
          top: '15%',
          right: '15%',
          width: 80,
          height: 80,
          opacity: 0.05,
          border: `2px solid ${theme.palette.primary.main}`,
          borderRadius: '12px',
          transform: 'rotate(45deg)',
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
            ABOUT US
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
            About Astaric
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
            Smart asset management designed for construction excellence
          </Typography>
        </Box>

        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 4,
                borderRadius: 3,
                bgcolor: 'background.paper',
                border: 1,
                borderColor: 'divider',
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
                  background: `linear-gradient(180deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Box
                  sx={{
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    p: 1.5,
                    borderRadius: 2,
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                  }}
                >
                  <Icon
                    icon="mdi:information"
                    width="28"
                    color={theme.palette.primary.main}
                  />
                </Box>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  sx={{ color: 'text.primary' }}
                >
                  Who We Are
                </Typography>
              </Box>

              <Typography
                variant="body1"
                paragraph
                sx={{
                  color: 'text.secondary',
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
                  color: 'text.secondary',
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

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 4,
                borderRadius: 3,
                bgcolor: 'background.paper',
                border: 1,
                borderColor: 'divider',
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
                  background: `linear-gradient(180deg, ${theme.palette.primary.light} 0%, ${theme.palette.success.main} 100%)`,
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Box
                  sx={{
                    bgcolor: alpha(theme.palette.primary.light, 0.1),
                    p: 1.5,
                    borderRadius: 2,
                    border: `1px solid ${alpha(theme.palette.primary.light, 0.2)}`,
                  }}
                >
                  <Icon
                    icon="mdi:cog"
                    width="28"
                    color={theme.palette.primary.light}
                  />
                </Box>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  sx={{ color: 'text.primary' }}
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
                          bgcolor: 'primary.main',
                          transform: 'scale(1.1)',
                        },
                      },
                    }}
                  >
                    <Box
                      className="step-number"
                      sx={{
                        bgcolor: alpha(theme.palette.primary.main, 0.15),
                        color: 'primary.main',
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                        border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    >
                      {index + 1}
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{
                        pt: 1,
                        color: 'text.secondary',
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

import React from 'react';
import {
  Box,
  Grid,
  Card,
  alpha,
  Paper,
  useTheme,
  Container,
  Typography,
  CardContent,
} from '@mui/material';
import { Icon } from '@iconify/react';

const features = [
  {
    icon: 'mdi:chart-bar',
    title: 'Asset Master',
    description:
      'Centralized digital registry of all construction equipment and tools with financial and operational details.',
  },
  {
    icon: 'mdi:map-marker',
    title: 'Site & Project Assignment',
    description:
      'Track asset location across construction sites and projects with real-time updates.',
  },
  {
    icon: 'mdi:trending-up',
    title: 'Asset Valuation',
    description:
      'Automated calculation of asset value and depreciation for finance, audit, and insurance purposes.',
  },
  {
    icon: 'mdi:shield-check',
    title: 'Audit Trail',
    description: 'Complete asset history capturing movements, assignments, and value changes.',
  },
  {
    icon: 'mdi:monitor-dashboard',
    title: 'Real-time Dashboard',
    description:
      'Live visibility into total assets, site-wise distribution, and utilization status.',
  },
  {
    icon: 'mdi:lock-check',
    title: 'Access Control',
    description: 'Secure access for Head Office, Site Management, and View-Only stakeholders.',
  },
];

const benefits = [
  'Eliminates asset loss and misuse',
  'Improves asset utilization across sites',
  'Ensures audit-ready compliance',
  'Aligns operations and finance in one system',
];

export default function FeaturesSection() {
  const theme = useTheme();

  return (
    <Box
      id="features"
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
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(
            theme.palette.primary.main,
            0.1
          )} 0%, transparent 70%)`,
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(
            theme.palette.primary.light,
            0.08
          )} 0%, transparent 70%)`,
          filter: 'blur(80px)',
          pointerEvents: 'none',
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

      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          right: '10%',
          width: 45,
          height: 45,
          animation: 'float 10s ease-in-out infinite',
          animationDelay: '2s',
          opacity: 0.15,
        }}
      >
        <Icon icon="mdi:cog" width="45" color={theme.palette.primary.main} />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          right: '25%',
          width: 100,
          height: 100,
          opacity: theme.palette.mode === 'light' ? 0.3 : 0.2,
          backgroundImage: `radial-gradient(${alpha(
            theme.palette.primary.main,
            0.5
          )} 2px, transparent 2px)`,
          backgroundSize: '20px 20px',
        }}
      />
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            mb: 8,
            bgcolor: 'background.default',
            border: 1,
            borderColor: 'divider',
            borderRadius: 3,
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
            },
          }}
        >
          <Typography
            variant="h3"
            gutterBottom
            textAlign="center"
            fontWeight="bold"
            sx={{
              color: 'text.primary',
              mb: 4,
              fontSize: { xs: '2rem', md: '2.5rem' },
            }}
          >
            Business Value Delivered
          </Typography>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {benefits.map((benefit, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2,
                    p: 2,
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                      transform: 'translateX(8px)',
                    },
                  }}
                >
                  <Box sx={{ mt: 0.5, flexShrink: 0 }}>
                    <Icon icon="mdi:check-circle" width="24" color={theme.palette.primary.main} />
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'text.primary',
                      fontSize: '1.05rem',
                      lineHeight: 1.6,
                    }}
                  >
                    {benefit}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>

        <Box sx={{ textAlign: 'center', mb: 6 }}>
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
            FEATURES
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
            Key Features
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
            Everything you need to manage your construction assets efficiently
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  bgcolor: 'background.default',
                  border: 1,
                  borderColor: 'divider',
                  borderRadius: 3,
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-12px)',
                    boxShadow: `0 20px 40px ${alpha(theme.palette.primary.main, 0.15)}`,
                    borderColor: 'primary.main',
                    '& .feature-icon': {
                      transform: 'scale(1.1) rotate(5deg)',
                      bgcolor: alpha(theme.palette.primary.main, 0.15),
                    },
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box
                    className="feature-icon"
                    sx={{
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      width: 64,
                      height: 64,
                      borderRadius: 2.5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                    }}
                  >
                    <Icon icon={feature.icon} width="32" color={theme.palette.primary.main} />
                  </Box>
                  <Typography
                    variant="h6"
                    gutterBottom
                    fontWeight="bold"
                    sx={{
                      color: 'text.primary',
                      mb: 1.5,
                      fontSize: '1.25rem',
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      lineHeight: 1.7,
                      fontSize: '0.95rem',
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

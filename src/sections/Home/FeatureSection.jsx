// ============================================
// FILE: src/pages/home/components/FeaturesSection.jsx
// ============================================

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  alpha,
} from '@mui/material';
import { Icon } from '@iconify/react';

const features = [
  {
    icon: 'mdi:chart-bar',
    title: 'Asset Master',
    description:
      'Centralized digital registry of all construction equipment and tools with financial and operational details.',
    color: '#3b82f6',
  },
  {
    icon: 'mdi:map-marker',
    title: 'Site & Project Assignment',
    description:
      'Track asset location across construction sites and projects with real-time updates.',
    color: '#60a5fa',
  },
  {
    icon: 'mdi:trending-up',
    title: 'Asset Valuation',
    description:
      'Automated calculation of asset value and depreciation for finance, audit, and insurance purposes.',
    color: '#a78bfa',
  },
  {
    icon: 'mdi:shield-check',
    title: 'Audit Trail',
    description:
      'Complete asset history capturing movements, assignments, and value changes.',
    color: '#4ade80',
  },
  {
    icon: 'mdi:monitor-dashboard',
    title: 'Real-time Dashboard',
    description:
      'Live visibility into total assets, site-wise distribution, and utilization status.',
    color: '#fbbf24',
  },
  {
    icon: 'mdi:lock-check',
    title: 'Access Control',
    description:
      'Secure access for Head Office, Site Management, and View-Only stakeholders.',
    color: '#ff6b6b',
  },
];

const benefits = [
  'Eliminates asset loss and misuse',
  'Improves asset utilization across sites',
  'Ensures audit-ready compliance',
  'Aligns operations and finance in one system',
];

export default function FeaturesSection() {
  return (
    <Box
      id="features"
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
          top: '10%',
          right: '5%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,212,170,0.1) 0%, transparent 70%)',
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
          background: 'radial-gradient(circle, rgba(96,165,250,0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Business Value Card */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            mb: 8,
            bgcolor: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
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
              background: 'linear-gradient(90deg, #3b82f6 0%, #60a5fa 50%, #a78bfa 100%)',
            },
          }}
        >
          <Typography
            variant="h3"
            gutterBottom
            textAlign="center"
            fontWeight="bold"
            sx={{
              color: '#fff',
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
                      bgcolor: 'rgba(0,212,170,0.05)',
                      transform: 'translateX(8px)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      mt: 0.5,
                      flexShrink: 0,
                    }}
                  >
                    <Icon
                      icon="mdi:check-circle"
                      width="24"
                      style={{ color: '#3b82f6' }}
                    />
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'rgba(255,255,255,0.8)',
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

        {/* Section Title */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
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
            FEATURES
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
            Key Features
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
            Everything you need to manage your construction assets efficiently
          </Typography>
        </Box>

        {/* Features Grid */}
        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  bgcolor: 'rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 3,
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `radial-gradient(circle at top left, ${alpha(feature.color, 0.1)} 0%, transparent 60%)`,
                    opacity: 0,
                    transition: 'opacity 0.4s ease',
                  },
                  '&:hover': {
                    transform: 'translateY(-12px)',
                    boxShadow: `0 20px 40px ${alpha(feature.color, 0.15)}`,
                    borderColor: alpha(feature.color, 0.3),
                    '&::before': {
                      opacity: 1,
                    },
                    '& .feature-icon': {
                      transform: 'scale(1.1) rotate(5deg)',
                      bgcolor: alpha(feature.color, 0.15),
                    },
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box
                    className="feature-icon"
                    sx={{
                      bgcolor: alpha(feature.color, 0.1),
                      width: 64,
                      height: 64,
                      borderRadius: 2.5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      border: `1px solid ${alpha(feature.color, 0.2)}`,
                    }}
                  >
                    <Icon
                      icon={feature.icon}
                      width="32"
                      style={{ color: feature.color }}
                    />
                  </Box>
                  <Typography
                    variant="h6"
                    gutterBottom
                    fontWeight="bold"
                    sx={{
                      color: '#fff',
                      mb: 1.5,
                      fontSize: '1.25rem',
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgba(255,255,255,0.6)',
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

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BarChartIcon from '@mui/icons-material/BarChart';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SecurityIcon from '@mui/icons-material/Security';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const features = [
  {
    icon: <BarChartIcon sx={{ fontSize: 40 }} />,
    title: 'Asset Master',
    description:
      'Centralized digital registry of all construction equipment and tools with financial and operational details.',
  },
  {
    icon: <LocationOnIcon sx={{ fontSize: 40 }} />,
    title: 'Site & Project Assignment',
    description:
      'Track asset location across construction sites and projects with real-time updates.',
  },
  {
    icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
    title: 'Asset Valuation',
    description:
      'Automated calculation of asset value and depreciation for finance, audit, and insurance purposes.',
  },
  {
    icon: <SecurityIcon sx={{ fontSize: 40 }} />,
    title: 'Audit Trail',
    description:
      'Complete asset history capturing movements, assignments, and value changes.',
  },
  {
    icon: <VisibilityIcon sx={{ fontSize: 40 }} />,
    title: 'Real-time Dashboard',
    description:
      'Live visibility into total assets, site-wise distribution, and utilization status.',
  },
  {
    icon: <CheckCircleIcon sx={{ fontSize: 40 }} />,
    title: 'Access Control',
    description:
      'Secure access for Head Office, Site Management, and View-Only stakeholders.',
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
    <Box id="features" sx={{ py: { xs: 6, md: 10 }, bgcolor: 'grey.50' }}>
      <Container maxWidth="lg">
        {/* Business Value Card */}
        <Paper elevation={3} sx={{ p: 4, mb: 6 }}>
          <Typography
            variant="h4"
            gutterBottom
            textAlign="center"
            fontWeight="bold"
          >
            Business Value Delivered
          </Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {benefits.map((benefit, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <CheckCircleIcon color="success" />
                  <Typography variant="body1">{benefit}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Features Grid */}
        <Typography
          variant="h4"
          gutterBottom
          textAlign="center"
          fontWeight="bold"
          sx={{ mb: 6 }}
        >
          Key Features
        </Typography>
        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      bgcolor: 'primary.light',
                      width: 64,
                      height: 64,
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                      color: 'primary.main',
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
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

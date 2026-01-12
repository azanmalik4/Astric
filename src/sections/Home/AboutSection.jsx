import React from 'react';
import { Box, Container, Typography, Grid, Stack } from '@mui/material';

const steps = [
  'Register all assets with complete financial and operational details',
  'Assign assets to sites, projects, and responsible personnel',
  'Track movements with complete audit trail and approval workflow',
  'Monitor real-time dashboard and automated depreciation calculations',
];

export default function AboutSection() {
  return (
    <Box id="about" sx={{ py: { xs: 6, md: 10 }, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          gutterBottom
          textAlign="center"
          fontWeight="bold"
          sx={{ mb: 6 }}
        >
          About Astric
        </Typography>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              Who We Are
            </Typography>
            <Typography variant="body1" paragraph color="text.secondary">
              Astaric is a smart fixed-asset management platform designed by ITG
              specifically for construction companies. We understand that in
              construction, assets are constantly on the move across different sites,
              teams, and projects.
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Our platform provides real-time visibility, control, and compliance for
              all your fixed assets, ensuring nothing gets lost and everything is
              optimally utilized.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              How It Works
            </Typography>
            <Stack spacing={3}>
              {steps.map((step, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 2 }}>
                  <Box
                    sx={{
                      bgcolor: 'primary.main',
                      color: 'white',
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      fontWeight: 'bold',
                    }}
                  >
                    {index + 1}
                  </Box>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ pt: 1 }}
                  >
                    {step}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

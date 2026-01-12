import React from 'react';
import { Box, Container, Typography, Paper, Stack } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';

const contactInfo = [
  { icon: <EmailIcon />, text: 'info@itgllc.ae', label: 'Email' },
  { icon: <PhoneIcon />, text: '+971 56 863 8858', label: 'Phone' },
  { icon: <LanguageIcon />, text: 'www.itgllc.ae', label: 'Website' },
];

export default function ContactSection() {
  return (
    <Box id="contact" sx={{ py: { xs: 6, md: 10 }, bgcolor: 'grey.50' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          gutterBottom
          textAlign="center"
          fontWeight="bold"
          sx={{ mb: 6 }}
        >
          Contact Us
        </Typography>
        <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
          <Typography variant="h5" gutterBottom fontWeight="bold">
            Get in Touch
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            We'd love to hear from you. Reach out to learn more about Astaric.
          </Typography>
          <Stack spacing={3}>
            {contactInfo.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  p: 2,
                  borderRadius: 1,
                  transition: 'all 0.3s',
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
              >
                <Box
                  sx={{
                    bgcolor: 'primary.light',
                    p: 1.5,
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'primary.main',
                  }}
                >
                  {item.icon}
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    {item.label}
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {item.text}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}

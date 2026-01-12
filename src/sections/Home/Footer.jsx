import React from 'react';
import { Box, Container, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box
      sx={{
        bgcolor: 'grey.900',
        color: 'white',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" textAlign="center" color="grey.400">
          © {new Date().getFullYear()} Astaric by ITG. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}

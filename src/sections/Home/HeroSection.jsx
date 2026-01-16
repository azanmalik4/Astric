import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Avatar,
  AvatarGroup,
  Chip,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <Box
      id="hero"
      sx={{
        position: 'relative',
        minHeight: { xs: 'calc(100vh - 64px)', md: 'calc(100vh - 72px)' },
        bgcolor: '#1a1d29',
        color: 'white',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        py: { xs: 8, md: 12 },
      }}
    >
      {/* Animated Background Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: 20,
          height: 20,
          borderRadius: '50%',
          bgcolor: '#ff6b6b',
          animation: 'float 6s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-20px)' },
          },
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '70%',
          left: '8%',
          width: 16,
          height: 16,
          borderRadius: '50%',
          bgcolor: '#ffd93d',
          animation: 'float 8s ease-in-out infinite',
          animationDelay: '1s',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '25%',
          right: '10%',
          width: 24,
          height: 24,
          borderRadius: '50%',
          bgcolor: '#a78bfa',
          animation: 'float 7s ease-in-out infinite',
          animationDelay: '2s',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '15%',
          right: '15%',
          width: 18,
          height: 18,
          borderRadius: '50%',
          bgcolor: '#4ade80',
          animation: 'float 9s ease-in-out infinite',
          animationDelay: '0.5s',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '60%',
          right: '5%',
          width: 14,
          height: 14,
          borderRadius: '50%',
          bgcolor: '#60a5fa',
          animation: 'float 10s ease-in-out infinite',
          animationDelay: '3s',
        }}
      />

      <Container maxWidth="lg">
        <Box
          sx={{
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem', lg: '5.5rem' },
              fontWeight: 800,
              lineHeight: 1.1,
              mb: 3,
              letterSpacing: '-2px',
            }}
          >
            <Box component="span" sx={{ color: 'rgba(255,255,255,0.4)' }}>
              Boost your building
            </Box>
            <br />
            <Box component="span" sx={{ color: '#fff' }}>
              process with{' '}
            </Box>
            <Box
              component="span"
              sx={{
                color: '#3b82f6',
                position: 'relative',
                display: 'inline-block',
              }}
            >
              Astaric
            </Box>
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="h6"
            sx={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: { xs: '1rem', md: '1.25rem' },
              maxWidth: '900px',
              mx: 'auto',
              mb: 1,
              fontWeight: 400,
              lineHeight: 1.6,
            }}
          >
            Astaric is a smart fixed-asset management platform designed by ITG specifically for
            construction
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: { xs: '1rem', md: '1.25rem' },
              maxWidth: '850px',
              mx: 'auto',
              mb: 5,
              fontWeight: 400,
              lineHeight: 1.6,
            }}
          >
             companies, where assets constantly move across sites, teams, and projects.
          </Typography>

          {/* Happy Customers */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              mb: 5,
            }}
          >
            <AvatarGroup
              max={3}
              sx={{
                '& .MuiAvatar-root': {
                  width: 40,
                  height: 40,
                  border: '2px solid #1a1d29',
                  fontSize: '0.875rem',
                },
              }}
            >
              <Avatar sx={{ bgcolor: '#ff6b6b' }}>JD</Avatar>
              <Avatar sx={{ bgcolor: '#4ade80' }}>AS</Avatar>
              <Avatar sx={{ bgcolor: '#60a5fa' }}>MK</Avatar>
            </AvatarGroup>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255,255,255,0.7)',
                fontWeight: 500,
              }}
            >
              160+ Happy customers
            </Typography>
          </Box>

          {/* CTA Buttons */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            sx={{ mb: 6 }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<Icon icon="mdi:lightning-bolt" width="20" />}
              onClick={() => navigate('auth/jwt/login')}
              sx={{
                bgcolor: '#fff',
                color: '#1a1d29',
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: 2,
                textTransform: 'none',
                boxShadow: '0 8px 24px rgba(255,255,255,0.15)',
                '&:hover': {
                  bgcolor: '#f0f0f0',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 28px rgba(255,255,255,0.2)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <Box>
                Live preview
                <Typography
                  variant="caption"
                  sx={{
                    display: 'block',
                    fontSize: '0.7rem',
                    opacity: 0.6,
                  }}
                >
                  v7.6.1
                </Typography>
              </Box>
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<Icon icon="mdi:vector-square" width="20" />}
              sx={{
                borderColor: 'rgba(255,255,255,0.2)',
                color: '#fff',
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: 2,
                textTransform: 'none',
                '&:hover': {
                  borderColor: 'rgba(255,255,255,0.4)',
                  bgcolor: 'rgba(255,255,255,0.05)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Figma preview
            </Button>
          </Stack>

          {/* Try Free Version Link */}
          <Button
            startIcon={<Icon icon="mdi:open-in-new" width="16" />}
            sx={{
              color: 'rgba(255,255,255,0.5)',
              textTransform: 'none',
              fontSize: '0.9rem',
              '&:hover': {
                color: '#3b82f6',
                bgcolor: 'transparent',
              },
            }}
          >
            Try free version
          </Button>

          {/* Available For */}
          <Box sx={{ mt: 8 }}>
            <Typography
              variant="caption"
              sx={{
                color: 'rgba(255,255,255,0.4)',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                fontSize: '0.75rem',
                fontWeight: 600,
                mb: 3,
                display: 'block',
              }}
            >
              Available For
            </Typography>
            <Stack
              direction="row"
              spacing={3}
              justifyContent="center"
              sx={{
                '& .MuiChip-root': {
                  bgcolor: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.08)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                },
              }}
            >
              <Chip
                icon={<Icon icon="logos:javascript" width="20" />}
                label="JS"
                sx={{ color: 'rgba(255,255,255,0.8)' }}
              />
              <Chip
                icon={<Icon icon="logos:typescript-icon" width="20" />}
                label="TS"
                sx={{ color: 'rgba(255,255,255,0.8)' }}
              />
              <Chip
                icon={<Icon icon="logos:nextjs-icon" width="20" />}
                label="Next"
                sx={{ color: 'rgba(255,255,255,0.8)' }}
              />
              <Chip
                icon={<Icon icon="logos:vitejs" width="20" />}
                label="Vite"
                sx={{ color: 'rgba(255,255,255,0.8)' }}
              />
              <Chip
                icon={<Icon icon="logos:figma" width="20" />}
                label="Figma"
                sx={{ color: 'rgba(255,255,255,0.8)' }}
              />
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

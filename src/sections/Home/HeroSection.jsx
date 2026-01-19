import React from 'react';
import {
  Box,
  Chip,
  alpha,
  Stack,
  Avatar,
  Button,
  Container,
  Typography,
  AvatarGroup,
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
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.03,
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 35px,
            rgba(255,165,0,0.4) 35px,
            rgba(255,165,0,0.4) 70px
          )`,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '15%',
          left: '8%',
          width: 60,
          height: 60,
          animation: 'float 8s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
            '50%': { transform: 'translateY(-20px) rotate(10deg)' },
          },
        }}
      >
        <Icon icon="mdi:hammer-wrench" width="60" style={{ color: '#ff9800', opacity: 0.2 }} />
      </Box>

      <Box
        sx={{
          position: 'absolute',
          top: '60%',
          left: '5%',
          width: 50,
          height: 50,
          animation: 'float 10s ease-in-out infinite',
          animationDelay: '2s',
        }}
      >
        <Icon icon="mdi:excavator" width="50" style={{ color: '#ffc107', opacity: 0.2 }} />
      </Box>

      <Box
        sx={{
          position: 'absolute',
          top: '30%',
          right: '10%',
          width: 70,
          height: 70,
          animation: 'float 9s ease-in-out infinite',
          animationDelay: '1s',
        }}
      >
        <Icon icon="mdi:crane" width="70" style={{ color: '#ff9800', opacity: 0.15 }} />
      </Box>

      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          right: '12%',
          width: 55,
          height: 55,
          animation: 'float 11s ease-in-out infinite',
          animationDelay: '3s',
        }}
      >
        <Icon icon="mdi:hard-hat" width="55" style={{ color: '#ffc107', opacity: 0.2 }} />
      </Box>

      {/* Glowing Orbs - Construction Colors */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          right: '15%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,212,170,0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'pulse 4s ease-in-out infinite',
          '@keyframes pulse': {
            '0%, 100%': { opacity: 0.5, transform: 'scale(1)' },
            '50%': { opacity: 0.8, transform: 'scale(1.1)' },
          },
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          left: '10%',
          width: 350,
          height: 350,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(96,165,250,0.12) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'pulse 5s ease-in-out infinite',
          animationDelay: '1s',
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
          {/* Construction Badge */}
          <Chip
            icon={<Icon icon="mdi:factory" width="18" />}
            label="Construction Asset Management"
            sx={{
              mb: 3,
              bgcolor: alpha('#00d4aa', 0.15),
              color: '#00d4aa',
              border: `1px solid ${alpha('#00d4aa', 0.3)}`,
              fontWeight: 600,
              fontSize: '0.875rem',
              '& .MuiChip-icon': {
                color: '#ff9800',
              },
            }}
          />
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem', lg: '5.5rem' },
              fontWeight: 700,
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
                background: 'linear-gradient(135deg, #00d4aa 0%, #60a5fa 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                position: 'relative',
                display: 'inline-block',
              }}
            >
              Astaric
              {/* Underline decoration */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: 'linear-gradient(135deg, #00d4aa 0%, #60a5fa 100%)',
                  borderRadius: 2,
                }}
              />
            </Box>
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: { xs: '1rem', md: '1.25rem' },
              maxWidth: '850px',
              mx: 'auto',
              mb: 1,
              fontWeight: 400,
              lineHeight: 1.6,
            }}
          >
            Astaric is a smart fixed-asset management platform designed by ITG specifically for

          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: { xs: '1rem', md: '1.25rem' },
              maxWidth: '800px',
              mx: 'auto',
              mb: 5,
              fontWeight: 400,
              lineHeight: 1.6,
            }}
          >
           construction companies,where assets constantly move across sites, teams, and projects.
          </Typography>

          {/* Happy Customers with Construction Theme */}
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
              <Avatar sx={{ bgcolor: '#00d4aa' }}>
                <Icon icon="mdi:account-hard-hat" width="24" />
              </Avatar>
              <Avatar sx={{ bgcolor: '#60a5fa' }}>
                <Icon icon="mdi:engineer" width="24" />
              </Avatar>
              <Avatar sx={{ bgcolor: '#4ade80' }}>
                <Icon icon="mdi:account-tie" width="24" />
              </Avatar>
            </AvatarGroup>
            <Box sx={{ textAlign: 'left' }}>
              <Typography
                variant="body1"
                sx={{
                  color: '#fff',
                  fontWeight: 600,
                  lineHeight: 1.2,
                }}
              >
                160+ Happy customers
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: 'rgba(255,255,255,0.5)',
                }}
              >
                Construction companies worldwide
              </Typography>
            </Box>
          </Box>

          {/* CTA Buttons - Construction Themed */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            sx={{ mb: 6 }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<Icon icon="mdi:rocket-launch" width="22" />}
              onClick={() => navigate('auth/jwt/login')}
              sx={{
                background: 'linear-gradient(135deg, #00d4aa 0%, #60a5fa 100%)',
                color: '#fff',
                px: 5,
                py: 1.8,
                fontSize: '1.05rem',
                fontWeight: 600,
                borderRadius: 2,
                textTransform: 'none',
                boxShadow: '0 8px 32px rgba(0,212,170,0.35)',
                border: 'none',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  background: 'linear-gradient(135deg, #60a5fa 0%, #00d4aa 100%)',
                  boxShadow: '0 12px 40px rgba(0,212,170,0.45)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Get Started Free
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<Icon icon="mdi:play-circle" width="22" />}
              onClick={() => {
                const element = document.getElementById('features');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              sx={{
                borderColor: '#00d4aa',
                borderWidth: 2,
                color: '#00d4aa',
                px: 5,
                py: 1.8,
                fontSize: '1.05rem',
                fontWeight: 600,
                borderRadius: 2,
                textTransform: 'none',
                '&:hover': {
                  borderWidth: 2,
                  borderColor: '#00d4aa',
                  bgcolor: alpha('#00d4aa', 0.1),
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Watch Demo
            </Button>
          </Stack>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 2, sm: 4 },
              justifyContent: 'center',
              alignItems: 'center',
              mb: 8,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Icon icon="mdi:shield-check" width="24" style={{ color: '#4ade80' }} />
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                ISO Certified
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Icon icon="mdi:chart-line" width="24" style={{ color: '#60a5fa' }} />
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                98% Accuracy Rate
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Icon icon="mdi:account-group" width="24" style={{ color: '#a78bfa' }} />
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                24/7 Support
              </Typography>
            </Box>
          </Box>

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
              Trusted By Industry Leaders
            </Typography>
            <Stack
              direction="row"
              spacing={3}
              justifyContent="center"
              flexWrap="wrap"
              sx={{
                gap: 2,
                '& .MuiChip-root': {
                  bgcolor: 'rgba(0,212,170,0.08)',
                  border: '1px solid rgba(0,212,170,0.2)',
                  '&:hover': {
                    bgcolor: 'rgba(0,212,170,0.15)',
                    borderColor: '#00d4aa',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                },
              }}
            >
              <Chip
                icon={<Icon icon="mdi:office-building" width="20" style={{ color: '#00d4aa' }} />}
                label="Large Enterprises"
                sx={{ color: 'rgba(255,255,255,0.8)' }}
              />
              <Chip
                icon={<Icon icon="mdi:account-hard-hat" width="20" style={{ color: '#00d4aa' }} />}
                label="Contractors"
                sx={{ color: 'rgba(255,255,255,0.8)' }}
              />
              <Chip
                icon={<Icon icon="mdi:factory" width="20" style={{ color: '#00d4aa' }} />}
                label="Site Managers"
                sx={{ color: 'rgba(255,255,255,0.8)' }}
              />
              <Chip
                icon={<Icon icon="mdi:briefcase" width="20" style={{ color: '#00d4aa' }} />}
                label="Project Teams"
                sx={{ color: 'rgba(255,255,255,0.8)' }}
              />
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

import React from 'react';
import {
  Box,
  Chip,
  Stack,
  alpha,
  Button,
  Avatar,
  useTheme,
  Container,
  Typography,
  AvatarGroup,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box
      id="hero"
      sx={{
        position: 'relative',
        minHeight: { xs: 'calc(100vh - 64px)', md: 'calc(100vh - 72px)' },
        bgcolor: 'background.default',
        color: 'text.primary',
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
          opacity: theme.palette.mode === 'light' ? 0.02 : 0.03,
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 35px,
            ${alpha(theme.palette.primary.main, 0.4)} 35px,
            ${alpha(theme.palette.primary.main, 0.4)} 70px
          )`,
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
          <Chip
            icon={<Icon icon="mdi:factory" width="18" />}
            label="Construction Asset Management"
            sx={{
              mb: 3,
              bgcolor: alpha(theme.palette.primary.main, 0.15),
              color: 'primary.main',
              border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
              fontWeight: 600,
              fontSize: '0.875rem',
              '& .MuiChip-icon': {
                color: 'primary.main',
              },
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
              opacity: 0.2,
              '@keyframes float': {
                '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                '50%': { transform: 'translateY(-20px) rotate(10deg)' },
              },
            }}
          >
            <Icon icon="mdi:hammer-wrench" width="60" color={theme.palette.primary.main} />
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
              opacity: 0.2,
            }}
          >
            <Icon icon="mdi:excavator" width="50" color={theme.palette.warning.main} />
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
              opacity: 0.15,
            }}
          >
            <Icon icon="mdi:crane" width="70" color={theme.palette.primary.main} />
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
              opacity: 0.2,
            }}
          >
            <Icon icon="mdi:hard-hat" width="55" color={theme.palette.warning.main} />
          </Box>

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
            <Box component="span" sx={{ color: 'text.secondary', opacity: 0.6 }}>
              Boost your building
            </Box>
            <br />
            <Box component="span" sx={{ color: 'text.primary' }}>
              process with{' '}
            </Box>
            <Box
              component="span"
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                position: 'relative',
                display: 'inline-block',
              }}
            >
              Astaric
              <Box
                sx={{
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
                  borderRadius: 2,
                }}
              />
            </Box>
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: 'text.secondary',
              fontSize: { xs: '1rem', md: '1.25rem' },
              maxWidth: '900px',
              mx: 'auto',
              mb: 1,
              fontWeight: 400,
              lineHeight: 1.6,
            }}
          >
            Astaric is a smart fixed-asset management platform designed by ITG specifically for  construction

          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'text.secondary',
              fontSize: { xs: '1rem', md: '1.25rem' },
              maxWidth: '800px',
              mx: 'auto',
              mb: 5,
              fontWeight: 400,
              lineHeight: 1.6,
            }}
          >
           companies,where assets constantly move across sites, teams, and projects.
          </Typography>

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
                  border: `2px solid ${theme.palette.background.default}`,
                  fontSize: '0.875rem',
                },
              }}
            >
              <Avatar sx={{ bgcolor: 'primary.main' }}>
                <Icon icon="mdi:account-hard-hat" width="24" />
              </Avatar>
              <Avatar sx={{ bgcolor: 'primary.light' }}>
                <Icon icon="mdi:engineer" width="24" />
              </Avatar>
              <Avatar sx={{ bgcolor: 'success.main' }}>
                <Icon icon="mdi:account-tie" width="24" />
              </Avatar>
            </AvatarGroup>
            <Box sx={{ textAlign: 'left' }}>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.primary',
                  fontWeight: 600,
                  lineHeight: 1.2,
                }}
              >
                160+ Happy customers
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: 'text.secondary',
                }}
              >
                Construction companies worldwide
              </Typography>
            </Box>
          </Box>

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
                px: 5,
                py: 1.8,
                fontSize: '1.05rem',
                fontWeight: 600,
                borderRadius: 2,
                textTransform: 'none',
                boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.35)}`,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.45)}`,
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
                borderWidth: 2,
                px: 5,
                py: 1.8,
                fontSize: '1.05rem',
                fontWeight: 600,
                borderRadius: 2,
                textTransform: 'none',
                '&:hover': {
                  borderWidth: 2,
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
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
              <Icon icon="mdi:shield-check" width="24" color={theme.palette.success.main} />
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                ISO Certified
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Icon icon="mdi:chart-line" width="24" color={theme.palette.info.main} />
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                98% Accuracy Rate
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Icon icon="mdi:account-group" width="24" color={theme.palette.primary.main} />
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                24/7 Support
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mt: 8 }}>
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                opacity: 0.6,
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
                  bgcolor: alpha(theme.palette.primary.main, 0.08),
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.15),
                    transform: 'translateY(-2px)',
                    borderColor: 'primary.main',
                  },
                  transition: 'all 0.3s ease',
                },
              }}
            >
              <Chip
                icon={
                  <Icon
                    icon="mdi:office-building"
                    width="20"
                    style={{ color: theme.palette.primary.main }}
                  />
                }
                label="Large Enterprises"
                sx={{ color: 'text.primary' }}
              />
              <Chip
                icon={
                  <Icon
                    icon="mdi:account-hard-hat"
                    width="20"
                    style={{ color: theme.palette.primary.main }}
                  />
                }
                label="Contractors"
                sx={{ color: 'text.primary' }}
              />
              <Chip
                icon={
                  <Icon
                    icon="mdi:factory"
                    width="20"
                    style={{ color: theme.palette.primary.main }}
                  />
                }
                label="Site Managers"
                sx={{ color: 'text.primary' }}
              />
              <Chip
                icon={
                  <Icon
                    icon="mdi:briefcase"
                    width="20"
                    style={{ color: theme.palette.primary.main }}
                  />
                }
                label="Project Teams"
                sx={{ color: 'text.primary' }}
              />
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}



import React from 'react';
import { Box } from '@mui/material';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import FeaturesSection from './FeatureSection';
import AboutSection from './AboutSection';
import ContactSection from './ContactSection';
import Footer from './Footer';

export default function HomeView() {
  return (
    <Box>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </Box>
  );
}

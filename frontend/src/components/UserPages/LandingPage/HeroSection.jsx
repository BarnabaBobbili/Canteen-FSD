import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import HeroBackground from './HeroSection/HeroBackground';
import HeroBadge from './HeroSection/HeroBadge';
import HeroTitle from './HeroSection/HeroTitle';
import HeroDescription from './HeroSection/HeroDescription';
import HeroCTAButtons from './HeroSection/HeroCTAButtons';
import HeroStats from './HeroSection/HeroStats';
import HeroSVGFilters from './HeroSection/HeroSVGFilters';

/**
 * Hero section component for landing page
 * Manga-style hero with decorative elements
 */
const HeroSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="relative pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-20 overflow-hidden">
      <HeroBackground />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-center items-center">
          {/* Hero Content */}
          <div className="text-center max-w-4xl">
            <HeroBadge />
            <HeroTitle />
            <HeroDescription />
            <HeroCTAButtons
              user={user}
              onOrderClick={() => navigate('/order')}
              onSignInClick={() => navigate('/login')}
            />
            <HeroStats />
          </div>
        </div>
      </div>

      <HeroSVGFilters />
    </div>
  );
};

export default HeroSection;

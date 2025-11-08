import React from 'react';
import StickyNav from './StickyNav';
import HeroSection from './HeroSection';
import SpecialsSection from './SpecialsSection';
import CategorySection from './CategorySection';
import HowItWorksSection from './HowItWorksSection';
import FeaturesSection from './FeaturesSection';
import CTASection from './CTASection';
import Footer from '../Shared/Footer';

/**
 * Main landing page orchestrator
 * Composed of modular components following CLAUDE.md patterns
 * @refactored from 495 lines → 30 lines
 */
const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white relative" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='%23fafafa'/%3E%3Cpath d='M10 10h80v80H10z' fill='none' stroke='%23e5e5e5' stroke-width='0.5'/%3E%3C/svg%3E")`,
      fontFamily: '"Comic Sans MS", "Marker Felt", cursive'
    }}>
      <StickyNav />
      <HeroSection />
      <SpecialsSection />
      <CategorySection />
      <HowItWorksSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default LandingPage;

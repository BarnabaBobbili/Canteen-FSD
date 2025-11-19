import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LandingNav from './LandingNav';
import HeroSection from './HeroSection';
import DesignedForSection from './DesignedForSection';
import OrganizeSection from './OrganizeSection';
import BigPictureSection from './BigPictureSection';
import ConnectSearchSection from './ConnectSearchSection';
import BackupSection from './BackupSection';
import TeamSecuritySection from './TeamSecuritySection';
import SafetyPricingSection from './SafetyPricingSection';
import PlatformsSection from './PlatformsSection';
import MoreFeaturesSection from './MoreFeaturesSection';
import FooterSection from './FooterSection';

const ContactUs = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Load raindrop.io CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/raindrop/raindrop-styles.css';
    document.head.appendChild(link);

    return () => {
      // Cleanup: remove the CSS when component unmounts
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="undefined">
      <LandingNav />
      <div className="landing2Gps">
        <HeroSection
          onGetStarted={() => navigate('/signup')}
          onViewDemo={() => navigate('/demo')}
        />
        <DesignedForSection />
        <OrganizeSection />
        <BigPictureSection />
        <ConnectSearchSection />
        <BackupSection />
        <TeamSecuritySection />
        <SafetyPricingSection />
        <PlatformsSection />
        <MoreFeaturesSection />
      </div>
      <FooterSection />
    </div>
  );
};

export default ContactUs;

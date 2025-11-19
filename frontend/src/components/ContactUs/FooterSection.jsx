import React from 'react';
import { UtensilsCrossed } from 'lucide-react';

const FooterSection = () => {
  return (
    <footer className="footerSy6B">
      <div className="contentoxL5 layout2ACP">
        <menu>
          <li><a href="/docs/analytics">Features</a></li>
          <li><a href="/docs/pricing">Pricing</a></li>
          <li><a href="/docs/dashboard">Demo</a></li>
          <li><a href="/signup">Get Started</a></li>
        </menu>
        <menu>
          <li><a href="/docs/about">About Us</a></li>
          <li><a href="/docs/contact">Contact Sales</a></li>
          <li><a href="/docs/welcome">Help Center</a></li>
          <li><a href="/docs/faq">FAQ</a></li>
        </menu>
        <div className="copy2CzI">
          <div className="logo1Thp">
            <UtensilsCrossed size={24} color="#000" style={{ opacity: 0.8 }} />
          </div>
          <div className="about1uw1">
            <h5>CanteenDelight</h5>
            <p>Complete Canteen Management Solution</p>
            © 2024 - 2025 CanteenDelight
            <br />
            <a href="/docs/contact">Support</a>
            <a href="/docs/terms">Terms</a>
            <a href="/docs/privacy">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;

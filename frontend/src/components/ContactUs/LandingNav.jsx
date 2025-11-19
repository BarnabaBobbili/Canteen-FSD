import React from 'react';
import { UtensilsCrossed } from 'lucide-react';

const LandingNav = () => {
  return (
    <header className="header1jtx">
      <div className="contentoxL5 toolbar2CHY">
        <div className="logoZTSe">
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            <UtensilsCrossed size={28} color="#000" style={{ opacity: 0.8 }} />
            <span style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#000',
              opacity: 0.8
            }}>
              CanteenDelight
            </span>
          </a>
        </div>
        <menu className="nav4SBj">
          <li data-active="false"><a href="/docs/analytics">Features</a></li>
          <li data-active="false"><a href="/docs/pricing">Pricing</a></li>
          <li data-active="false"><a href="/demo">Demo</a></li>
          <li data-active="false"><a href="/docs/contact">Contact</a></li>
        </menu>
      </div>
    </header>
  );
};

export default LandingNav;

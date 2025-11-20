import React from 'react';

const ConnectSearchSection = () => {
  return (
    <div className="contentoxL5">
      <div className="columns2vfz">
        <div>
          <h2>Seamless Integration</h2>
          <blockquote>
            Connect with payment gateways, POS systems, and accounting software.
            <br /><br />
            Ready for future integrations with QR code ordering and mobile payments.
            <br /><br />
            <a className="link3Vpv" href="/docs/api-docs">API Documentation</a>
            <a href="/docs/integrations" className="link3Vpv">Integrations</a>
          </blockquote>
        </div>
        <div>
          <h2>Advanced Search & Filters</h2>
          <blockquote>
            Quickly find orders, menu items, inventory, and transactions with powerful search.
            <br /><br />
            Filter by date range, order type, payment method, status, and more.
            <br /><br />
            <a href="/docs/search-filters" className="link3Vpv">Learn more…</a>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default ConnectSearchSection;

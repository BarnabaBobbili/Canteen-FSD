import React, { useState } from 'react';

const BigPictureSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      title: 'Real-time Analytics',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
          <path d="M4 16h1.414l7.314-7.343-1.414-1.414L4 14.557V16zm13 2H3a1 1 0 0 1-1-1v-2.858a1 1 0 0 1 .293-.707L13.435 2.293a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L8.243 16H17a1 1 0 0 1 0 2zM14.142 7.243l1.414-1.414-1.414-1.414-1.414 1.414 1.414 1.414z"></path>
        </svg>
      ),
      description: (
        <span>Visualize sales, revenue, and order trends with interactive charts. Track daily performance at a glance.</span>
      ),
      imageUrl: '/media/realtime-analytics.png',
      imageWidth: 684,
      imageHeight: 500
    },
    {
      title: 'Order Status Tracking',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
          <path d="M10 3c3 0 6 2.333 9 7-3 4.667-6 7-9 7s-6-2.333-9-7c3-4.667 6-7 9-7zm0 2c-1.97 0-4.198 1.592-6.592 5C5.802 13.408 8.03 15 10 15c1.97 0 4.198-1.592 6.592-5C14.198 6.592 11.97 5 10 5zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" opacity=".9"></path>
        </svg>
      ),
      description: (
        <span>Monitor all orders in real-time. See pending, preparing, ready, and completed orders with live updates.</span>
      ),
      imageUrl: '/media/order-status-tracking.png',
      imageWidth: 684,
      imageHeight: 500
    },
    {
      title: 'Payment Insights',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
          <path d="M8 11a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h5zm7 4v2h-4v-2h4zm-8-2H4v3h3v-3zm11-2v2h-7v-2h7zM8 2a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h5zm7 4v2h-4V6h4zM7 4H4v3h3V4zm11-2v2h-7V2h7z"></path>
        </svg>
      ),
      description: (
        <span>Track payments by method (cash, card, UPI, online). View transaction history and revenue breakdowns.</span>
      ),
      imageUrl: '/media/payment-insights.png',
      imageWidth: 684,
      imageHeight: 500
    }
  ];

  return (
    <div className="blob1U5Q right3x0m glanceKYug">
      <div className="grid178A">
        <div>
          <h2>Real-Time Insights & Analytics</h2>
          <blockquote>All critical metrics and operational data visible at a glance, so you can make informed decisions fast.</blockquote>
          <div className="sectionsmNlL">
            {tabs.map((tab, index) => (
              <div
                key={index}
                className="item2omU"
                tabIndex="0"
                {...(activeTab === index && { 'data-active': true })}
                onMouseEnter={() => setActiveTab(index)}
                onKeyDown={(e) => e.key === 'Enter' && setActiveTab(index)}
                style={{
                  transition: 'all 0.3s ease',
                  backgroundColor: activeTab === index ? '#fef2f2' : 'transparent',
                  cursor: 'pointer',
                  borderRadius: '8px',
                  padding: '12px',
                  marginBottom: '24px',
                  minHeight: '44px',
                  position: 'relative'
                }}
              >
                <div className="about2J0P" style={{
                  color: activeTab === index ? '#dc2626' : '#000000',
                  transition: 'color 0.3s ease',
                  position: 'relative',
                  zIndex: 1
                }}>
                  {tab.icon}
                  <div className="info1x6k" style={{ position: 'relative' }}>
                    <div
                      className="title-ME6"
                      style={{
                        color: activeTab === index ? '#dc2626' : '#000000',
                        transition: 'color 0.3s ease'
                      }}
                    >
                      {tab.title}
                    </div>
                    {activeTab === index && (
                      <p style={{
                        animation: 'fadeIn 0.3s ease',
                        opacity: 1,
                        color: '#000000',
                        marginTop: '8px'
                      }}>
                        {tab.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="heroImages1RTg">
          {tabs.map((tab, index) => (
            <div
              key={index}
              className="img2RPn"
              {...(activeTab === index && { 'data-active': true })}
            >
              <img
                src={tab.imageUrl}
                alt={tab.title}
                style={{ width: '684px', height: '500px', maxWidth: 'none', maxHeight: 'none' }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BigPictureSection;

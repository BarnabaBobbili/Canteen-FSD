import React, { useState } from 'react';

const TeamSecuritySection = () => {
  const [activeTab, setActiveTab] = useState(0); // Start with first tab active

  const tabs = [
    {
      title: 'Role-Based Access',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
          <path d="M4 2h12H4zm12 8a1 1 0 0 1 1 1v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5a1 1 0 0 1 2 0v5h10v-5a1 1 0 0 1 1-1zm-6-8h.02c.023 0 .046.002.07.004L10 2a1.008 1.008 0 0 1 .617.213l.008.007.082.073 4 4a1 1 0 1 1-1.414 1.414L11 5.414V13a1 1 0 0 1-2 0V5.414L6.707 7.707a1 1 0 0 1-1.414-1.414l4-4 .082-.073.008-.007-.09.08A1.008 1.008 0 0 1 9.982 2H10z" opacity=".9"></path>
        </svg>
      ),
      description: (
        <span>Control access with Admin, Manager, Cashier, and Staff roles. Each role has specific permissions tailored to their responsibilities.</span>
      ),
      imageUrl: '/media/role-based-access.png',
      imageWidth: 750,
      imageHeight: 484
    },
    {
      title: 'Activity Logging',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
          <path d="M10 1a9 9 0 1 1 0 18 9 9 0 0 1 0-18zm1.973 10.001H8.027c.097 1.764.446 3.366.972 4.55.266.598.556 1.039.823 1.293.116.11.17.145.179.154l.009-.009c.022-.017.075-.057.168-.145.267-.254.557-.695.823-1.292.526-1.185.875-2.787.972-4.55zm-5.949 0H3.071a7.008 7.008 0 0 0 4.123 5.414c-.637-1.412-1.066-3.303-1.17-5.414zm10.905 0h-2.953c-.104 2.11-.533 4.002-1.17 5.414a7.01 7.01 0 0 0 4.123-5.414zM7.195 3.585l-.127.057A7.008 7.008 0 0 0 3.07 9h2.953c.104-2.111.532-4.002 1.17-5.415zM10 3.002l-.01.009c-.022.017-.075.057-.168.145-.267.254-.557.695-.823 1.292C8.473 5.633 8.124 7.236 8.027 9h3.946c-.097-1.764-.446-3.367-.972-4.552-.266-.597-.556-1.038-.823-1.292-.093-.088-.146-.128-.168-.145L10 3.002zm2.806.583l.022.051c.626 1.407 1.045 3.278 1.148 5.364h2.953a7.008 7.008 0 0 0-4.123-5.415z"></path>
        </svg>
      ),
      description: (
        <span>Track all user actions, changes, and transactions. Complete audit trail with timestamps, user info, and action details.</span>
      ),
      imageUrl: '/media/activity-logging.png',
      imageWidth: 750,
      imageHeight: 484
    }
  ];

  return (
    <div className="blob1U5Q left1x3n teamwork1zJz">
      <div className="grid178A">
        <div>
          <h2>Built for Teams. Secure by Design</h2>
          <blockquote>Multi-user support with role-based permissions and complete activity tracking for accountability and security.</blockquote>
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
                  backgroundColor: activeTab === index ? '#f5f3ff' : 'transparent',
                  cursor: 'pointer',
                  borderRadius: '8px',
                  padding: '12px',
                  marginBottom: '24px',
                  minHeight: '44px',
                  position: 'relative'
                }}
              >
                <div className="about2J0P" style={{
                  color: activeTab === index ? '#9333ea' : '#000000',
                  transition: 'color 0.3s ease',
                  position: 'relative',
                  zIndex: 1
                }}>
                  {tab.icon}
                  <div className="info1x6k" style={{ position: 'relative' }}>
                    <div
                      className="title-ME6"
                      style={{
                        color: activeTab === index ? '#9333ea' : '#000000',
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
                style={{ width: '750px', height: '484px', maxWidth: 'none', maxHeight: 'none' }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamSecuritySection;

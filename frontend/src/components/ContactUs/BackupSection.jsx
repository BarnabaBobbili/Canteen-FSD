import React, { useState } from 'react';

const BackupSection = () => {
  const [activeTab, setActiveTab] = useState(0); // Start with first tab active

  const tabs = [
    {
      title: 'Data Security',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
          <path d="M10 2L3 6v4c0 5 2.5 8.5 7 10 4.5-1.5 7-5 7-10V6l-7-4zm5 8c0 3.5-1.5 6-5 7.5C6.5 16 5 13.5 5 10V7l5-3 5 3v3zm-3-2h-4v6h4v-6z" opacity=".9"></path>
        </svg>
      ),
      description: (
        <span>JWT authentication, encrypted data transmission, and secure password hashing. Your canteen data is protected with industry-standard security.</span>
      ),
      hasPro: false,
      imageUrl: '/media/data-security.png',
      imageWidth: 750,
      imageHeight: 484
    },
    {
      title: 'Reports',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3zm2 0h10v14H5V3zm2 2a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2H7zm0 4a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H7zm0 4a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2H7z" opacity=".9"></path>
        </svg>
      ),
      description: (
        <span>Generate detailed sales reports, inventory summaries, and financial statements. Export to PDF or Excel.</span>
      ),
      hasPro: false,
      imageUrl: '/media/reports.png',
      imageWidth: 750,
      imageHeight: 484
    }
  ];

  return (
    <div className="blob1U5Q right3x0m backup2aOH">
      <div className="grid178A">
        <div>
          <h2>Reliable & Secure</h2>
          <blockquote>Your canteen data is safe with automated backups, comprehensive reports, and secure data management.</blockquote>
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
                  backgroundColor: activeTab === index ? '#dbeafe' : 'transparent',
                  cursor: 'pointer',
                  borderRadius: '8px',
                  padding: '12px',
                  marginBottom: '24px',
                  minHeight: '44px',
                  position: 'relative'
                }}
              >
                <div className="about2J0P" style={{
                  color: activeTab === index ? '#2563eb' : '#000000',
                  transition: 'color 0.3s ease',
                  position: 'relative',
                  zIndex: 1
                }}>
                  {tab.icon}
                  <div className="info1x6k" style={{ position: 'relative' }}>
                    <div
                      className="title-ME6"
                      style={{
                        color: activeTab === index ? '#2563eb' : '#000000',
                        transition: 'color 0.3s ease'
                      }}
                    >
                      {tab.title}
                      {tab.hasPro && (
                        <svg className="money3NdV" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 1a9 9 0 1 1 0 18 9 9 0 0 1 0-18zm0 3a1 1 0 0 0-1 1v.092l-.263.057a4.435 4.435 0 0 0-1.413.605C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941l-.161-.058c-.31-.123-.543-.286-.682-.446l-.088-.09a1 1 0 0 0-1.423 1.4c.563.649 1.414 1.076 2.354 1.253V15l.007.117A1 1 0 0 0 11 15v-.092l.263-.057a4.436 4.436 0 0 0 1.413-.605C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0 0 11 9.092V7.151l.161.058c.31.123.543.286.682.446l.088.09a1 1 0 0 0 1.423-1.4c-.563-.649-1.413-1.076-2.354-1.253V5l-.007-.117A1 1 0 0 0 10 4zm1 7.151l.16.057c.154.061.29.132.407.21.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 0 1-.567.267v-1.698zm-2-4v1.698l-.16-.057a2.178 2.178 0 0 1-.407-.21C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582.155-.103.346-.196.567-.267z"></path>
                        </svg>
                      )}
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

export default BackupSection;

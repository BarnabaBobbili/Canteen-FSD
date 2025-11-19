import React, { useState } from 'react';

const BackupSection = () => {
  const [activeTab, setActiveTab] = useState(0); // Start with first tab active

  const tabs = [
    {
      title: 'Data Backup & Security',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
          <path d="M13 5h-2V3H3v8h2v2H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v3zM8 7h10a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1zm1 2v8h8V9H9z"></path>
        </svg>
      ),
      description: (
        <span>Automatic daily backups of all transactions, orders, and inventory data. Your data is secure and recoverable.</span>
      ),
      hasPro: false,
      imageUrl: '/media/copy-2112-f830465c5c3c1220e83cb240e8c96165.png',
      imageWidth: 750,
      imageHeight: 484
    },
    {
      title: 'Export & Reports',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M12 2a8 8 0 1 1-6.105 13.17l1.468-1.363A6 6 0 1 0 6.083 9H9l-4 4-4-4h3.062A8.001 8.001 0 0 1 12 2zm0 4a1 1 0 0 1 1 1v2.785l1.662 1.193a.849.849 0 0 1 .106 1.29l-.107.107a1 1 0 0 1-1.29.105l-2.033-1.458a.849.849 0 0 1-.339-.852L11 7a1 1 0 0 1 1-1z" opacity=".9"></path>
        </svg>
      ),
      description: (
        <span>Generate detailed sales reports, inventory summaries, and financial statements. Export to PDF or Excel.</span>
      ),
      hasPro: false,
      imageUrl: '/media/backup-1640-4f013f867d9e1988ae5253dbeef9fe82.png',
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

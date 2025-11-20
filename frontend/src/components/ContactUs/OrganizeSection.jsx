import React, { useState } from 'react';

const OrganizeSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      title: 'Menu Management',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
          <path d="M18 18a1 1 0 0 1-1-1V6H9.828A4 4 0 0 1 7 4.828L6.172 4H3v12h15a1 1 0 0 1 0 2H3a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h3.172a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 4H17a2 2 0 0 1 2 2v11a1 1 0 0 1-1 1z"></path>
        </svg>
      ),
      description: (
        <span>Organize menu items by categories (snacks, beverages, meals). Add, edit, and manage availability in real-time.</span>
      ),
      imageUrl: '/media/menu-management-modal.png'
    },
    {
      title: 'Analytics Dashboard',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3zm2 0v14h10V3H5zm2 12a1 1 0 0 1 1-1h4a1 1 0 0 1 0 2H8a1 1 0 0 1-1-1zm0-4a1 1 0 0 1 1-1h4a1 1 0 0 1 0 2H8a1 1 0 0 1-1-1zm6-4a1 1 0 1 0 0 2h1a1 1 0 1 0 0-2h-1zM7 7a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2H8a1 1 0 0 1-1-1z" opacity=".9"></path>
        </svg>
      ),
      description: (
        <span>Visualize sales trends, revenue analytics, and popular items. Get insights with interactive charts and real-time metrics.</span>
      ),
      imageUrl: '/media/analytics-dashboard.png'
    },
    {
      title: 'Inventory Control',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 2a8 8 0 0 1 8 8v8l-4.364-2.91L10 18l-.001-.001-3.635-2.908L2 17.999 2 18v-8a8 8 0 0 1 8-8zM6.364 7.818a1.455 1.455 0 1 0 0 2.91 1.455 1.455 0 0 0 0-2.91zm5.818 0a1.455 1.455 0 1 0 0 2.91 1.455 1.455 0 0 0 0-2.91z" opacity=".9"></path>
        </svg>
      ),
      description: (
        <span>Manage stock efficiently. Get low-stock alerts (below 20 units), track ingredient usage, and manage suppliers.</span>
      ),
      hasPro: false,
      imageUrl: '/media/inventory-control.png'
    }
  ];

  return (
    <div className="blob1U5Q left1x3n organize1xl3">
      <div className="grid178A">
        <div>
          <h2>Complete Operational Control</h2>
          <blockquote>CanteenDelight isn't just a pretty interface, it can help you streamline your entire canteen operations.</blockquote>
          <div className="sectionsmNlL">
            {tabs.map((tab, index) => (
              <div
                key={index}
                className="item2omU"
                {...(activeTab === index && { 'data-active': true })}
                tabIndex="0"
                onMouseEnter={() => setActiveTab(index)}
                onKeyDown={(e) => e.key === 'Enter' && setActiveTab(index)}
                style={{
                  transition: 'all 0.3s ease',
                  backgroundColor: activeTab === index ? '#fef3c7' : 'transparent',
                  cursor: 'pointer',
                  borderRadius: '8px',
                  padding: '12px',
                  marginBottom: '24px',
                  minHeight: '44px',
                  position: 'relative'
                }}
              >
                <div className="about2J0P" style={{
                  color: activeTab === index ? '#d97706' : '#000000',
                  transition: 'color 0.3s ease',
                  position: 'relative',
                  zIndex: 1
                }}>
                  {tab.icon}
                  <div className="info1x6k" style={{ position: 'relative' }}>
                    <div
                      className="title-ME6"
                      style={{
                        color: activeTab === index ? '#d97706' : '#000000',
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
                style={{ width: '1056px', height: '500px', maxWidth: 'none', maxHeight: 'none' }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrganizeSection;

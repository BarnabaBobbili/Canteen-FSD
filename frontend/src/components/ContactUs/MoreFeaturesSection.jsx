import React from 'react';

const MoreFeaturesSection = () => {
  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
          <path d="M3 17a.968.968 0 0 1-.712-.288A.968.968 0 0 1 2 16c0-.283.096-.52.288-.713A.968.968 0 0 1 3 15h1V8c0-1.383.417-2.612 1.25-3.688C6.083 3.237 7.167 2.534 8.5 2.2v-.7c0-.417.146-.77.438-1.063A1.447 1.447 0 0 1 10 0c.417 0 .77.146 1.063.438.291.291.437.645.437 1.062v.7c1.333.333 2.417 1.037 3.25 2.112C15.583 5.388 16 6.617 16 8v7h1c.283 0 .52.096.712.287.192.192.288.43.288.713s-.096.52-.288.712A.968.968 0 0 1 17 17H3zm7 3c-.55 0-1.02-.196-1.412-.587A1.926 1.926 0 0 1 8 18h4c0 .55-.196 1.02-.588 1.413A1.926 1.926 0 0 1 10 20zm-4-5h8V8c0-1.1-.392-2.042-1.175-2.825C12.042 4.392 11.1 4 10 4s-2.042.392-2.825 1.175C6.392 5.958 6 6.9 6 8v7z"></path>
        </svg>
      ),
      title: 'Smart Discounts',
      description: 'Create percentage or fixed discounts. Set validity dates and minimum order amounts.'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
          <path d="M3 3v14h14V3H3zm13.75-2A2.25 2.25 0 0 1 19 3.25v13.5A2.25 2.25 0 0 1 16.75 19H3.25A2.25 2.25 0 0 1 1 16.75V3.25A2.25 2.25 0 0 1 3.25 1h13.5zm-3.195 5.168a1 1 0 0 0-1.387.277L8.845 11.43l-1.138-1.137a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.54-.152l4-6a1 1 0 0 0-.278-1.387z" opacity=".9"></path>
        </svg>
      ),
      title: 'Staff Management',
      description: 'Manage staff members with role-based access (admin, manager, cashier, staff).'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
          <path d="M17 10h2a9 9 0 0 1-18 0h2a7 7 0 0 0 14 0zm-7-9a4 4 0 0 1 1 7.874l.001 8.055a7.005 7.005 0 0 0 5.928-5.928L16 11a1 1 0 0 1 0-2h2a1 1 0 0 1 .993.883L19 10a9 9 0 0 1-18 0 1 1 0 0 1 1-1h2a1 1 0 1 1 0 2l-.929.001A7.005 7.005 0 0 0 9 16.929V8.874A4.002 4.002 0 0 1 10 1zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" opacity=".9"></path>
        </svg>
      ),
      title: 'Activity Logging',
      description: 'Track all system activities with detailed logs. Monitor user actions and changes.'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
          <path d="M17 10a1 1 0 0 1 1 1v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-5a1 1 0 0 1 2 0v5h12v-5a1 1 0 0 1 1-1zm-7.148 3.989l.058.007L10 14l.075-.003.126-.017.111-.03.111-.044.098-.052.104-.074.082-.073 4-4a1 1 0 1 0-1.414-1.414L11 10.586V3a1 1 0 0 0-2 0v7.586L6.707 8.293a1 1 0 0 0-1.414 1.414l4 4c.035.036.073.068.112.097l.11.071.114.054.105.035.118.025z" opacity=".9"></path>
        </svg>
      ),
      title: 'Customer Feedback',
      description: 'Collect and analyze customer feedback. Rate food quality and service.'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
          <path d="M10 9c.552 0 1 .497 1 1.111v4.473l1.293-1.291a1 1 0 0 1 1.32-.083l.094.083a1 1 0 0 1 0 1.414l-3 3A.996.996 0 0 1 10 18l.093-.004-.034.002-.028.002H10a.917.917 0 0 1-.092-.004l-.017-.003a.997.997 0 0 1-.598-.286L6.265 14.68a1 1 0 0 1 1.414-1.414L9 14.586v-4.475c0-.573.39-1.044.891-1.104zM8 2a7.003 7.003 0 0 1 6.713 5.01A4 4 0 0 1 19 11c0 2.21-.96 4-3.169 4s-1-2 0-2S17 12.105 17 11a2 2 0 0 0-2.145-1.995 2 2 0 0 1-2.06-1.427A5 5 0 0 0 3 9c0 1.636-.116 2.41 1.099 3.322.81.608.81 1.383 0 2.326C1.734 13.525 1 11.792 1 9a7 7 0 0 1 7-7z" opacity=".9"></path>
        </svg>
      ),
      title: 'Supplier Management',
      description: 'Maintain supplier database with contact details, products, and order history.'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
          <path d="M10 3c3 0 6 2.333 9 7-3 4.667-6 7-9 7s-6-2.333-9-7c3-4.667 6-7 9-7zm0 2c-1.97 0-4.198 1.592-6.592 5C5.802 13.408 8.03 15 10 15c1.97 0 4.198-1.592 6.592-5C14.198 6.592 11.97 5 10 5zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" opacity=".9"></path>
        </svg>
      ),
      title: 'Real-time Order Tracking',
      description: 'Track orders from placement to completion. Live status updates for customers.'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6.815 16.961a1 1 0 0 1-1.97-.347l.388-2.2H3a1 1 0 1 1 0-2h2.585l.706-4H3a1 1 0 1 1 0-2h3.643l.633-3.587a1 1 0 0 1 1.97.347l-.572 3.24h4.062l.45-2.546a1 1 0 0 1 1.969.348l-.389 2.198H17a1 1 0 0 1 0 2h-2.586l-.706 4H17a1 1 0 0 1 0 2h-3.644l-.632 3.589a1 1 0 0 1-1.97-.347l.571-3.242H7.263l-.448 2.547zm.801-4.547h4.062l.705-4H8.321l-.705 4z" opacity=".9"></path>
        </svg>
      ),
      title: 'Low Stock Alerts',
      description: 'Automatic notifications when inventory runs low. Never run out of ingredients.'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
          <path d="M4 4a2 2 0 0 0-2 2v1h16V6a2 2 0 0 0-2-2H4zm14 5H2v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9zM4 13a1 1 0 0 1 1-1h4a1 1 0 0 1 0 2H5a1 1 0 0 1-1-1zm8 0a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2h-2a1 1 0 0 1-1-1z" opacity=".9"></path>
        </svg>
      ),
      title: 'Payment Tracking',
      description: 'Monitor all transactions. Support for cash, card, and digital payment methods.'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
          <path d="M3 3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H3zm0 2h14v10H3V5zm2 2a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2H5zm5 0a1 1 0 0 0 0 2h5a1 1 0 0 0 0-2h-5zm-5 4a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2H5zm5 0a1 1 0 0 0 0 2h5a1 1 0 0 0 0-2h-5z" opacity=".9"></path>
        </svg>
      ),
      title: 'Kitchen Display System',
      description: 'Real-time order queue for kitchen staff. Streamlined food preparation workflow.'
    }
  ];

  return (
    <div className="contentoxL5" data-center="true">
      <h2>Plus Even More Features</h2>
      <div className="ferrari1vBH" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '24px',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {features.map((feature, index) => (
          <span key={index} className="item2omU" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '16px',
            textAlign: 'left'
          }}>
            {feature.icon}
            <span className="info1x6k">
              <span className="title-ME6">{feature.title}</span>
              <p>{feature.description}</p>
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default MoreFeaturesSection;

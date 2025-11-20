import React from 'react';

const HeroSection = ({ onGetStarted, onViewDemo }) => {
  const styles = {
    heroSection: {
      backgroundImage: "url('/_next/static/images/blob-intro-82a9537613a4c073b91da3dee2cba356.jpg')",
      backgroundSize: '731px 622px',
      backgroundRepeat: 'no-repeat',
      overflow: 'visible',
    },
    heroGrid: {
      display: 'grid',
      gridTemplateColumns: '475px 1fr',
      gridTemplateRows: 'auto',
      gap: '20px 75px',
      maxWidth: '1003.75px',
      padding: '9rem 1.875rem',
      margin: '0px auto',
      alignItems: 'center',
      minHeight: '85vh',
      overflow: 'visible',
      position: 'relative',
    },
    videoContainer: {
      position: 'relative',
      width: '100%', // Full width of grid column
      overflow: 'visible', // Let video extend beyond if needed
    },
    video: {
      // ⚠️ Size controlled by inline style on video element (line 87-88)
      // Change width: '750px' and height: '1500px' on line 87-88 to adjust size
      display: 'block',
      objectFit: 'fill', // Allow video to stretch to exact dimensions
      maxWidth: 'none',
      maxHeight: 'none',
      borderRadius: '4px',
      background: 'rgb(255, 255, 255)',
      boxShadow: 'rgba(0, 0, 0, 0.15) 0px 0px 0px 0.5px, rgba(0, 0, 0, 0.1) 0px 12px 24px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px',
    },
    buttonsContainer: {
      padding: '9px 0px',
    },
    button: {
      marginRight: '10px',
    },
  };

  return (
    <div className="blob1U5Q left1x3n intro2RCL" style={styles.heroSection}>
      <div className="grid178A" style={styles.heroGrid}>
        <div>
          <h1>CanteenDelight</h1>
          <h4>Powerful. Intuitive. Built for Modern Canteens</h4>
          <div className="buttons1C0r" style={styles.buttonsContainer}>
            <a
              data-appearance="primary"
              data-size="big"
              className="buttonYAU-"
              onClick={onViewDemo}
              style={{
                cursor: 'pointer',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: '#fff',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                border: 'none',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                transform: 'scale(1)',
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
              }}
            >
              ✨ Live Preview
            </a>
          </div>
        </div>
        <div style={styles.videoContainer}>
          <video
            src="/media/video.mp4"
            autoPlay
            preload="auto"
            loop
            muted
            controls
            controlsList="nodownload nofullscreen noremoteplayback"
            disablePictureInPicture
            style={{
              ...styles.video,
              width: '858px',
              height: '484px',
              marginTop: '-50px', // Move video up (negative = up, positive = down)
            }}
          ></video>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

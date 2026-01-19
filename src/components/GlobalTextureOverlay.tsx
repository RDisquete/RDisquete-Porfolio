import  { type CSSProperties } from 'react';

const textureUrl = "/images/texturas/istockphoto-182216417-612x612.jpg"; 

const GlobalTextureOverlay = () => {
  const overlayStyle: CSSProperties = { 
    backgroundImage: `url(${textureUrl})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'repeat',
    filter: 'grayscale(100%) contrast(100%) brightness(40%)', 
    opacity: 0.20, 
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 9999,
    pointerEvents: 'none', 
  };

  return <div style={overlayStyle} />;
};

export default GlobalTextureOverlay;
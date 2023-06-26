import React, { useEffect } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

const MapContainer = () => {
  useEffect(() => {
    const container = document.getElementById('map');
    
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=f3f69e507f70b20f6cdaa643fb68b19b&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const options = {
          center: new window.kakao.maps.LatLng(36.3494652, 127.3775608),
          level: 3
        };
      
        new window.kakao.maps.Map(container, options);
      });
    };
  }, []);

  return <div id="map" style={{ width: '100vw', height: '100vh' }} />;
};

export default MapContainer;

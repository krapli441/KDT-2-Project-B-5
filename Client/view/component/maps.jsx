import React, { useEffect } from 'react';

const MapComponent = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://apis.openapi.sk.com/tmap/jsv2?version=1&format=javascript&appKey=FB8ThRVZHU4x1zUhC432j3DKfPOdkpmrajEOCYZe';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initMap = () => {
    const map = new Tmapv2.Map('map', {
      center: new Tmapv2.LatLng(37.5665, 126.9780),
      zoom: 15,
    });
  };

  useEffect(() => {
    if (window.Tmapv2) {
      initMap();
    }
  }, []);

  return (
    <div>
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
    </div>
  );
};

export default MapComponent;

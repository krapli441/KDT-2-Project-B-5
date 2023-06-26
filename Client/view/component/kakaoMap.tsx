import React, { useEffect } from 'react';
import { Map } from 'react-kakao-maps';

const MapComponent = () => {
  useEffect(() => {
    // 카카오 지도 API 초기화 및 지도 표시
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=f3f69e507f70b20f6cdaa643fb68b19b&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new kakao.maps.LatLng(37.5665, 126.9780),
          level: 5,
        };
        new kakao.maps.Map(container, options);
      });
    };
  }, []);

  return <div id="map" style={{ width: '100%', height: '400px' }}></div>;
};

export default MapComponent;

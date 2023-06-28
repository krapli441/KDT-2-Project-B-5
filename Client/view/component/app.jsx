import React, { useEffect } from 'react';

const MapComponent = () => {
  useEffect(() => {
    const loadMap = async () => {
      const mapScript = document.createElement('script');
      mapScript.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=b3da2e1025f79e2251178086a01fa93b&libraries=services&autoload=false';
      document.head.appendChild(mapScript);

      mapScript.onload = () => {
        const mapContainer = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(36.344291, 127.384876), // 둔산동 둔산대로 좌표 설정
          level: 3,
        };
        const map = new window.kakao.maps.Map(mapContainer, options);

        const trafficService = new window.kakao.maps.services.Traffic();

        // 둔산동 둔산대로의 실시간 교통량 정보 가져오기
        trafficService.getRoadTrafficData(178, (data, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const congestion = data.congestion;

            if (congestion === '3' || congestion === '4') {
              console.log('혼잡');
            } else {
              console.log('원할');
            }
          }
        });
      };
    };

    loadMap();
  }, []);

  return <div id="map" style={{ width: '500px', height: '400px' }}></div>;
};

export default MapComponent;

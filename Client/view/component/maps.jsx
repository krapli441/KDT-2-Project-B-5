import React, { useEffect } from 'react';
// declare global {
//   interface Window {
//     kakao: any;
//   }
// }
const Maps = () => {
  useEffect(() => {
    const container = document.getElementById('map');
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=b3da2e1025f79e2251178086a01fa93b&autoload=false`;
    document.head.appendChild(script);
    script.onload = () => {
      window.kakao.maps.load(() => {
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3
        };
        const map = new window.kakao.maps.Map(container, options);
        // 사용자의 현재 위치 가져오기
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            // 현재 위치 마커 생성
            const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
            const marker = new window.kakao.maps.Marker({
              position: markerPosition
            });
            // 마커를 지도에 추가
            marker.setMap(map);
            // 지도 중심 위치 변경
            map.setCenter(markerPosition);
          },
          (error) => {
            console.log('Error getting geolocation:', error);
          }
        );
      });
    };
  }, []);
  return <div id="map" style={{ width: '100vw', height: '100vh' }} />;
};
export default Maps
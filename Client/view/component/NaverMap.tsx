// import React, { useEffect } from 'react';

// declare global {
//   interface Window {
//     naver: any;
//   }
// }

// const MapComponent: React.FC = () => {
//   useEffect(() => {
//     const clientId = 'm923je25uq'; // 클라이언트 아이디 입력
//     const script = document.createElement('script');
//     script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientId}`;
//     script.async = true;
//     document.head.appendChild(script);

//     script.onload = () => {
//       window.naver.maps.onJSContentLoaded = initMap;
//       function initMap() {
//         if (navigator.geolocation) {
//           navigator.geolocation.getCurrentPosition(function (position) {
//             const latitude = position.coords.latitude;
//             const longitude = position.coords.longitude;
//             const currentPosition = new window.naver.maps.LatLng(latitude, longitude);

//             const mapOptions = {
//               center: currentPosition,
//               zoom: 15,
//             };
//             const map = new window.naver.maps.Map('map', mapOptions);

//             const markerOptions = {
//               position: currentPosition,
//               map: map,
//             };
//             const marker = new window.naver.maps.Marker(markerOptions);

//             const trafficLayer = new window.naver.maps.TrafficLayer();
//             trafficLayer.setMap(map);

//             const trafficService = new window.naver.maps.TrafficService();
//             trafficService.getTrafficData(currentPosition, function (data: any) {
//               if (data) {
//                 const congestionLevel = data.congestion.level;
//                 let message = '';

//                 if (congestionLevel === 'HEAVY') {
//                   message = '빨강입니다.';
//                 } else if (congestionLevel === 'NORMAL') {
//                   message = '주황입니다.';
//                 } else if (congestionLevel === 'SMOOTH') {
//                   message = '초록입니다.';
//                 } else {
//                   message = '노랑입니다.';
//                 }

//                 console.log('혼잡도:', message);
//               }
//             });
//           });
//         } else {
//           alert('Geolocation is not supported by this browser.');
//         }
//       }
//     };

//     return () => {
//       document.head.removeChild(script);
//     };
//   }, []);

//   return <div id="map" style={{ width: '100vw', height: '100vh' }}></div>;
// };

// export default MapComponent;

import React, { useEffect } from 'react';

declare global {
  interface Window {
    Tmapv3: any;
  }
}
// tmap
const MapComponent: React.FC = () => {
  useEffect(() => {
    const appKey = 'n5tcTlbrrd5rR16HzBuog98VPUg1oeiN6X8gIA5x';

    const loadScript = () => {
      return new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = `https://apis.openapi.sk.com/tmap/vectorjs?version=1&appKey=${appKey}`;
        script.async = true;
    
        script.onload = (event: Event) => resolve();
        script.onerror = () => reject();
    
        document.head.appendChild(script);
      });
    };
    

    const initializeMap = () => {
      const mapOptions = {
        center: new window.Tmapv3.LatLng(37.5652045, 126.98702028),
        width: '100%',
        height: '400px',
        zoom: 16,
      };

      const map = new window.Tmapv3.Map('map_div', mapOptions);
    };

    loadScript()
      .then(() => {
        initializeMap();
      })
      .catch((error) => {
        console.error('Failed to load Tmap script:', error);
      });
  }, []);

  return <div id="map_div"></div>;
};

export default MapComponent;

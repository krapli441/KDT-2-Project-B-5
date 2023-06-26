// import React, { useEffect } from 'react';
// // Kakao 지도 API가 window.kakao를 통해 노출되기 때문에 
// // declare global을 사용하여 window 객체의 kakao 속성에 대한 타입 선언을 추가
// declare global {
//   interface Window {
//     kakao: any;
//   }
// }

// const MapContainer = () => {
//   // useEffect를 사용하여 컴포넌트가 마운트될 때 한 번 실행하도록 함.
//   useEffect(() => {
//     // id가 'map'인 요소를 찾아 container 변수에 할당 -> 카카오 지도를 표시할 DOM 요소
//     const container = document.getElementById('map');
//     // 카카오 지도 API 스크립트를 동적으로 생성하여 페이지에 추가
//     const script = document.createElement('script');
//     // 비동기로 스크립트를 로드
//     script.async = true;
//     // 카카오 지도 API의 URL과 앱 키(appkey)를 포함
//     script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=f3f69e507f70b20f6cdaa643fb68b19b&autoload=false`;
//     document.head.appendChild(script);
//     // 스크립트가 로드되면 script.onload 콜백 함수가 실행
//     script.onload = () => {
//       // 카카오 지도 API가 로드된 후 실행할 콜백 함수를 등록
//       window.kakao.maps.load(() => {
//         // 지도 생성에 필요한 옵션 정의
//         const options = {
//           center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심 좌표를 설정
//           level: 3 // 지도의 확대/축소 레벨
//         };
//         // container 요소에 지도를 생성하고 map 변수에 할당
//         const map = new window.kakao.maps.Map(container, options);

//         // 사용자의 현재 위치 가져오기
//         navigator.geolocation.getCurrentPosition(
//           // 위치 정보를 성공적으로 가져오면 콜백 함수가 실행
//           (position) => {
//             // 사용자의 위도와 경도를 가져옴
//             const latitude = position.coords.latitude;
//             const longitude = position.coords.longitude;

//             // 현재 위치 마커 생성
//             // 위도와 경도로 markerPosition을 생성하고, 이를 기반으로 마커 객체를 생성
//             const markerPosition = new window.kakao.maps.LatLng(latitude, longitude); 
//             const marker = new window.kakao.maps.Marker({
//               position: markerPosition
//             });

//             // 마커를 지도에 추가
//             marker.setMap(map);

//             // 지도 중심 위치 변경
//             map.setCenter(markerPosition);
//           },
//           (error) => {
//             console.log('Error getting geolocation:', error);
//           }
//         );
//       });
//     };
//   }, []); // 컴포넌트가 처음 렌더링될 때만 실행되도록 설정

//   return <div id="map" style={{ width: '100vw', height: '100vh' }} />;
// };

// export default MapContainer;

// import React, { useEffect, useRef } from 'react';
// import TrafficLayer from './TrafficLayer';

// declare global {
//   interface Window {
//     kakao: any;
//   }
// }

// interface MapContainerProps {
//   apiKey: string;
// }

// const MapContainer: React.FC<MapContainerProps> = ({ apiKey }) => {
//   const mapRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const container = mapRef.current;

//     const script = document.createElement('script');
//     script.async = true;
//     script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
//     document.head.appendChild(script);

//     script.onload = () => {
//       window.kakao.maps.load(() => {
//         const options = {
//           center: new window.kakao.maps.LatLng(33.450701, 126.570667),
//           level: 3
//         };

//         const map = new window.kakao.maps.Map(container, options);

//         const trafficLayerContainer = document.createElement('div');
//         container.appendChild(trafficLayerContainer);

//         const TrafficLayerComp = <TrafficLayer map={map} apiKey={apiKey} />;
//         ReactDOM.render(TrafficLayerComp, trafficLayerContainer);

//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             const latitude = position.coords.latitude;
//             const longitude = position.coords.longitude;

//             const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
//             const marker = new window.kakao.maps.Marker({
//               position: markerPosition
//             });

//             marker.setMap(map);
//             map.setCenter(markerPosition);
//           },
//           (error) => {
//             console.log('Error getting geolocation:', error);
//           }
//         );
//       });
//     };
//   }, [apiKey]);

//   return <div ref={mapRef} style={{ width: '100vw', height: '100vh' }} />;
// };

// export default MapContainer;

import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom'; // ReactDOM 추가
import TrafficLayer from './TrafficLayer';

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapContainerProps {
  apiKey: string;
}

const MapContainer: React.FC<MapContainerProps> = ({ apiKey }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mapRef.current;

    if (!container) return; // container가 null인 경우 종료

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=f3f69e507f70b20f6cdaa643fb68b19b&autoload=false';
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3
        };

        const map = new window.kakao.maps.Map(container, options);

        const trafficLayerContainer = document.createElement('div');
        container.appendChild(trafficLayerContainer);

        const TrafficLayerComp = <TrafficLayer map={map} apiKey={apiKey} />;
        ReactDOM.render(TrafficLayerComp, trafficLayerContainer);

        // 교통량 레이어 추가
        map.addOverlayMapTypeId(window.kakao.maps.MapTypeId.TRAFFIC);

        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
            const marker = new window.kakao.maps.Marker({
              position: markerPosition
            });

            marker.setMap(map);
            map.setCenter(markerPosition);
          },
          (error) => {
            console.log('Error getting geolocation:', error);
          }
        );
      });
    };
  }, [apiKey]);

  return <div ref={mapRef} style={{ width: '100vw', height: '100vh' }} />;
};

export default MapContainer;

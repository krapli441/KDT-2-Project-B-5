import React, { useEffect } from 'react';
import { useKakaoMaps } from 'react-kakao-maps';

function TrafficStatus() {
  
  const apiKey = 'b3da2e1025f79e2251178086a01fa93b'; // 본인의 Kakao Maps API 키로 대체

  const { kakao, mapRef } = useKakaoMaps(apiKey);


  useEffect(() => {
    if (kakao) {
      // 현재 위치 가져오기
      navigator.geolocation.getCurrentPosition(function(position) {
        const lat = position.coords.latitude; // 위도
        const lng = position.coords.longitude; // 경도
        const currentPosition = new kakao.maps.LatLng(lat, lng);

        // 지도 생성
        const mapOptions = {
          center: currentPosition,
          level: 15
        };
        const map = new kakao.maps.Map(mapRef.current, mapOptions);

        // 현재 위치 마커 생성
        const marker = new kakao.maps.Marker({
          position: currentPosition,
          map: map
        });

        // 현재 위치 기준으로 교통 상태 확인
        const traffic = new kakao.maps.services.Traffic();
        traffic.getTrafficInfo(currentPosition, function(result, status) {
          if (status === kakao.maps.services.Status.OK) {
            const congestion = result.status; // 혼잡 상태 (1: 원할, 2: 보통, 3: 혼잡, 4: 매우 혼잡)

            // 교통 상태에 따라 메시지 출력
            if (congestion >= 3) {
              alert('교통상태가 혼잡합니다.');
            } else {
              alert('교통상황이 원활합니다.');
            }
          }
        });

        // 지도 중심 위치를 현재 위치로 설정
        map.setCenter(currentPosition);
      });
    }
  }, [kakao, mapRef]);

  return (
    <div>
      <h1>현재 위치의 교통 상태 확인</h1>
      {/* <div ref={mapRef} style={{ width: '100%', height: '400px' }}></div> */}
    </div>
  );
}

export default TrafficStatus;
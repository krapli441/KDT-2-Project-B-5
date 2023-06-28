import React, { useEffect, useState } from 'react';

const TrafficStatus = () => {
  const [traffic, setTraffic] = useState('');

  useEffect(() => {
    const getTrafficStatus = async () => {
      try {
        // 현재 위치 좌표를 얻는 코드 (navigator.geolocation 사용)
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;

          // 카카오 API 요청 URL
          const url = `https://dapi.kakao.com/v2/local/geo/transcoord.json?x=${longitude}&y=${latitude}&input_coord=WGS84&output_coord=TM`;

          // 카카오 API 요청
          const response = await fetch(url, {
            headers: {
              Authorization: `b3da2e1025f79e2251178086a01fa93b`,
            },
          });

          const data = await response.json();
          const { x, y } = data.documents[0];

          // 교통량 정보를 얻는 카카오 API 요청 URL
          const trafficUrl = `https://dapi.kakao.com/v2/local/traffic/forecast/link?x=${x}&y=${y}`;

          // 교통량 정보 요청
          const trafficResponse = await fetch(trafficUrl, {
            headers: {
              Authorization: `KakaoAK ${YOUR_API_KEY}`,
            },
          });

          const trafficData = await trafficResponse.json();

          // 교통량 정보를 기반으로 메시지 설정
          if (trafficData.features.length > 0) {
            setTraffic('원활');
          } else {
            setTraffic('혼잡');
          }
        });
      } catch (error) {
        console.error('Error:', error);
      }
    };

    getTrafficStatus();
  }, []);

  return <div>교통 상태: {traffic}</div>;
};

export default TrafficStatus;

import React, { useEffect, useRef } from 'react';

interface TrafficLayerProps {
  map: any; // 카카오 지도 객체
  apiKey: string; // 카카오 지도 API 키
}

const TrafficLayer: React.FC<TrafficLayerProps> = ({ map, apiKey }) => {
  const trafficLayerRef = useRef<any>(null);

  useEffect(() => {
    const trafficLayer = new window.kakao.maps.services.Traffic(map); // 교통량 레이어 생성
    trafficLayerRef.current = trafficLayer;

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=f3f69e507f70b20f6cdaa643fb68b19b&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        trafficLayer.setMap(map); // 교통량 레이어를 지도에 추가
      });
    };

    return () => {
      trafficLayer.setMap(null); // 컴포넌트 언마운트 시 교통량 레이어를 지도에서 제거
    };
  }, [map, apiKey]);

  return null; // 교통량 레이어는 실제로 보여지는 요소가 없으므로 null을 반환합니다.
};

export default TrafficLayer;

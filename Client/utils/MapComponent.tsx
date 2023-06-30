import React from "react";
import { TMap } from "react-tmap";

const MapComponent: React.FC = () => {
  return (
    <TMap
      id="map-container" // 맵 컨테이너의 id
      apiKey="bEukn9QeYC1tnx9OAck4i9m5fTS6DscR44zbAfSY" // 발급받은 T Map API 키
      zoom={15} // 초기 줌 레벨 설정
      center={{ lat: 37.5665, lng: 126.978 }} // 초기 중심 위치 설정
    />
  );
};

export default MapComponent;

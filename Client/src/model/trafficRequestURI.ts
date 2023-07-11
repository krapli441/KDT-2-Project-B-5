// 리액트 라이브러리
import React, { useContext } from "react";
import { AuthContext } from "./trafficCongestionContext";

// 리액트 컴포넌트
import RequestTrafficPointData from "./getTrafficPointData";

interface RequestDataType {
  version: number;
  minLat: number;
  minLon: number;
  maxLat: number;
  maxLon: number;
  centerLat: number;
  centerLon: number;
  reqCoordType: string;
  resCoordType: string;
  trafficType: string;
  radius: number;
  zoomLevel: number;
  sort: string;
  callback: string;
  appKey: string;
}

const RequestTrafficData = (data: RequestDataType) => {
  const {
    version,
    reqCoordType,
    resCoordType,
    centerLat,
    centerLon,
    trafficType,
    zoomLevel,
    callback,
    appKey,
  } = data;
  const { setCongestion, setColor } = useContext(AuthContext);
  // const { color, setColor } = useContext(AuthContext);

  const requestURI = `https://apis.openapi.sk.com/tmap/traffic?version=${RequestTrafficPointData.version}&format=json&reqCoordType=${RequestTrafficPointData.reqCoordType}&resCoordType=${RequestTrafficPointData.resCoordType}&centerLat=${RequestTrafficPointData.centerLat}&centerLon=${RequestTrafficPointData.centerLon}&trafficType=${RequestTrafficPointData.trafficType}&zoomLevel=${RequestTrafficPointData.zoomLevel}&callback=${RequestTrafficPointData.callback}&appKey=${RequestTrafficPointData.appKey}`;

  fetch(requestURI)
    .then((response) => {
      if (!response.ok) {
        throw new Error("요청이 실패하였습니다.");
      }
      return response.json();
    })
    .then((data) => {
      const resultData = data.features;
      const congestionValues = resultData.map(
        (item: any) => item.properties.congestion
      );
      console.log(
        `혼잡도 요청에 성공하였습니다. 현재 혼잡도는 ${congestionValues}입니다.`
      );
      // ! 도로 혼잡도를 useContext로 관리한다.
      // ! setCongestion은 혼잡도를 나타내며
      // ! setColor는 혼잡도에 따른 색깔을 나타낸다.
      setCongestion(congestionValues[0]);
      setColor(congestionValues[0]);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default RequestTrafficData;

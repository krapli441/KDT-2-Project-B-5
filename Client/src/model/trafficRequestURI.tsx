// 리액트 라이브러리
import { AuthContext } from "./trafficCongestionContext";
import TrafficPointData from "./getTrafficPointData";

const getTrafficData = (
  latitude: number | undefined,
  longitude: number | undefined,
  setCongestion: (congestion: string) => void,
  setColor: (congestion: string) => void
) => {
  const requestURI = `https://apis.openapi.sk.com/tmap/traffic?version=${TrafficPointData.version}&format=json&reqCoordType=${TrafficPointData.reqCoordType}&resCoordType=${TrafficPointData.resCoordType}&centerLat=${latitude}&centerLon=${longitude}&trafficType=${TrafficPointData.trafficType}&zoomLevel=${TrafficPointData.zoomLevel}&callback=${TrafficPointData.callback}&appKey=${TrafficPointData.appKey}`;

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
      setCongestion(congestionValues[0]);
      setColor(congestionValues[0]);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default getTrafficData;

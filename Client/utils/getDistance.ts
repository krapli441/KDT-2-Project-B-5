// 현재 위치와 이전 위치 거리를 측정하는 함수

function getDistance(
  coord1: GeolocationCoordinates,
  coord2: GeolocationCoordinates
) {
  const earthRadius: number = 6371; // 지구 반지름 (단위: km)
  const latDiff: number = toRadians(coord2.latitude - coord1.latitude);
  const lngDiff: number = toRadians(coord2.longitude - coord1.longitude);
  const a: number =
    Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
    Math.cos(toRadians(coord1.latitude)) *
      Math.cos(toRadians(coord2.latitude)) *
      Math.sin(lngDiff / 2) *
      Math.sin(lngDiff / 2);
  const c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance: number = earthRadius * c;
  return distance;
}

function toRadians(degree: number) {
  return degree * (Math.PI / 180);
}

export default getDistance;

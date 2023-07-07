import React from "react";

function getDistance(
  coord1: GeolocationCoordinates,
  coord2: GeolocationCoordinates
) {
  const earthRadius = 6371; // 지구 반지름 (km 단위)
  const latDiff = toRadians(coord2.latitude - coord1.latitude);
  const lngDiff = toRadians(coord2.longitude - coord1.longitude);
  const a =
    Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
    Math.cos(toRadians(coord1.latitude)) *
      Math.cos(toRadians(coord2.latitude)) *
      Math.sin(lngDiff / 2) *
      Math.sin(lngDiff / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;
  return distance;
}

function toRadians(degree: number) {
  return degree * (Math.PI / 180);
}

export default getDistance;
toRadians;

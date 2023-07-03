import React, { useState, useEffect } from "react";
import SampleData from "./getTrafficSampleData";
import { Box } from "@chakra-ui/react";

import MusicController from "../view/fragments/musicController";
import NavigationController from "../view/fragments/navigationController";

declare global {
  interface Window {
    Tmapv3: any;
  }
}

const MapContainer: React.FC = () => {
  const [userRealTimeLocation, setUserRealTimeLocation] =
    useState<GeolocationCoordinates | null>(null);
  const [userCurrentLocation, setUserCurrentLocation] =
    useState<GeolocationCoordinates | null>(null);
  const [map, setMap] = useState<any>(null);
  const [polyLineArr, setPolyLineArr] = useState<any[]>([]);
  const [marker, setMarker] = useState<any>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserCurrentLocation(position.coords);
          console.log(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.log(error);
        },
        {
          enableHighAccuracy: true,
        }
      );

      return () => {
        userCurrentLocation;
      };
    } else {
      console.log("사용자 환경이 위치 정보를 제공하지 않습니다.");
    }
  }, []);

  useEffect(() => {
    if (userCurrentLocation) {
      function generateMap() {
        const map = new window.Tmapv3.Map("tMapContainer", {
          width: "100%",
          height: "100%",
          zoom: 15,
        });
        const marker = new window.Tmapv3.Marker({
          position: new window.Tmapv3.LatLng(
            userCurrentLocation?.latitude,
            userCurrentLocation?.longitude
          ),
          map: map,
        });

        return { map, marker };
      }

      const { map } = generateMap();
      setMap(map);
      setMarker(marker);
    }
  }, [userCurrentLocation]);

  useEffect(() => {
    if (map && userCurrentLocation) {
      const centerLatLng = new window.Tmapv3.LatLng(
        userCurrentLocation.latitude,
        userCurrentLocation.longitude
      );
      map.setCenter(centerLatLng);

      if (marker) {
        marker.setPosition(centerLatLng);
      }
    }
  }, [map, marker, userCurrentLocation]);

  return (
    <>
      <Box
        id="tMapContainer"
        width={"100%"}
        height={"100%"}
        position={"sticky"}
      ></Box>

      <Box
        className="navigationBar"
        display={"flex"}
        flexDirection={"column"}
        width={"100%"}
        height={"20%"}
        fontSize={"24px"}
        backgroundColor={"#21325E"}
        borderRadius={"10% 10% 0% 0%;"}
      >
        <MusicController />
        <NavigationController />
      </Box>
    </>
  );
};

export default MapContainer;

import React, { useEffect, useState } from "react";

const LocationComponent = () => {
  const [location, setLocation] = useState<GeolocationCoordinates | null>(null);

  useEffect(() => {


    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(position.coords);
        },
        (error) => {
          console.log("Error getting location:", error);
        },
        {
          enableHighAccuracy: true,
        }
      );
    } else {
      console.log("Geolocation is not supported.");
    }
  }, []);

  return (
    <div>
      {location ? (
        <>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </>
      ) : (
        "사용자 위치 불러오는 중..."
      )}
    </div>
  );
};

export default LocationComponent;

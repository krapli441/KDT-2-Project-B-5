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
        "Fetching location..."
      )}
    </div>
  );
};

export default LocationComponent;

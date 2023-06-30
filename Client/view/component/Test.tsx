import React, { useEffect, useState } from "react";

const MapComponent = () => {
  const [centerLon, setCenterLon] = useState<number>(0);
  const [centerLat, setCenterLat] = useState<number>(0);
  const [polyLineArr, setPolyLineArr] = useState<any[]>([]);
  const [map, setMap] = useState<any>(null);
  const [zoom, setZoom] = useState<number>(15);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setCenterLat(latitude);
        setCenterLon(longitude);
        initTmap();
      }
    );
  }, []);

  const initTmap = () => {
    const center = new window.Tmapv2.LatLng(centerLat, centerLon);
    const tmap = new window.Tmapv2.Map("map_div", {
      center,
      width: "100%",
      height: "400px",
      zoom: 17,
      zoomControl: true,
      scrollwheel: true,
    });
    setMap(tmap);

    const projection = new window.Tmapv2.Projection();
    projection.init(tmap);

    tmap.addListener("mouseup", function onMoveEnd(evt: any) {
      const mapLatLng = evt.latLng;
      const currentZoom = map.getZoom();

      setZoom(currentZoom);
      setCenterLon(mapLatLng._lng);
      setCenterLat(mapLatLng._lat);
    });
  };

  const handleButtonClick = () => {
    if (map) {
      map.removeMarkers(); // 이전 마커를 제거하는 메소드
      map.removeOverlays(); // 이전 경로를 제거하는 메소드
    }

    const appKey = "n5tcTlbrrd5rR16HzBuog98VPUg1oeiN6X8gIA5x";
    const requestUrl = `https://apis.openapi.sk.com/tmap/traffic?version=1&format=json&reqCoordType=WGS84GEO&resCoordType=EPSG3857&zoomLevel=${zoom}&trafficType=AROUND&radius=3&centerLon=${centerLon}&centerLat=${centerLat}`;

    const xhr = new XMLHttpRequest();
    xhr.open("GET", requestUrl);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("appKey", appKey);
    xhr.onload = function () {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        const resultData = response.features;

        if (polyLineArr.length > 0) {
          for (const polyLine of polyLineArr) {
            polyLine.setMap(null);
          }
          setPolyLineArr([]);
        }

        for (const data of resultData) {
          const geometry = data.geometry;
          const properties = data.properties;

          const drawInfoArr = [];

          if (geometry.type === "LineString") {
            for (const coordinate of geometry.coordinates) {
              const latlng = new window.Tmapv2.Point(
                coordinate[0],
                coordinate[1]
              );
              const convertPoint = new window.Tmapv2.Projection.convertEPSG3857ToWGS84GEO(
                latlng
              );
              const convertChange = new window.Tmapv2.LatLng(
                convertPoint._lat,
                convertPoint._lng
              );

              drawInfoArr.push(convertChange);
            }

            let lineColor = "";
            const sectionCongestion = properties.congestion;

            if (sectionCongestion === 0) {
              lineColor = "#06050D";
            } else if (sectionCongestion === 1) {
              lineColor = "#61AB25";
            } else if (sectionCongestion === 2) {
              lineColor = "#FFFF00";
            } else if (sectionCongestion === 3) {
              lineColor = "#E87506";
            } else if (sectionCongestion === 4) {
              lineColor = "#D61125";
            }

            const polyline = new window.Tmapv2.Polyline({
              path: drawInfoArr,
              strokeColor: lineColor,
              strokeWeight: 6,
              map: map,
            });

            setPolyLineArr((prevPolyLineArr) => [...prevPolyLineArr, polyline]);
          }
        }
      } else {
        console.error("Request failed. Status: " + xhr.status);
      }
    };
    xhr.onerror = function () {
      console.error("Request failed");
    };
    xhr.send();
  };

  return (
    <div>
      <div>
        <span className="tit">센터 경도</span>
        <input
          type="text"
          id="lon"
          name="lon"
          value={centerLon}
          onChange={(e) => setCenterLon(Number(e.target.value))}
        />
        <span className="tit">센터 위도</span>
        <input
          type="text"
          id="lat"
          name="lat"
          value={centerLat}
          onChange={(e) => setCenterLat(Number(e.target.value))}
        />
        <button id="btn_select" onClick={handleButtonClick}>
          요청
        </button>
      </div>

      <div id="map_wrap" className="map_wrap3">
        <div id="map_div" />
      </div>

      <script src="https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=n5tcTlbrrd5rR16HzBuog98VPUg1oeiN6X8gIA5x"></script>
    </div>
  );
};

export default MapComponent;

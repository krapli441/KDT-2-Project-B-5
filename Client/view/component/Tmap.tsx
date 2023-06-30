import React, { useEffect } from 'react';

const Tmap: React.FC = () => {
  useEffect(() => {
    let polyLineArr: any[] = [];
    let map: any;
    let routeLayer: any;
    let zoom = 15;
    let centerLon = 0;
    let centerLat = 0;

    const initTmap = () => {
      map = new window.Tmapv2.Map("map_div", {
        center: new window.Tmapv2.LatLng(centerLat, centerLon),
        width: "100vw",
        height: "500px",
        zoom: zoom,
        zoomControl: true,
        scrollwheel: true,
      });

      const addMarker = (position: { latitude: number; longitude: number }) => {
        const marker = new window.Tmapv2.Marker({
          position: new window.Tmapv2.LatLng(position.latitude, position.longitude),
          map: map,
        });
      };

      const handleRequest = () => {
        if (routeLayer) {
          routeLayer.removeAllFeatures();
        }
        var headers: any = {};
        headers["appKey"] = "n5tcTlbrrd5rR16HzBuog98VPUg1oeiN6X8gIA5x";

        // AJAX 요청 및 처리 로직
        fetch(`https://apis.openapi.sk.com/tmap/traffic?version=1&format=json&reqCoordType=WGS84GEO&resCoordType=EPSG3857&zoomLevel=${zoom}&trafficType=AROUND&centerLon=${centerLon}&centerLat=${centerLat}&radius=1`, {
          headers: headers,
        })
          .then(response => response.json())
          .then(data => {
            var resultData = data.features;
            console.log(resultData);
            if (polyLineArr.length > 0) {
              for (var k in polyLineArr) {
                polyLineArr[k].setMap(null);
              }
              polyLineArr = [];
            }

            for (var i in resultData) {
              var geometry = resultData[i].geometry;
              var properties = resultData[i].properties;
              var polyline_;

              var drawInfoArr: any[] = [];

              if (geometry.type === "LineString") {
                for (var j in geometry.coordinates) {
                  var latlng = new window.Tmapv2.Point(
                    geometry.coordinates[j][0],
                    geometry.coordinates[j][1]
                  );
                  var convertPoint = window.Tmapv2.Projection.convertEPSG3857ToWGS84GEO(
                    latlng
                  );
                  var convertLatlng = new window.Tmapv2.LatLng(
                    convertPoint._lat,
                    convertPoint._lng
                  );

                  drawInfoArr.push(convertLatlng);
                }

                var lineColor = "";

                var sectionCongestion = properties.congestion;

                if (sectionCongestion === 0) {
                  lineColor = "#000000";
                } else if (sectionCongestion === 1) {
                  lineColor = "#61AB25";
                } else if (sectionCongestion === 2) {
                  lineColor = "#FFFF00";
                } else if (sectionCongestion === 3) {
                  lineColor = "#E87506";
                } else if (sectionCongestion === 4) {
                  lineColor = "#D61125";
                }

                polyline_ = new window.Tmapv2.Polyline({
                  path: drawInfoArr,
                  strokeColor: lineColor,
                  strokeWeight: 6,
                  map: map,
                });
                polyLineArr.push(polyline_);
              }
            }
          })
          .catch(error => {
            console.log("Error:", error);
          });
      };

      document.getElementById("btn_select")?.addEventListener("click", handleRequest);

      // 현재 위치 얻어오기
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            centerLat = latitude;
            centerLon = longitude;
            map.setCenter(new window.Tmapv2.LatLng(centerLat, centerLon));

            // 마커 추가
            addMarker({ latitude, longitude });
          },
          error => {
            console.error(error);
          }
        );
      }
    };

    initTmap();
  }, []);

  return (
    <div>
      <span className="tit">센터 경도</span>
      <input type="text" id="lon" name="lon" value="0" readOnly />
      <span className="tit">센터 위도</span>
      <input type="text" id="lat" name="lat" value="0" readOnly />
      <button id="btn_select">
        요청
      </button>

      <div id="map_wrap" className="map_wrap3">
        <div id="map_div"></div>
      </div>
    </div>
  );
};

export default Tmap;

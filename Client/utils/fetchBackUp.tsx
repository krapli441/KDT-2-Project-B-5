// import React, {useEffect} from "react";

// useEffect(() => {
//   // ! 사용자 위치 교통정보 데이터를 가져오는 fetch
// const trafficPointRequestURI = `https://apis.openapi.sk.com/tmap/traffic?version=${PointTrafficSampleData.version}&format=json&reqCoordType=${PointTrafficSampleData.reqCoordType}&resCoordType=${PointTrafficSampleData.resCoordType}&centerLat=${userLocation.latitude}&centerLon=${userLocation.longitude}&trafficType=${PointTrafficSampleData.trafficType}&zoomLevel=${PointTrafficSampleData.zoomLevel}&callback=${PointTrafficSampleData.callback}&appKey=${PointTrafficSampleData.appKey}`;

// fetch(trafficPointRequestURI, {
//   method: "GET",
// })
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error("현재 위치 교통정보 요청이 실패하였습니다.");
//     }
//     return response.json();
//   })
//   .then((data) => {
//     console.log("현재 위치 교통정보를 성공적으로 수신했습니다.");
//     const resultData = data.features;
//     console.log(resultData);
//   });

// // ! 사용자 주변 교통정보 데이터를 가져오는 fetch
// const trafficAroundRequestURI = `https://apis.openapi.sk.com/tmap/traffic?version=${AroundTrafficSampleData.version}&format=json&reqCoordType=${AroundTrafficSampleData.reqCoordType}&resCoordType=${AroundTrafficSampleData.resCoordType}&centerLat=${userLocation.latitude}&centerLon=${userLocation.longitude}&trafficType=${AroundTrafficSampleData.trafficType}&radius=${AroundTrafficSampleData.radius}&zoomLevel=${AroundTrafficSampleData.zoomLevel}&callback=${AroundTrafficSampleData.callback}&appKey=${AroundTrafficSampleData.appKey}`;

// fetch(trafficAroundRequestURI, {
//   method: "GET",
// })
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error("사용자 주변 교통정보 요청이 실패하였습니다.");
//     }
//     return response.json();
//   })
//   .then((data) => {
//     console.log("사용자 주변 교통정보를 성공적으로 수신했습니다.");
//     const resultData = data.features;
//     console.log(resultData);

//     if (polyLineArr.length > 0) {
//       polyLineArr.forEach((polyline) => {
//         polyline.setMap(null);
//       });
//     }

//     const newPolyLineArr: any[] = [];

//     for (const i in resultData) {
//       const geometry = resultData[i].geometry;
//       const properties = resultData[i].properties;

//       if (geometry.type === "LineString") {
//         const drawInfoArr: any[] = [];

//         for (const j in geometry.coordinates) {
//           const latlng = new window.Tmapv3.Point(
//             geometry.coordinates[j][0],
//             geometry.coordinates[j][1]
//           );
//           const convertPoint =
//             new window.Tmapv3.Projection.convertEPSG3857ToWGS84GEO(
//               latlng
//             );
//           const convertChange = new window.Tmapv3.LatLng(
//             convertPoint._lat,
//             convertPoint._lng
//           );

//           drawInfoArr.push(convertChange);
//         }

//         let lineColor = "";
//         const sectionCongestion = properties.congestion;
//         if (sectionCongestion === 0) {
//           lineColor = "#06050D";
//         } else if (sectionCongestion === 1) {
//           lineColor = "#61AB25";
//         } else if (sectionCongestion === 2) {
//           lineColor = "#FFFF00";
//         } else if (sectionCongestion === 3) {
//           lineColor = "#E87506";
//         } else if (sectionCongestion === 4) {
//           lineColor = "#D61125";
//         }

//         const polyline = new window.Tmapv3.Polyline({
//           path: drawInfoArr,
//           strokeColor: lineColor,
//           strokeWeight: 6,
//           map: map,
//         });
//         newPolyLineArr.push(polyline);
//       }
//     }
//     setPolyLineArr(newPolyLineArr);
//   })
//   .catch((error) => {
//     console.log("에러:", error);
//   });
// }, [])

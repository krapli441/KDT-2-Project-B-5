import React, { useEffect } from 'react';
import Tmapv2 from 'tmapv2'; // Tmapv2 라이브러리를 import 해주세요.

function MapComponent() {
  useEffect(() => {
    fetch("https://code.jquery.com/jquery-3.2.1.min.js").then(res=>res).then(data=>console.log('data1',data))
    fetch("https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=FB8ThRVZHU4x1zUhC432j3DKfPOdkpmrajEOCYZe").then(res=>res).then(data=>console.log('data2',data))
  }, []);

  return <div id="map_div"></div>;
}

export default MapComponent;

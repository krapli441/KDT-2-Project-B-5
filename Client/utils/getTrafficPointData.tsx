
const apikey = process.env.REACT_APP_TmapAppkey


const SampleData = {
  
  // ! api의 버전 정보
  version: 1,

  // ? 교통정보 표출 지역 최소 노드의 위도 좌표
  minLat: 36.3016838,

  // ? 교통정보 표출 지역 최소 노드의 경도 좌표
  minLon: 127.3789012,

  // ? 교통정보 표출 지역 최대 노드의 위도 좌표
  maxLat: 36.3016838,

  // ? 교통정보 표출 지역 최대 노드의 경도 좌표.
  maxLon: 127.3789012,

  // ? 반경 검색에서 사용하는 중심 좌표의 위도 좌표
  centerLat: 36.3016838,

  // ? 반경 검색에서 사용하는 중심 좌표의 경도 좌표
  centerLon: 127.3789012,

  // ? 요청 좌표계 유형을 지정
  // ? 기본값인 WGS84GEO는 경위도를 뜻함
  reqCoordType: "WGS84GEO",

  // ? 받고자 하는 응답 좌표계 유형을 지정
  // ? EPSG3857 : Google Mercator
  resCoordType: "EPSG3857",

  // ? 교통 정보 타입을 지정.
  // ? 기본값은 NULL로 되어있다.
  // ! minLat, minLon, maxLat, maxLon의 값은
  // ! 필수로 입력해야 한다.

  // ? AUTO : 지도 레벨에 맞는 최적 범위의 교통 정보를 요청함.
  // ! zoomLevel, centerLat, centerLon의 값은
  // ! 필히 입력해야 한다.

  // ? AROUND : 반경 내 교통정보를 요청한다.
  // ! radius 값을 입력해주어야 한다.
  // ! centerLat, centerLon 값은 필히 입력해야 한다.

  // ? POINT : 특정 지점의 텍스트 교통정보를 요청한다.
  // ! centerLat, centerLon 값은 필히 입력해야 한다.

  // ? ACC : 돌발 정보를 요청한다.
  // ! minLat, minLon, maxLat, maxLon의 값은 필히 입력해야 한다.

  trafficType1: "POINT",
  trafficType2: "AROUND",



  // ? radius : 주변 교통 정보 반경을 지정한다.
  radius: 9,
  

  // ? zoomLevel : 교통정보를 표현할 맵의 레벨 별 제한 거리를 지정한다.
  zoomLevel: 15,

  // ? sort : 지리정보 개체의 정렬 순서를 지정함.
  // ? index(기본값)
  // ? 노드의 종류에 상관없이 인덱스의 순서로 정렬함.
  sort: "index",

  // ? callback : jsonp 포맷에서 사용하는 callback 함수명 정보입니다.
  // ? application/javascript일 때 필수로 입력해야 함.
  callback: "function",

  // ? appKey : 발급받은 APP Key
  appKey: apikey
  // appKey:"FB8ThRVZHU4x1zUhC432j3DKfPOdkpmrajEOCYZe"
};

export default SampleData;

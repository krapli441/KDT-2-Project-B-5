import React from 'react';
import Tmap from 'react-tmap';

const MapComponent = () => {
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Tmap
        id="map"
        appKey="FB8ThRVZHU4x1zUhC432j3DKfPOdkpmrajEOCYZe"
        zoom={15}
        center={{ lat: 37.5665, lng: 126.9780 }}
      />
    </div>
  );
}

export default MapComponent;

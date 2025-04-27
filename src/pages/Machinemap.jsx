

import React from 'react';
import MapComponent from '../components/maps/MapComponent';
import './Machinemap.css'; // Create this CSS file

function Machinemap() {
  return (
    <div className="machine-map-container">

      <h2 className="machine-map-title">Sanitary Waste Management Network</h2>
        
      <div className="map-wrapper">
        <MapComponent/>
      </div>
    </div>
  );
}

export default Machinemap;



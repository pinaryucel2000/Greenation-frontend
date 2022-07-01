import React from "react";
import { withScriptjs } from "react-google-maps";

import Map from "./map";

function App() {
  const MapLoader = withScriptjs(Map);

  //AIzaSyAUCrM6-_YBzB7JbrzqagFukudNdcCsHZA
  return (
    <div className="App">
      <MapLoader
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBdaa4ZgkjqhOIr3Kv_vXN_Igbza7QU72U"
        loadingElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}

export default App;

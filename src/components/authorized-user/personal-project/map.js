/* global google */
import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Polyline,
} from "react-google-maps";

import { GOOGLE_API_KEY } from "../../../constants";

const Map = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=" +
      GOOGLE_API_KEY +
      "&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  return (
    <GoogleMap defaultZoom={18} defaultCenter={props.center}>
      {props.lines.map(function (line, k) {
        return (
          <div>
            <Marker position={{ lat: 29.3985073, lng: -98.5258003 }} />
            <Polyline
              options={{
                strokeColor: "#31b573",
                strokeOpacity: 1.0,
                strokeWeight: 1.8,
                icons: [
                  {
                    icon: {
                      path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                    },
                    offset: "20%",
                  },
                ],
              }}
              path={[
                { lat: line.start.lat, lng: line.start.lng },
                { lat: line.end.lat, lng: line.end.lng },
              ]}
            />
          </div>
        );
      })}
    </GoogleMap>
  );
});

export default Map;

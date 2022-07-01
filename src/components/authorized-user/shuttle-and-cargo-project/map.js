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
  const blueIcon = {
    url: "../../markers/blueMarker.png", // url
    scaledSize: new google.maps.Size(25, 40), // scaled size
    origin: new google.maps.Point(0, 0), // origin
    anchor: new google.maps.Point(12.5, 40), // anchor
  };

  const redIcon = {
    url: "../../markers/redMarker.png", // url
    scaledSize: new google.maps.Size(25, 40), // scaled size
    origin: new google.maps.Point(0, 0), // origin
    anchor: new google.maps.Point(12.5, 40), // anchor
  };

  return (
    <GoogleMap defaultZoom={14} defaultCenter={props.center}>
      {props.waypoints.map(function (waypoint, i) {
        return (
          <div>
            <Marker
              icon={redIcon}
              position={{
                lat: parseFloat(waypoint.lat),
                lng: parseFloat(waypoint.lng),
              }}
            />
          </div>
        );
      })}{" "}
      <Marker
        icon={blueIcon}
        position={{
          lat: parseFloat(props.startPoint.lat),
          lng: parseFloat(props.startPoint.lng),
        }}
      />
      {props.routes.map(function (lines, c) {
        if (props.selectedRouteIndex != -1 && props.selectedRouteIndex != c) {
          return;
        }
        return lines.map(function (line, k) {
          let sc =
            props.selectedRouteIndex == -1
              ? props.COLORS[c]
              : props.COLORS[props.selectedRouteIndex];

          return (
            <div>
              <Polyline
                options={{
                  strokeColor: sc,
                  strokeOpacity: 1.0,
                  strokeWeight: 1.8,
                  geodesic: true,
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
        });
      })}
    </GoogleMap>
  );
});

export default Map;

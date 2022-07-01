/* global google */
import React from "react";

import {
  withGoogleMap,
  GoogleMap,
  Marker,
  withScriptjs,
} from "react-google-maps";

const Markers = (props) => {
  const blueIcon = {
    url: "../../../markers/blueMarker.png", // url
    scaledSize: new google.maps.Size(25, 40), // scaled size
    origin: new google.maps.Point(0, 0), // origin
    anchor: new google.maps.Point(12.5, 40), // anchor
  };

  const redIcon = {
    url: "../../../markers/redMarker.png", // url
    scaledSize: new google.maps.Size(25, 40), // scaled size
    origin: new google.maps.Point(0, 0), // origin
    anchor: new google.maps.Point(12.5, 40), // anchor
  };

  const handleMarkerPositionChange = (e) => {
    //document.getElementById("map111").remove();

    if (props.index == -1) {
      props.setDeparturePointLatLng({
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      });
      props.setDeparturePoint(
        "(" + e.latLng.lat() + ", " + e.latLng.lng() + ")"
      );
    } else {
      let tmp = [];

      for (let i = 0; i < props.destinationPointsLatLng.length; i++) {
        tmp.push({
          lat: props.destinationPointsLatLng[i].lat,
          lng: props.destinationPointsLatLng[i].lng,
        });
      }

      tmp[props.index] = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };

      props.setDestinationPointsLatLng(tmp);

      tmp = props.destinationPoints;
      tmp[props.index] = "(" + e.latLng.lat() + ", " + e.latLng.lng() + ")";
      props.setDestinationPoints(tmp);
      document.getElementById("dest" + props.index).value =
        "(" + e.latLng.lat() + ", " + e.latLng.lng() + ")";
    }
  };

  return (
    <GoogleMap
      onClick={(e) => {
        handleMarkerPositionChange(e);
      }}
      defaultZoom={props.zoom}
      defaultCenter={props.center}
    >
      <Marker
        id="map111"
        icon={blueIcon}
        position={{
          lat: parseFloat(props.departurePointLatLng.lat),
          lng: parseFloat(props.departurePointLatLng.lng),
        }}
        draggable={props.index == -1 ? true : false}
        onDrag={(e) => {
          if (props.index == -1) {
            handleMarkerPositionChange(e);
          }
        }}
      />

      {props.destinationPointsLatLng.map(function (place, i) {
        return (
          <Marker
            label={
              place.no == -1
                ? null
                : {
                    color: "black",
                    fontWeight: "bold",
                    text: i + 1 + "",
                  }
            }
            icon={redIcon}
            position={{
              lat: parseFloat(place.lat),
              lng: parseFloat(place.lng),
            }}
            draggable={props.index == i ? true : false}
            onDrag={(e) => {
              if (props.index == i) {
                handleMarkerPositionChange(e);
              }
            }}
          />
        );
      })}
    </GoogleMap>
  );
};

export default withScriptjs(withGoogleMap(Markers));

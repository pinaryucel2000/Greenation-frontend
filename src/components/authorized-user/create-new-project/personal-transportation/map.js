/* global google */
import React from "react";
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  withScriptjs,
} from "react-google-maps";

let lat;
let lng;

const Markers = (props) => {
  if (props.place != {}) {
    lat = parseFloat(props.place.lat);
    lng = parseFloat(props.place.lng);
  }

  const handleMarkerPositionChange = (e) => {
    lat = e.latLng.lat();
    lng = e.latLng.lng();
    props.setPlace({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
    props.setPlaceText("(" + lat + ", " + lng + ")");
  };

  const icon = {
    url: props.url, // url
    scaledSize: new google.maps.Size(25, 40), // scaled size
    origin: new google.maps.Point(0, 0), // origin
    anchor: new google.maps.Point(12.5, 40), // anchor
  };

  const fixedIcon = {
    url: props.fixedUrl, // url
    scaledSize: new google.maps.Size(25, 40), // scaled size
    origin: new google.maps.Point(0, 0), // origin
    anchor: new google.maps.Point(12.5, 40), // anchor
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
        icon={icon}
        position={{ lat: lat, lng: lng }}
        draggable={true}
        onDrag={(e) => {
          handleMarkerPositionChange(e);
        }}
      />

      <Marker
        icon={fixedIcon}
        position={{
          lat: parseFloat(props.fixedPlace.lat),
          lng: parseFloat(props.fixedPlace.lng),
        }}
      />
    </GoogleMap>
  );
};

export default withScriptjs(withGoogleMap(Markers));

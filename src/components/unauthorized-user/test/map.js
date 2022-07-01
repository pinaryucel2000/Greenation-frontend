/*global google*/
import React, { Component } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  DirectionsRenderer,
  Marker,
} from "react-google-maps";

class Map extends Component {
  state = {
    directions: null,
  };

  componentDidMount() {
    const directionsService = new google.maps.DirectionsService();

    const origin = { lat: 53.08600907596526, lng: 8.767851834365844 };
    const destination = { lat: 53.08600907596526, lng: 8.767851834365844 };

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
        waypoints: [
          {
            location: new google.maps.LatLng(
              53.37902759586214,
              8.858111142502198
            ),
          },
          {
            location: new google.maps.LatLng(
              53.15727042499393,
              8.407671689377198
            ),
          },
        ],
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          console.log(result);
          this.setState({
            directions: result,
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }

  render() {
    const GoogleMapExample = withGoogleMap((props) => (
      <GoogleMap defaultCenter={{ lat: 6.5244, lng: 3.3792 }} defaultZoom={13}>
        <DirectionsRenderer
          options={{ suppressMarkers: true }}
          directions={this.state.directions}
        />
        <Marker
          position={{
            lat: 53.08600907596526,
            lng: 8.767851834365844,
          }}
        />
      </GoogleMap>
    ));

    return (
      <div>
        <GoogleMapExample
          containerElement={<div style={{ height: `500px`, width: "500px" }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default Map;

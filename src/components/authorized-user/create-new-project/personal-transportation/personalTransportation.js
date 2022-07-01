import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import RoomIcon from "@mui/icons-material/Room";
import LinearProgress from "@mui/material/LinearProgress";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

import "./personalTransportation.css";
import { setCoordinates } from "../util";
import { getLocalStorage } from "../../../../util";
import { SERVER, GOOGLE_API_KEY } from "../../../../constants";
import {
  AddressTextField,
  VehicleSelect,
  CreateButton,
  OkButton,
} from "../createNewProjectStyledComponents";
import Map from "./map.js";

function PersonalTransportation({ name, vehicles }) {
  const userID = getLocalStorage("id");

  const [loading, setLoading] = useState(false);

  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [error, setError] = useState("");

  const [vehicleID, setVehicleID] = useState();

  const [selectedPoint, setSelectedPoint] = useState("departure");

  const [departurePoint, setDeparturePoint] = useState("");
  const [departurePointLatLng, setDeparturePointLatLng] = useState({});

  const [destinationPoint, setDestinationPoint] = useState("");
  const [destinationPointLatLng, setDestinationPointLatLng] = useState({});

  const center = {
    lat: 53.073635,
    lng: 8.806422,
  };

  const createProjectRequest = () => {
    setLoading(true);

    if (name == "") {
      setError("Please name your project.");
      setLoading(false);
      setErrorDialogOpen(true);
      return;
    }

    if (!departurePointLatLng.lng) {
      setError("Departure point is not a valid point.");
      setLoading(false);
      setErrorDialogOpen(true);
      return;
    }

    if (!destinationPointLatLng.lng) {
      setError("Destination point is not a valid point.");
      setLoading(false);
      setErrorDialogOpen(true);
      return;
    }

    if (!(vehicleID > 0)) {
      setError("Please select a vehicle.");
      setLoading(false);
      setErrorDialogOpen(true);
      return;
    }

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const apiCall =
      SERVER +
      "plan/1?source_point=[" +
      departurePointLatLng.lng +
      "," +
      departurePointLatLng.lat +
      "]&dest_point=[" +
      +destinationPointLatLng.lng +
      "," +
      destinationPointLatLng.lat +
      "]&vehicleID=" +
      vehicleID +
      "&ownerID=" +
      userID +
      "&name=" +
      '"' +
      name +
      '"';

    console.log(apiCall);
    setLoading(true);
    fetch(apiCall, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
        if (data.projectID != undefined) {
          window.location.href = "/project/personal/" + data.projectID;
        } else {
          setError("The project name you selected already exists.");
          setLoading(false);
          setErrorDialogOpen(true);
        }
      });
  };

  return (
    <div className="personalContainer">
      <Dialog open={loading}>
        <DialogContent>
          Your project is being loaded. This process may take a while.
          <br /> <br />
          <LinearProgress color="inherit" className="linearProcess" />
        </DialogContent>
      </Dialog>

      <Dialog open={errorDialogOpen}>
        <DialogContent>{error}</DialogContent>
        <DialogActions>
          <OkButton
            onClick={() => {
              setErrorDialogOpen(false);
            }}
            autoFocus
          >
            Ok
          </OkButton>
        </DialogActions>
      </Dialog>

      <div className="personalProjectBottom">
        <div className="personalProjectBottomColumn">
          <div className="hintPersonal">
            To use the map for selecting the point of departure and destination,
            click on the respective marker icon and place it on the map.
          </div>
          <div className="labelButtonPair">
            <IconButton
              onClick={() => {
                setSelectedPoint("departure");
              }}
              color="success"
            >
              <RoomIcon
                style={{
                  fontSize: "30px",
                  color: "#5C4033",
                }}
              />
            </IconButton>
            <p
              style={
                selectedPoint == "departure"
                  ? {
                      textDecoration: "underline",
                      fontWeight: "800",
                    }
                  : {}
              }
            >
              Point of Departure:
            </p>
          </div>
          <AddressTextField
            value={departurePoint}
            onChange={(event) => {
              let value = event.target.value;
              setDeparturePoint(value);
              let c = setCoordinates(value);

              if (c != -1) {
                setDeparturePointLatLng(c);
              }
            }}
            multiline
            rows={2}
          ></AddressTextField>
          <div className="labelButtonPair">
            <IconButton
              onClick={() => {
                setSelectedPoint("destination");
              }}
            >
              <RoomIcon style={{ fontSize: "30px", color: "#31b573" }} />
            </IconButton>
            <p
              style={
                selectedPoint == "destination"
                  ? {
                      textDecoration: "underline",
                      fontWeight: "800",
                    }
                  : {}
              }
            >
              Destination:
            </p>
          </div>
          <AddressTextField
            value={destinationPoint}
            onChange={(event) => {
              let value = event.target.value;
              setDestinationPoint(value);
              let c = setCoordinates(value);

              if (c != -1) {
                setDestinationPointLatLng(c);
              }
            }}
            multiline
            rows={2}
          ></AddressTextField>

          <div className="vehicleInfoContainer">
            <p>Vehicle:</p>
            <VehicleSelect
              onChange={(event, newValue) => {
                setVehicleID(newValue.vehicleID);
              }}
              disablePortal
              options={vehicles}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
        </div>
        <div className="emptyColumn"></div>
        <div className="personalProjectBottomColumn">
          {selectedPoint == "departure" ? (
            <Map
              url={"../../../markers/brownMarker.png"}
              fixedUrl={"../../../markers/greenMarker.png"}
              fixedPlace={destinationPointLatLng}
              setPlaceText={setDeparturePoint}
              setPlace={setDeparturePointLatLng}
              googleMapURL={
                "https://maps.googleapis.com/maps/api/js?key=" + GOOGLE_API_KEY
              }
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `100%` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              center={center}
              zoom={10}
              place={departurePointLatLng}
            />
          ) : (
            <Map
              url={"../../../markers/greenMarker.png"}
              fixedUrl={"../../../markers/brownMarker.png"}
              fixedPlace={departurePointLatLng}
              setPlaceText={setDestinationPoint}
              setPlace={setDestinationPointLatLng}
              googleMapURL={
                "https://maps.googleapis.com/maps/api/js?key=" + GOOGLE_API_KEY
              }
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `100%` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              center={center}
              zoom={10}
              place={destinationPointLatLng}
            />
          )}
        </div>
      </div>

      <CreateButton
        onClick={() => {
          createProjectRequest();
        }}
      >
        Create Project
      </CreateButton>
    </div>
  );
}

export default PersonalTransportation;

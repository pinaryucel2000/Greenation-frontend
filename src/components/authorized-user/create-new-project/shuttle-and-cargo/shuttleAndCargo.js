import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import RoomIcon from "@mui/icons-material/Room";
import LinearProgress from "@mui/material/LinearProgress";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import Tooltip from "@mui/material/Tooltip";
import DialogActions from "@mui/material/DialogActions";

import "./shuttleAndCargo.css";
import { setCoordinates } from "../util";
import { getLocalStorage } from "../../../../util";
import { SERVER, GOOGLE_API_KEY } from "../../../../constants";
import {
  AddressTextField,
  VehicleSelect,
  CreateButton,
  AddButton,
  DeleteButton,
  UploadButton,
  UploadFileIcon,
  Help,
  CargoVolume,
  OkButton,
} from "../createNewProjectStyledComponents";
import Map from "./map.js";

function ShuttleAndCargo({ name, vehicles, type }) {
  const userID = getLocalStorage("id");

  const [loading, setLoading] = useState(false);

  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [error, setError] = useState("");

  const [fileName, setFileName] = useState("");
  const [fileUploaded, setFileUploaded] = useState(false);

  const [returnBack, setReturnBack] = useState(false);
  const [cargoVolume, setCargoVolume] = useState();

  const [selectedPoint, setSelectedPoint] = useState("departure");
  const [selectedVehicles, setSelectedVehicles] = useState([-1]);

  const [departurePoint, setDeparturePoint] = useState("");
  const [departurePointLatLng, setDeparturePointLatLng] = useState({});

  const [destinationPoints, setDestinationPoints] = useState([""]);
  const [destinationPointsLatLng, setDestinationPointsLatLng] = useState([{}]);

  const center = {
    lat: 53.073635,
    lng: 8.806422,
  };

  const createProject = () => {
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

    for (let i = 0; i < destinationPointsLatLng.length; i++) {
      if (!destinationPointsLatLng[i].lng) {
        setError("Destination point " + (i + 1) + " is not a valid point.");
        setLoading(false);
        setErrorDialogOpen(true);
        return;
      }
    }

    if (selectedVehicles[0] == -1 && selectedVehicles.length == 1) {
      setError("Please select at least one vehicle.");
      setLoading(false);
      setErrorDialogOpen(true);
      return;
    }

    for (let i = 0; i < selectedVehicles.length; i++) {
      if (selectedVehicles[i] == -1) {
        setError("Please select vehicle " + (i + 1) + ".");
        setLoading(false);
        setErrorDialogOpen(true);
        return;
      }
    }

    if (type == "shuttle") {
      let totalVehicleCapacity = 0;

      for (let i = 0; i < selectedVehicles.length; i++) {
        for (let j = 0; j < vehicles.length; j++) {
          if (selectedVehicles[i] == vehicles[j].vehicleID) {
            totalVehicleCapacity = totalVehicleCapacity + vehicles[j].capacity;
          }
        }
      }

      if (totalVehicleCapacity < destinationPoints.length) {
        setError(
          "The total capacity of the vehicles cannot be less than the number of destination points."
        );
        setLoading(false);
        setErrorDialogOpen(true);
        return;
      }
    }

    if (type == "cargo") {
      if (!(cargoVolume > 0)) {
        setError("Cargo volume should be a positive number.");
        setLoading(false);
        setErrorDialogOpen(true);
        return;
      }
    }

    if (type == "shuttle") {
      createProjectRequestShuttle();
    } else {
      createProjectRequestCargo();
    }
  };

  const createProjectRequestCargo = () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    let apiCall =
      SERVER +
      "plan/3?source_point=[" +
      departurePointLatLng.lat +
      "," +
      departurePointLatLng.lng +
      "]&dest_points=[";

    for (let i = 0; i < destinationPointsLatLng.length; i++) {
      apiCall =
        apiCall +
        "[" +
        destinationPointsLatLng[i].lat +
        "," +
        destinationPointsLatLng[i].lng +
        "]";

      if (i != destinationPointsLatLng.length - 1) {
        apiCall = apiCall + ",";
      }
    }

    apiCall = apiCall + "]&vehicles=[";

    for (let i = 0; i < selectedVehicles.length; i++) {
      apiCall = apiCall + selectedVehicles[i];

      if (i != selectedVehicles.length - 1) {
        apiCall = apiCall + ",";
      }
    }

    apiCall =
      apiCall +
      "]&owner=" +
      userID +
      "&name=" +
      '"' +
      name +
      '"' +
      "&cargo_volume=" +
      cargoVolume;

    setLoading(true);
    fetch(apiCall, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLoading(false);

        if (data[0] != undefined && parseInt(data[0]) >= 0) {
          window.location.href = "/project/cargo/" + data[0];
        } else if (
          data ==
          "The current vehicles' cargo capacity is not enough for this project."
        ) {
          setError(
            "The current vehicles' cargo capacity is not enough for this project."
          );
          setLoading(false);
          setErrorDialogOpen(true);
        } else if (data == "No solution path found for specified locations.") {
          setError("No solution path found for specified locations.");
          setLoading(false);
          setErrorDialogOpen(true);
        } else {
          setError("The project name you selected already exists.");
          setLoading(false);
          setErrorDialogOpen(true);
        }
      });
  };

  const createProjectRequestShuttle = () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    let apiCall =
      SERVER +
      "plan/2?source_point=[" +
      departurePointLatLng.lat +
      "," +
      departurePointLatLng.lng +
      "]&dest_points=[";

    for (let i = 0; i < destinationPointsLatLng.length; i++) {
      apiCall =
        apiCall +
        "[" +
        destinationPointsLatLng[i].lat +
        "," +
        destinationPointsLatLng[i].lng +
        "]";

      if (i != destinationPointsLatLng.length - 1) {
        apiCall = apiCall + ",";
      }
    }

    apiCall = apiCall + "]&vehicles=[";

    for (let i = 0; i < selectedVehicles.length; i++) {
      apiCall = apiCall + selectedVehicles[i];

      if (i != selectedVehicles.length - 1) {
        apiCall = apiCall + ",";
      }
    }

    let no_depot_val = returnBack ? "False" : "True";

    apiCall =
      apiCall +
      "]&owner=" +
      userID +
      "&name=" +
      '"' +
      name +
      '"' +
      "&no_depot=" +
      '"' +
      no_depot_val +
      '"';
    console.log(apiCall);

    setLoading(true);
    fetch(apiCall, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);

        if (data[0] != undefined && parseInt(data[0]) >= 0) {
          window.location.href = "/project/shuttle/" + data[0];
        } else {
          setError("The project name you selected already exists.");
          setLoading(false);
          setErrorDialogOpen(true);
        }
      });
  };

  const handleDepartureAddressChange = (event) => {
    let value = event.target.value;
    setDeparturePoint(value);
    let c = setCoordinates(value);

    if (c != -1) {
      setDeparturePointLatLng(c);
    } else {
      setDeparturePointLatLng({});
    }
  };

  const handleDestinationAddressChange = (event, i) => {
    let value = event.target.value;
    let tmp = destinationPoints;
    tmp[i] = value;
    setDestinationPoints(tmp);
    let c = setCoordinates(value);

    if (c != -1) {
      tmp = [];
      for (let i = 0; i < destinationPointsLatLng.length; i++) {
        tmp.push({
          lat: destinationPointsLatLng[i].lat,
          lng: destinationPointsLatLng[i].lng,
        });
      }
      tmp[i] = { lat: c.lat, lng: c.lng };
      setDestinationPointsLatLng(tmp);
    } else {
      tmp = [];

      for (let i = 0; i < destinationPointsLatLng.length; i++) {
        tmp.push({
          lat: destinationPointsLatLng[i].lat,
          lng: destinationPointsLatLng[i].lng,
        });
      }

      tmp[i] = {};
      setDestinationPointsLatLng(tmp);
    }
  };

  const addDestination = () => {
    let tmp = [];

    for (let i = 0; i < destinationPoints.length; i++) {
      tmp.push(destinationPoints[i]);
    }

    tmp.push("");
    setDestinationPoints(tmp);

    tmp = [];

    for (let i = 0; i < destinationPointsLatLng.length; i++) {
      tmp.push({
        lat: destinationPointsLatLng[i].lat,
        lng: destinationPointsLatLng[i].lng,
      });
    }

    tmp.push({});
    setDestinationPointsLatLng(tmp);
  };

  const deleteDestination = (index) => {
    let tmp = [];

    for (let i = 0; i < destinationPoints.length; i++) {
      if (i != index) {
        tmp.push(destinationPoints[i]);
      }
    }

    setDestinationPoints(tmp);

    tmp = [];

    for (let i = 0; i < destinationPointsLatLng.length; i++) {
      if (i != index) {
        tmp.push({
          lat: destinationPointsLatLng[i].lat,
          lng: destinationPointsLatLng[i].lng,
        });
      }
    }

    setDestinationPointsLatLng(tmp);
  };

  const deleteVehicle = (index) => {
    let tmp = [];
    for (let i = 0; i < selectedVehicles.length; i++) {
      if (i != index) {
        tmp.push(selectedVehicles[i]);
      }
    }
  };

  const setVehicle = (index, vehicleID) => {
    let tmp = selectedVehicles;
    tmp[index] = vehicleID;
    setSelectedVehicles(tmp);
  };

  const addVehicle = () => {
    let tmp = [];
    for (let i = 0; i < selectedVehicles.length; i++) {
      tmp.push(selectedVehicles[i]);
    }
    tmp.push(-1);
    setSelectedVehicles(tmp);
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileContent = e.target.result;

      let destinationPointsLatLngTmp = [];
      let destinationPointsTmp = [];

      let coordinates;

      let index = 0;
      let value = "";

      while (index < fileContent.length) {
        value = "";

        while (fileContent[index] != "\n") {
          value = value + fileContent[index++];
        }

        index++;
        value = value.replace(/(\r\n|\n|\r)/gm, "");

        coordinates = setCoordinates("(" + value + ")");

        if (coordinates == -1) {
          setError("The uploaded file contains invalid coordinates.");
          setFileUploaded(false);
          setFileName("");
          setErrorDialogOpen(true);
        } else {
          destinationPointsLatLngTmp.push(coordinates);
          destinationPointsTmp.push(
            "(" + coordinates.lat + "," + coordinates.lng + ")"
          );
        }
      }

      setDestinationPointsLatLng(destinationPointsLatLngTmp);
      setDestinationPoints(destinationPointsTmp);

      for (let i = 0; i < destinationPointsTmp.length; i++) {
        document.getElementById("dest" + i).value = destinationPointsTmp[i];
      }
    };

    if (e.target.files[0].type != "text/csv") {
      setError("Uploaded file is not a CSV file.");
      setErrorDialogOpen(true);
    } else {
      setFileName(e.target.files[0].name);
      setFileUploaded(true);
      reader.readAsText(e.target.files[0]);
    }
  };

  return (
    <div className="shuttleServices">
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

      <Dialog open={loading}>
        <DialogContent>
          Your project is being loaded. This process may take a while.
          <br /> <br />
          <LinearProgress color="inherit" className="linearProcess" />
        </DialogContent>
      </Dialog>

      <div className="shuttleServicesBottom">
        <div className="shuttleServicesBottomColumn">
          {/* CSV File */}
          <h2>Upload CSV File</h2>
          <div className="hintShuttleCSV">
            You can use a CSV file to fill the data automatically. Please refer
            to the user guide if you are in doubt.
          </div>
          <div className="fileInput">
            <input
              style={{ display: "none" }}
              id="raised-button-file"
              type="file"
              onChange={(event) => {
                handleFileChange(event);
              }}
            />
            <label htmlFor="raised-button-file">
              <UploadButton variant="raised" component="span">
                Upload
                <UploadFileIcon />
              </UploadButton>
            </label>
            <p className="fileName">{fileName}</p>
          </div>

          <div className="shuttleBorder"></div>
          {/* Checkbox */}
          <h2>Route Settings</h2>
          <div className="routeSetting">
            {type == "shuttle" ? (
              <div className="returnBack">
                <Checkbox
                  onChange={() => {
                    setReturnBack(!returnBack);
                  }}
                  checked={returnBack}
                  defaultChecked
                  color="default"
                />
                Return back to the point of departure
                <Tooltip
                  title="Checking this checkbox, will make the output map display the way back to the point of departure for all used vehicles."
                  placement="right"
                >
                  <Help />
                </Tooltip>
              </div>
            ) : (
              <div className="cargoVolume">
                <p>Cargo Volume (liter): </p>
                <CargoVolume
                  type={"number"}
                  value={cargoVolume}
                  onChange={(e) => {
                    let input = e.target.value;
                    if (
                      !input ||
                      (input[input.length - 1].match("[0-9]") &&
                        input[0].match("[1-9]"))
                    )
                      setCargoVolume(e.target.value);
                  }}
                ></CargoVolume>
              </div>
            )}
          </div>

          <div className="shuttleBorder"></div>
          {/* Points */}
          <h2>Points</h2>
          <div className="hintShuttlePoints">
            To use the map for selecting the point of departure and destination,
            click on the respective marker icon and place it on the map.
          </div>
          {/* Departure Point */}
          <div className="labelButtonPair">
            <IconButton
              onClick={() => {
                setSelectedPoint("departure");
              }}
            >
              <RoomIcon
                style={{
                  fontSize: "30px",
                  color: "#29b6ec",
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
            multiline
            rows={2}
            value={departurePoint}
            onChange={(event) => {
              handleDepartureAddressChange(event);
            }}
          ></AddressTextField>
          {fileUploaded ? (
            <p>
              Destination points are read from the CSV file that is uploaded.
            </p>
          ) : (
            <div>
              {/* Destination 1 */}
              <div className="labelButtonPair">
                <IconButton
                  onClick={() => {
                    setSelectedPoint(0);
                  }}
                >
                  <RoomIcon
                    style={{
                      fontSize: "30px",
                      color: "#ff0000",
                    }}
                  />
                </IconButton>
                <p
                  style={
                    selectedPoint == 0
                      ? {
                          textDecoration: "underline",
                          fontWeight: "800",
                        }
                      : {}
                  }
                >
                  Destination 1:
                </p>
              </div>
              <AddressTextField
                multiline
                id="dest0"
                rows={2}
                onChange={(event) => {
                  handleDestinationAddressChange(event, 0);
                }}
              ></AddressTextField>
              {/* Destination 2, 3, 4 .... */}
              {destinationPoints.map(function (destinationPoint, i) {
                if (i == 0) {
                  return;
                }
                return (
                  <div>
                    <div className="labelButtonPair">
                      <IconButton
                        onClick={() => {
                          setSelectedPoint(i);
                        }}
                      >
                        <RoomIcon
                          style={{
                            fontSize: "30px",
                            color: "#ff0000",
                          }}
                        />
                      </IconButton>
                      <p
                        style={
                          selectedPoint == i
                            ? {
                                textDecoration: "underline",
                                fontWeight: "800",
                              }
                            : {}
                        }
                      >
                        Destination {i + 1}:
                      </p>
                    </div>
                    <div className="addressDeletePair">
                      <AddressTextField
                        multiline
                        rows={2}
                        id={"dest" + i}
                        onChange={(event) => {
                          handleDestinationAddressChange(event, i);
                        }}
                      ></AddressTextField>
                      {i == destinationPoints.length - 1 ? (
                        <DeleteButton
                          onClick={() => {
                            deleteDestination(i);
                          }}
                          color="inherit"
                        >
                          <DeleteIcon />
                        </DeleteButton>
                      ) : null}
                    </div>
                  </div>
                );
              })}
              {/* Add New Destination Button */}
              <AddButton
                startIcon={<AddCircleIcon style={{ fontSize: "30px" }} />}
                onClick={() => {
                  addDestination();
                }}
              >
                Add Destination
              </AddButton>
            </div>
          )}

          <div className="shuttleBorder"></div>
          <h2>Vehicles</h2>
          {/* Vehicle 1 */}
          <div className="vehicleInfoContainer">
            <p>Vehicle 1:</p>
            <VehicleSelect
              onChange={(event, newValue) => {
                setVehicle(0, newValue.vehicleID);
              }}
              id="vehicle0"
              disablePortal
              options={vehicles}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
          {/* Vehicle 2, 3, 4 .... */}
          {selectedVehicles.map(function (selectedVehicle, i) {
            if (i == 0) {
              return;
            }

            return (
              <div className="vehicleInfoContainer">
                <p>Vehicle {i + 1}:</p>
                <div className="vehicleDeletePair">
                  <VehicleSelect
                    id={"vehicle" + i}
                    onChange={(event, newValue) => {
                      setVehicle(i, newValue.vehicleID);
                    }}
                    disablePortal
                    options={vehicles}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} />}
                  />{" "}
                  {i == selectedVehicles.length - 1 ? (
                    <DeleteButton
                      style={{ marginTop: "0px" }}
                      onClick={() => {
                        deleteVehicle(i);
                      }}
                      color="inherit"
                    >
                      <DeleteIcon />
                    </DeleteButton>
                  ) : null}
                </div>
              </div>
            );
          })}
          {/* Add New Vehicle Button */}
          <AddButton
            startIcon={<AddCircleIcon style={{ fontSize: "30px" }} />}
            onClick={() => {
              addVehicle();
            }}
          >
            Add Vehicle
          </AddButton>
        </div>

        <div className="emptyColumn"></div>
        <div className="shuttleServicesBottomColumn">
          <div className="shuttleServicesMap">
            <Map
              //Departure point
              departurePoint={departurePoint}
              departurePointLatLng={departurePointLatLng}
              setDeparturePoint={setDeparturePoint}
              setDeparturePointLatLng={setDeparturePointLatLng}
              // Destination point
              destinationPoints={destinationPoints}
              destinationPointsLatLng={destinationPointsLatLng}
              setDestinationPoints={setDestinationPoints}
              setDestinationPointsLatLng={setDestinationPointsLatLng}
              //Selected point's index
              index={selectedPoint == "departure" ? -1 : selectedPoint}
              googleMapURL={
                "https://maps.googleapis.com/maps/api/js?key=" + GOOGLE_API_KEY
              }
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `100%` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              center={center}
              zoom={10}
            />
          </div>

          <div />
        </div>
      </div>
      <CreateButton
        onClick={() => {
          createProject();
        }}
      >
        Create Project
      </CreateButton>
    </div>
  );
}

export default ShuttleAndCargo;

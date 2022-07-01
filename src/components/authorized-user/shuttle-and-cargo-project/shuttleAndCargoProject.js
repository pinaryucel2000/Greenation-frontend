import Navbar from "../navbar/navbar";
import { useState, useEffect } from "react";
import Radio from "@mui/material/Radio";

import "./shuttleAndCargoProject.css";
import LoadingScreen from "../loading-screen/loadingScreen";
import { getLocalStorage } from "../../../util";
import { SERVER } from "../../../constants";
import Map from "./map";

function ShuttleAndCargoProject() {
  const userID = getLocalStorage("id");

  if (userID == "") {
    window.location.href = "/about";
  }

  let url = window.location.href;
  const redPineTreeCO2AbsorptionPerYear = 10000; // grams
  const slashIndex = url.lastIndexOf("/");
  const projectID = url.substring(slashIndex + 1);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(-1);
  const type = url.includes("shuttle") ? "shuttle" : "delivery";

  const [routes, setRoutes] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [startPoint, setStartPoint] = useState();
  const [waypoints, setWaypoints] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [co2, setCo2] = useState(true);

  // Set project name
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const apiCall = SERVER + "project?projectID=" + projectID;
    fetch(apiCall, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setName(data[0].name);
      });
  }, []);

  // Set routes (shuttle)
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    let apiCall = SERVER + type + "/map?projectID=" + projectID;
    let routesTmp = [];
    let vehiclesTmp = [];
    let waypointsTmp = [];

    console.log(apiCall);

    fetch(apiCall, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setCo2(data.pathInfo.total_cost);
        let no_depot;

        if (type == "delivery") {
          no_depot = false;
        } else {
          no_depot = data.no_depot;
        }

        console.log(no_depot);
        for (let i = 0; i < data.vehicleList.length; i++) {
          vehiclesTmp.push(
            data.vehicleList[i].Brand +
              " " +
              data.vehicleList[i].Model +
              " " +
              data.vehicleList[i].Year
          );
        }
        data = data.pathInfo.vehicle_detailed_routes;

        for (let i = 0; i < data.length; i++) {
          let vehicle_detailed_route = data[i];
          routesTmp.push([]);
          let lastRouteIndex = routesTmp.length - 1;

          for (let j = 0; j < vehicle_detailed_route.length; j++) {
            if (no_depot != false && j == vehicle_detailed_route.length - 1) {
              break;
            }

            // returns back
            if (no_depot == false && j != vehicle_detailed_route.length - 1) {
              let steps = vehicle_detailed_route[j].routes[0].legs[0].steps;
              waypointsTmp.push({
                lat: steps[steps.length - 1].end_location.lat,
                lng: steps[steps.length - 1].end_location.lng,
              });
            }
            // not return back
            else if (
              no_depot != false &&
              j <= vehicle_detailed_route.length - 2
            ) {
              let steps = vehicle_detailed_route[j].routes[0].legs[0].steps;
              waypointsTmp.push({
                lat: steps[steps.length - 1].end_location.lat,
                lng: steps[steps.length - 1].end_location.lng,
              });
            }

            let data = vehicle_detailed_route[j].routes[0].legs[0].steps;
            let route = setLines(data);

            for (let k = 0; k < route.length; k++) {
              routesTmp[lastRouteIndex].push({
                start: { lat: route[k].start.lat, lng: route[k].start.lng },
                end: { lat: route[k].end.lat, lng: route[k].end.lng },
              });

              if (k == 0 && j == 0) {
                setStartPoint({
                  lat: route[k].start.lat,
                  lng: route[k].start.lng,
                });
              }
            }
          }
        }
        setWaypoints(waypointsTmp);
        setVehicles(vehiclesTmp);
        setRoutes(routesTmp);

        setLoading(false);
      });
  }, []);

  const decompress = (encoded, precision) => {
    precision = Math.pow(10, -precision);
    var len = encoded.length,
      index = 0,
      lat = 0,
      lng = 0,
      array = [];
    while (index < len) {
      var b,
        shift = 0,
        result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      var dlat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += dlat;
      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      var dlng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += dlng;
      array.push(lat * precision);
      array.push(lng * precision);
    }
    return array;
  };

  const setLines = (data) => {
    let coordinatesTmp;
    let lines = [];
    let coordinates = [];

    for (let i = 0; i < data.length; i++) {
      coordinatesTmp = decompress(data[i].polyline.points, 5);
      coordinates = [];

      for (let j = 0; j < coordinatesTmp.length - 1; j = j + 2) {
        coordinates.push({
          lat: coordinatesTmp[j],
          lng: coordinatesTmp[j + 1],
        });
      }

      for (let j = 0; j < coordinates.length - 1; j++) {
        lines.push({
          start: coordinates[j],
          end: coordinates[j + 1],
        });
      }
    }

    return lines;
  };

  const handleSelectedRouteChange = (i) => {
    setSelectedRouteIndex(i);
  };

  const COLORS = [
    "#31b573",
    "#002a51",
    "#ff0000",
    "#F28C28",
    "#A020F0",
    "#FFB6C1",
    "ff00bf",
    "#cbbf67",
    "#40ff00",
    "#b1aeff",
    "#31b573",
    "#002a51",
    "#ff0000",
    "#F28C28",
    "#A020F0",
    "#FFB6C1",
    "ff00bf",
    "#cbbf67",
    "#40ff00",
    "#b1aeff",
  ];

  return (
    <div>
      <Navbar />

      <div id="projectShuttleOutput">
        <h2>Project Name: {name}</h2>
        {loading ? null : (
          <h3>
            These routes produce {co2} grams of CO2. This amounts to{" "}
            {parseInt((co2 / redPineTreeCO2AbsorptionPerYear) * 100)}% of the
            total amount of CO2 absorbed by a red pine tree per year.{" "}
          </h3>
        )}
        <div id="projectMap">
          {loading ? (
            <LoadingScreen />
          ) : (
            <>
              {selectedRouteIndex == -1 ? (
                <Map
                  center={{
                    lat: routes[0][0].start.lat,
                    lng: routes[0][0].start.lng,
                  }}
                  routes={routes}
                  selectedRouteIndex={selectedRouteIndex}
                  vehicles={vehicles}
                  startPoint={startPoint}
                  COLORS={COLORS}
                  waypoints={waypoints}
                />
              ) : null}
              {routes.map(function (route, i) {
                return selectedRouteIndex == i ? (
                  <Map
                    center={{
                      lat: routes[0][0].start.lat,
                      lng: routes[0][0].start.lng,
                    }}
                    routes={routes}
                    selectedRouteIndex={selectedRouteIndex}
                    vehicles={vehicles}
                    startPoint={startPoint}
                    COLORS={COLORS}
                    waypoints={waypoints}
                  />
                ) : null;
              })}
            </>
          )}
        </div>

        {loading ? (
          <div></div>
        ) : (
          <div className="mapLegend">
            <h2>Map Legend</h2>
            <div className="pointLegend">
              <img
                src={"../../markers/blueMarker.png"}
                className="legendMarker"
              ></img>{" "}
              <p>Departure Point</p>
            </div>

            <div className="pointLegend">
              <img
                src={"../../markers/redMarker.png"}
                className="legendMarker"
              ></img>{" "}
              <p>Destination Point</p>
            </div>

            <h3>Routes</h3>
            <div className="vehiclesLegend">
              <div className="vehicleLegend">
                <Radio
                  checked={selectedRouteIndex === -1}
                  onChange={() => {
                    handleSelectedRouteChange(-1);
                  }}
                  color="default"
                  name="radio-buttons"
                />
                <p>Display all routes</p>
              </div>
              {vehicles.map(function (vehicle, i) {
                return (
                  <div className="vehicleLegend">
                    <Radio
                      checked={selectedRouteIndex === i}
                      onChange={() => {
                        handleSelectedRouteChange(i);
                      }}
                      color="default"
                      name="radio-buttons"
                    />
                    <div
                      className="cube"
                      style={{ backgroundColor: COLORS[i] }}
                    ></div>{" "}
                    {vehicle}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShuttleAndCargoProject;

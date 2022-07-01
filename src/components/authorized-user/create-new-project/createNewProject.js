import { useState, useEffect } from "react";
import Navbar from "../navbar/navbar";

import { getLocalStorage } from "../../../util";

import "./createNewProject.css";
import { SERVER } from "../../../constants";
import { NameTextField } from "./createNewProjectStyledComponents";
import PersonalTransportation from "./personal-transportation/personalTransportation";
import ShuttleAndCargo from "./shuttle-and-cargo/shuttleAndCargo";

function CreateNewProject() {
  const userID = getLocalStorage("id");

  if (userID == "") {
    window.location.href = "/about";
  }
  const [type, setType] = useState("personal");
  const [name, setName] = useState("");
  const [vehicles, setVehicles] = useState([]);
  const [vehiclesDelivery, setVehiclesDelivery] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const apiCall = SERVER + "vehicle?userID=" + userID;
    let vehiclesTmp = [];
    let vehiclesDeliveryTmp = [];
    let vehicleCount = 0;

    fetch(apiCall, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          let currentVehicle = data[i];

          vehicleCount++;
          vehiclesTmp.push({
            vehicleID: currentVehicle.vehicleID,
            label: currentVehicle.brand + " " + currentVehicle.model,
            capacity: currentVehicle.capacity,
          });

          if (currentVehicle.type == "delivery") {
            console.log(vehiclesDeliveryTmp);
            vehiclesDeliveryTmp.push({
              vehicleID: currentVehicle.vehicleID,
              label:
                currentVehicle.brand +
                " " +
                currentVehicle.model +
                " (trunk capacity: " +
                currentVehicle.trunk_capacity +
                " )",
              capacity: currentVehicle.capacity,
              trunk: currentVehicle.trunk_capacity,
            });
          }
        }

        setVehicles(vehiclesTmp);
        setVehiclesDelivery(vehiclesDeliveryTmp);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div id="createNewProject">
        <h1>Create New Project</h1>

        <div className="nameContainer">
          <p>Project Name:</p>
          <NameTextField
            onChange={(event) => {
              setName(event.target.value);
            }}
            className="projectName"
          ></NameTextField>
        </div>

        <div className="transportationTypes">
          <p className="selectTransportationType">
            Select the type of transportation:
          </p>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => setType("personal")}
            className="transportationType"
          >
            <input
              style={{ cursor: "pointer" }}
              checked={type == "personal"}
              onClick={() => setType("personal")}
              className="radioBox"
              type="radio"
              name="ttype"
            />
            Personal Transportation
          </div>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => setType("shuttle")}
            className="transportationType"
          >
            <input
              style={{ cursor: "pointer" }}
              checked={type == "shuttle"}
              onClick={() => setType("shuttle")}
              className="radioBox"
              type="radio"
              name="ttype"
            />
            Shuttle Services
          </div>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => setType("cargo")}
            className="transportationType"
          >
            <input
              style={{ cursor: "pointer" }}
              checked={type == "cargo"}
              onClick={() => setType("cargo")}
              className="radioBox"
              type="radio"
              name="ttype"
            />
            Cargo Delivery
          </div>
        </div>

        <div className="borderCreateNewProject"></div>

        {type == "personal" ? (
          <PersonalTransportation name={name} vehicles={vehicles} />
        ) : null}
        {type == "shuttle" ? (
          <ShuttleAndCargo name={name} vehicles={vehicles} type={"shuttle"} />
        ) : null}
        {type == "cargo" ? (
          <ShuttleAndCargo
            name={name}
            vehicles={vehiclesDelivery}
            type={"cargo"}
          />
        ) : null}
      </div>
    </div>
  );
}

export default CreateNewProject;

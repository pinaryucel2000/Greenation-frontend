import Navbar from "../navbar/navbar";
import { useState, useEffect } from "react";

import LoadingScreen from "../loading-screen/loadingScreen";
import "./personalProject.css";
import { getLocalStorage } from "../../../util";
import { SERVER } from "../../../constants";
import Map from "./map";

function PersonalProject() {
  const userID = getLocalStorage("id");

  if (userID == "") {
    window.location.href = "/about";
  }

  const slashIndex = window.location.href.lastIndexOf("/");
  const projectID = window.location.href.substring(slashIndex + 1);
  const redPineTreeCO2AbsorptionPerYear = 10000; // grams

  const [route, setRoute] = useState([]);
  const [co2, setCo2] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const apiCall = SERVER + "project/map?projectID=" + projectID;
    let routeTmp = [];

    fetch(apiCall, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setCo2(parseInt(data.total_cost));
        let lngs = data.longitude;
        let lats = data.latitude;
        let pointCount = lats.length;

        for (let i = 0; i < pointCount - 1; i++) {
          routeTmp.push({
            start: { lat: lats[i], lng: lngs[i] },
            end: { lat: lats[i + 1], lng: lngs[i + 1] },
          });
        }

        setRoute(routeTmp);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div id="project">
        <h2>Project Name: {name}</h2>
        {loading ? null : (
          <h3>
            This route produces {co2} grams of CO2. This amounts to{" "}
            {parseInt((co2 / redPineTreeCO2AbsorptionPerYear) * 100)}% of the
            total amount of CO2 absorbed by a red pine tree per year.{" "}
          </h3>
        )}
        <div id="projectMap">
          {loading ? (
            <LoadingScreen />
          ) : (
            <Map center={route[0].start} lines={route} />
          )}
        </div>
      </div>
    </div>
  );
}

export default PersonalProject;

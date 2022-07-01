import Navbar from "../navbar/navbar";
import "./profile.css";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { getLocalStorage } from "../../../util";
import { SERVER } from "../../../constants";

function Profile() {
  const id = getLocalStorage("id");

  if (id == "") {
    window.location.href = "/about";
  }

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [joinDate, setJoinDate] = useState("");

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const apiCall = SERVER + "user?id=" + id;
    fetch(apiCall, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUsername(data.username);
        setEmail(data.email);
        setJoinDate(
          data.date_joined.substring(0, data.date_joined.indexOf("T"))
        );
      });
  }, []);

  return (
    <div className="profile">
      <Navbar />
      <div className="profileBox">
        <h1 className="profileHeader">
          <a>User</a> Profile
        </h1>
        <div className="profileHeaderUnderline"></div>
        <p>Username: {username}</p>
        <p>Email: {email}</p>
        <p>Join Date: {joinDate}</p>
      </div>
    </div>
  );
}

export default Profile;

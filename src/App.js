import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import About from "./components/unauthorized-user/about/about";
import Register from "./components/unauthorized-user/register/register";
import Login from "./components/unauthorized-user/login/login";
import UserGuide from "./components/authorized-user/user-guide/userGuide";
import Projects from "./components/authorized-user/projects/projects";
import CreateNewProject from "./components/authorized-user/create-new-project/createNewProject";
import Profile from "./components/authorized-user/profile/profile";
import Vehicles from "./components/authorized-user/vehicles/vehicles";
import PersonalProject from "./components/authorized-user/personal-project/personalProject";
import ShuttleAndCargoProject from "./components/authorized-user/shuttle-and-cargo-project/shuttleAndCargoProject";
import Test from "./components/unauthorized-user/test/test";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/test" element={<Test />}></Route>
          <Route path="/" element={<About />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/user-guide" element={<UserGuide />}></Route>
          <Route path="/projects" element={<Projects />}></Route>
          <Route
            path="/create-new-project"
            element={<CreateNewProject />}
          ></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/vehicles" element={<Vehicles />}></Route>
          <Route
            path="/project/personal/:id"
            element={<PersonalProject />}
          ></Route>
          <Route
            path="/project/shuttle/:id"
            element={<ShuttleAndCargoProject />}
          ></Route>
          <Route
            path="/project/cargo/:id"
            element={<ShuttleAndCargoProject />}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

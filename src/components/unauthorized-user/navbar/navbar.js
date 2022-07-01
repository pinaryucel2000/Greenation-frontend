import "./navbar.css";
import { useState } from "react";

const NAVBAR_ELEMENTS = [
  "about",
  "how-it-works",
  "meet-the-team",
  "register",
  "login",
];

function Navbar() {
  const slashIndex = window.location.href.lastIndexOf("/");
  let page = window.location.href.substring(slashIndex + 1);

  if (page[0] == "#") {
    page = page.slice(1);
  }

  return (
    <div id="unauthorized-nav">
      <div id="unauthorized-nav-content">
        <img
          onClick={() => {
            window.location.href = "/#about";
          }}
          className="logo"
          src="../logo.png"
          width="132"
          height="97"
        ></img>
        <div id="unauthorized-nav-content-buttons">
          {NAVBAR_ELEMENTS.map(function (element, i) {
            return (
              <button
                style={
                  page == element
                    ? { cursor: "pointer", color: "#31b573" }
                    : { cursor: "pointer" }
                }
                onClick={() => {
                  if (
                    element == "how-it-works" ||
                    element == "meet-the-team" ||
                    element == "about"
                  ) {
                    window.location.href = "/#" + element;
                  } else {
                    window.location.href = "/" + element;
                  }
                }}
                key={i}
              >
                {element == "how-it-works"
                  ? "How It Works"
                  : (element == "meet-the-team"
                      ? "Meet the Team"
                      : element.charAt(0).toUpperCase() + element.slice(1)
                    ).replaceAll("-", " ")}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Navbar;

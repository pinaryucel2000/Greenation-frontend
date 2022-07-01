import "./navbar.css";

import { setLocalStorage } from "../../../util";

const NAVBAR_ELEMENTS = [
  "user-guide",
  "projects",
  "create-new-project",
  "vehicles",
  "profile",
];

function Navbar() {
  const slashIndex = window.location.href.lastIndexOf("/");
  const page = window.location.href.substring(slashIndex + 1);

  function capitalizeFirstLetter(string) {
    if (string == "user guide") {
      return "User Guide";
    } else if (string == "create new project") {
      return "Create New Project";
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <nav id="authorized-nav">
      <ul>
        {NAVBAR_ELEMENTS.map(function (element, i) {
          return (
            <li>
              <button
                style={
                  page == element
                    ? { cursor: "pointer", color: "#31b573" }
                    : { cursor: "pointer" }
                }
                onClick={() => {
                  if (element == "log-out") {
                    window.location.href = "/about";
                  } else {
                    window.location.href = "/" + element;
                  }
                }}
                key={i}
              >
                {capitalizeFirstLetter(element.replaceAll("-", " "))}
              </button>
            </li>
          );
        })}

        <li>
          <button
            onClick={() => {
              setLocalStorage("id", "");
              window.location.href = "/";
            }}
          >
            Sign Out
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

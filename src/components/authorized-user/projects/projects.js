import { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

import Navbar from "../navbar/navbar";
import { getLocalStorage } from "../../../util";
import { SERVER } from "../../../constants";
import "./projects.css";
import {
  InformationIcon,
  CancelButton,
  DialogDeleteButton,
  EditButton,
  DeleteButton,
  CustomPagination,
} from "./projectsStyledComponents";

const typeIconStyle = {
  fontSize: "25px",
  marginBottom: "-5px",
  marginRight: "5px",
};

const PROJECT_PER_PAGE = 8;

function Projects() {
  const id = getLocalStorage("id");

  if (id == "") {
    window.location.href = "/about";
  }

  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [pageCount, setPageCount] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const [projectsExist, setProjectsExist] = useState(false);
  const [projects, setProjects] = useState([]);
  const [projectsAll, setProjectsAll] = useState([]);
  const [projectIDDelete, setprojectIDDelete] = useState(-1);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const changePage = (event, value) => {
    setPage(value);
  };

  const deleteProjectRequest = (projectID) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectID: projectID,
      }),
    };

    const apiCall = SERVER + "project";

    fetch(apiCall, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        window.location.reload(false);
      });
  };

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const apiCall = SERVER + "project?owner=" + id;
    let projectsTmp = [];
    let projectCount = 0;
    let projectsExistTmp;

    fetch(apiCall, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (typeof data == "string") {
          projectsExistTmp = false;
        } else {
          projectsExistTmp = true;
        }

        for (let i = 0; i < data.length; i++) {
          let currentProject = data[i];
          projectCount++;
          projectsTmp.push({
            id: currentProject.projectID,
            name: currentProject.name,
            type: currentProject.type,
          });
        }

        setProjects(projectsTmp);
        setProjectsAll(projectsTmp);
        setPageCount(Math.ceil(projectCount / PROJECT_PER_PAGE));
        setLoaded(true);
        setProjectsExist(projectsExistTmp);
      });
  }, []);

  const getIcon = (type) => {
    if (type == "personal") {
      return <DirectionsCarIcon style={typeIconStyle} />;
    } else if (type == "shuttle") {
      return <AirportShuttleIcon style={typeIconStyle} />;
    } else {
      return <LocalShippingIcon style={typeIconStyle} />;
    }
  };

  const handleSearchInputChange = (event) => {
    let searchValueNew = event.target.value;
    let searchInputSize = searchValueNew.length;
    setSearchInput(searchValueNew);
    let projectsTmp = [];
    let isIncluded = true;
    let currentProject;

    console.log(projectsAll);
    for (let i = 0; i < projectsAll.length; i++) {
      currentProject = projectsAll[i];
      isIncluded = true;

      if (searchInputSize <= currentProject.name.length) {
        for (let j = 0; j < searchInputSize; j++) {
          if (currentProject.name[j] != searchValueNew[j]) {
            isIncluded = false;
            break;
          }
        }

        if (isIncluded) {
          projectsTmp.push({
            id: currentProject.id,
            name: currentProject.name,
            type: currentProject.type,
          });
        }
      }
    }

    setProjects(projectsTmp);
    setPageCount(Math.ceil(projectsTmp.length / PROJECT_PER_PAGE));
  };

  return (
    <div>
      <Navbar />
      {loaded == false ? (
        <div> </div>
      ) : projectsExist == false ? (
        <div className="noProject">
          <InformationIcon /> <br />
          You do not have any projects. <br />
          Click <a href="/create-new-project">here</a> to create a new project.
        </div>
      ) : (
        <div>
          <div id="projects">
            <h2>Projects</h2>
            <div id="projectsTop">
              <div className="searchPaper">
                <InputBase
                  value={searchInput}
                  onChange={(event) => {
                    handleSearchInputChange(event);
                  }}
                  className="inputBase"
                  placeholder="Search..."
                />
                <SearchIcon className="searchIcon" />
              </div>
              <div className="legend">
                <div className="legendItem">
                  <AirportShuttleIcon style={typeIconStyle} />
                  <p>: Shuttle </p>
                </div>

                <div className="legendItem">
                  <LocalShippingIcon style={typeIconStyle} />
                  <p>: Cargo </p>
                </div>

                <div className="legendItem">
                  <DirectionsCarIcon style={typeIconStyle} />
                  <p>: Personal </p>
                </div>
              </div>
            </div>

            <table id="projectTable">
              <tr id="projectTableTop">
                <th>Name</th>
                <th className="projectActionColumn">Action</th>
              </tr>
              {projects.map(function (project, i) {
                return i >= PROJECT_PER_PAGE * (page - 1) &&
                  i < PROJECT_PER_PAGE * page ? (
                  <tr className="projectEntry">
                    <td
                      onClick={() => {
                        if (project.type == "personal") {
                          window.location.href =
                            "/project/personal/" + project.id;
                        } else if (project.type == "shuttle") {
                          window.location.href =
                            "/project/shuttle/" + project.id;
                        } else if (project.type == "delivery") {
                          window.location.href = "/project/cargo/" + project.id;
                        }
                      }}
                    >
                      {getIcon(project.type)} {project.name}
                    </td>

                    <td className="actionButtonsProjects">
                      <DeleteButton
                        style={{ marginLeft: "12%" }}
                        onClick={() => {
                          setprojectIDDelete(project.id);
                          setOpen(true);
                        }}
                        color="primary"
                      >
                        <DeleteIcon />
                      </DeleteButton>
                    </td>
                  </tr>
                ) : null;
              })}
            </table>
            <CustomPagination
              count={pageCount}
              page={page}
              onChange={changePage}
            />
          </div>
        </div>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <h1 className="deleteProjectConfirmationHeader">
            Are you sure that you want to delete this project?
          </h1>
        </DialogTitle>
        <DialogContent>
          <div className="deleteProjectConfirmationContent">
            All of the data pertinent to the project will be permanently
            deleted. This action cannot be undone.
          </div>
        </DialogContent>
        <DialogActions>
          <CancelButton
            onClick={() => {
              setprojectIDDelete(-1);
              handleClose();
            }}
          >
            Cancel
          </CancelButton>
          <DialogDeleteButton
            onClick={() => {
              console.log(projectIDDelete);
              deleteProjectRequest(projectIDDelete);
            }}
          >
            Delete
          </DialogDeleteButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Projects;

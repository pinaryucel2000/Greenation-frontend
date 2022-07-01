import { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { getLocalStorage } from "../../../util";
import { SERVER } from "../../../constants";
import Navbar from "../navbar/navbar";
import "./vehicles.css";
import {
  VehicleInformationTextField,
  DialogDeleteButton,
  CancelButton,
  AddButton,
  AddVehicleButton,
  EditButton,
  DeleteButton,
  CustomPagination,
  SaveButton,
} from "./vehiclesStyledComponents";

const VEHICLE_PER_PAGE = 6;

function Vehicles() {
  const userID = getLocalStorage("id");

  if (userID == "") {
    window.location.href = "/about";
  }

  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const changePage = (event, value) => {
    setPage(value);
  };

  // Add vehicle
  const [addVehicleDialogOpen, setAddVehicleDialogOpen] = useState(false);
  const [brandAdd, setBrandAdd] = useState("");
  const [modelAdd, setModelAdd] = useState("");
  const [typeAdd, setTypeAdd] = useState("");
  const [yearAdd, setYearAdd] = useState("");
  const [massAdd, setMassAdd] = useState("");
  const [frontAreaAdd, setFrontAreaAdd] = useState("");
  const [kmplCityAdd, setKmplCityAdd] = useState("");
  const [kmplHighwayAdd, setKmplHighwayAdd] = useState("");
  const [trunkAdd, setTrunkAdd] = useState("");
  const [capacityAdd, setCapacityAdd] = useState("");
  const [addVehicleError, setAddVehicleError] = useState("");

  const addVehicleRequest = () => {
    if (brandAdd == "") {
      setAddVehicleError("Brand cannot be empty.");
    } else if (modelAdd == "") {
      setAddVehicleError("Model cannot be empty.");
    } else if (typeAdd == "") {
      setAddVehicleError("Type cannot be empty.");
    } else if (yearAdd == "") {
      setAddVehicleError("Year cannot be empty.");
    } else if (massAdd == "") {
      setAddVehicleError("Mass cannot be empty.");
    } else if (frontAreaAdd == "") {
      setAddVehicleError("Front area cannot be empty.");
    } else if (kmplCityAdd == "") {
      setAddVehicleError("KMPL city cannot be empty.");
    } else if (kmplHighwayAdd == "") {
      setAddVehicleError("KMPL highway cannot be empty.");
    } else if (trunkAdd == "") {
      setAddVehicleError("Trunk capacity cannot be empty.");
    } else if (capacityAdd == "") {
      setAddVehicleError("Capacity  cannot be empty.");
    } else {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          brand: brandAdd,
          capacity: capacityAdd,
          frontArea: frontAreaAdd,
          kmpl_city: kmplCityAdd,
          kmpl_highway: kmplHighwayAdd,
          mass: massAdd,
          model: modelAdd,
          trunk_capacity: trunkAdd,
          type: typeAdd,
          userID: userID,
          year: yearAdd,
        }),
      };

      const apiCall = SERVER + "vehicle";

      fetch(apiCall, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          setBrandAdd("");
          setModelAdd("");
          setCapacityAdd("");
          setAddVehicleError("");

          window.location.reload(false);
        });
    }
  };
  //***********************************

  const [vehicleID, setVehicleID] = useState(); // Vehicle which the user wants to delete or edit.

  // Delete vehicle
  const [openDelete, setOpenDelete] = useState(false);

  const deleteVehicleRequest = () => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        vehicleID: vehicleID,
      }),
    };

    const apiCall = SERVER + "vehicle";

    fetch(apiCall, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        window.location.reload(false);
      });
  };
  //***********************************

  // Edit vehicle
  const [openEdit, setOpenEdit] = useState(false);
  const [editVehicleError, setEditVehicleError] = useState("");

  const [brandEdit, setBrandEdit] = useState("");
  const [modelEdit, setModelEdit] = useState("");
  const [typeEdit, setTypeEdit] = useState("");
  const [yearEdit, setYearEdit] = useState("");
  const [massEdit, setMassEdit] = useState("");
  const [frontAreaEdit, setFrontAreaEdit] = useState("");
  const [kmplCityEdit, setKmplCityEdit] = useState("");
  const [kmplHighwayEdit, setKmplHighwayEdit] = useState("");
  const [trunkEdit, setTrunkEdit] = useState("");
  const [capacityEdit, setCapacityEdit] = useState("");

  const editVehicleRequest = () => {
    if (brandEdit == "") {
      setEditVehicleError("Brand cannot be empty.");
    } else if (modelEdit == "") {
      setEditVehicleError("Model cannot be empty.");
    } else if (typeEdit == "") {
      setEditVehicleError("Type cannot be empty.");
    } else if (yearEdit == "") {
      setEditVehicleError("Year cannot be empty.");
    } else if (massEdit == "") {
      setEditVehicleError("Mass cannot be empty.");
    } else if (frontAreaEdit == "") {
      setEditVehicleError("Front area cannot be empty.");
    } else if (kmplCityEdit == "") {
      setEditVehicleError("KMPL city cannot be empty.");
    } else if (kmplHighwayEdit == "") {
      setEditVehicleError("KMPL highway cannot be empty.");
    } else if (trunkEdit == "") {
      setEditVehicleError("Trunk capacity cannot be empty.");
    } else if (capacityEdit == "") {
      setEditVehicleError("Capacity  cannot be empty.");
    } else {
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vehicleID: vehicleID,
          brand: brandEdit,
          capacity: capacityEdit,
          frontArea: frontAreaEdit,
          kmpl_city: kmplCityEdit,
          kmpl_highway: kmplHighwayEdit,
          mass: massEdit,
          model: modelEdit,
          trunk_capacity: trunkEdit,
          type: typeEdit,
          userID: userID,
          year: yearEdit,
        }),
      };

      const apiCall = SERVER + "vehicle";

      fetch(apiCall, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          setEditVehicleError("");
          window.location.reload(false);
        });
    }
  };
  //***********************************

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const apiCall = SERVER + "vehicle?userID=" + userID;
    let vehiclesTmp = [];
    let vehicleCount = 0;

    fetch(apiCall, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          let currentVehicle = data[i];
          console.log(currentVehicle);
          vehicleCount++;
          vehiclesTmp.push({
            vehicleID: currentVehicle.vehicleID,
            brand: currentVehicle.brand,
            model: currentVehicle.model,
            type: currentVehicle.type,
            year: currentVehicle.year,
            mass: currentVehicle.mass,
            frontArea: currentVehicle.frontArea.toPrecision(4),
            kmpl_city: currentVehicle.kmpl_city.toPrecision(2),
            kmpl_highway: currentVehicle.kmpl_highway.toPrecision(2),
            trunk_capacity: currentVehicle.trunk_capacity,
            capacity: currentVehicle.capacity,
            energyConsumption: currentVehicle.energyConsumption,
            userID: currentVehicle.userID,
          });
        }

        setVehicles(vehiclesTmp);
        setPageCount(Math.ceil(vehicleCount / VEHICLE_PER_PAGE));
        setLoaded(true);
      });
  }, []);

  return (
    <div>
      <Navbar />
      {loaded == false ? (
        <div> </div>
      ) : (
        <div>
          <div id="vehicles">
            <div className="vehiclesHeader">
              <div className="headerContainerVehicles">
                <h2>Vehicles</h2>
              </div>

              <AddVehicleButton
                onClick={() => {
                  setAddVehicleDialogOpen(true);
                }}
              >
                Add New Vehicle
              </AddVehicleButton>
            </div>

            <table id="vehicleTable">
              <tr id="vehicleTableTop">
                <th>Brand</th>
                <th>Model</th>
                <th>Type</th>
                <th>Year</th>
                <th>Mass (kg)</th>
                <th>Front Area (m2)</th>
                <th>KMPL City</th>
                <th>KMPL Highway</th>
                <th>Trunk Volume (L)</th>
                <th>Capacity</th>
                <th className="vehicleAction">Action</th>
              </tr>
              {vehicles.map(function (vehicle, i) {
                return i >= VEHICLE_PER_PAGE * (page - 1) &&
                  i < VEHICLE_PER_PAGE * page ? (
                  <tr className="vehicleEntry">
                    <td>{vehicle.brand}</td>
                    <td>{vehicle.model}</td>
                    <td>{vehicle.type}</td>
                    <td>{vehicle.year}</td>
                    <td>{vehicle.mass}</td>
                    <td>{vehicle.frontArea}</td>
                    <td>{vehicle.kmpl_city}</td>
                    <td>{vehicle.kmpl_highway}</td>
                    <td>{vehicle.trunk_capacity}</td>
                    <td>{vehicle.capacity}</td>
                    <td className="actionButtonsVehicles">
                      {vehicle.userID != null ? (
                        <div>
                          <EditButton
                            onClick={() => {
                              setVehicleID(vehicle.vehicleID);
                              setBrandEdit(vehicle.brand);
                              setModelEdit(vehicle.model);
                              setTypeEdit(vehicle.type);
                              setYearEdit(vehicle.year);
                              setMassEdit(vehicle.mass);
                              setFrontAreaEdit(vehicle.frontArea);
                              setKmplCityEdit(vehicle.kmpl_city);
                              setKmplHighwayEdit(vehicle.kmpl_highway);
                              setTrunkEdit(vehicle.trunk_capacity);
                              setCapacityEdit(vehicle.capacity);
                              setOpenEdit(true);
                            }}
                            color="primary"
                          >
                            <EditIcon />
                          </EditButton>
                          <DeleteButton
                            onClick={() => {
                              setVehicleID(vehicle.vehicleID);
                              setOpenDelete(true);
                            }}
                            color="primary"
                          >
                            <DeleteIcon />
                          </DeleteButton>
                        </div>
                      ) : (
                        <div></div>
                      )}
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

      {/* Delete vehicle dialog */}
      <Dialog
        open={openDelete}
        onClose={() => {
          setOpenDelete(false);
        }}
      >
        <DialogTitle>
          <h1 className="vehiclesDialogHeader">
            Are you sure that you want to delete this vehicle?
          </h1>
        </DialogTitle>
        <DialogContent>
          <div className="deleteVehicleConfirmationContent">
            All of the data pertinent to the vehicle will be permanently
            deleted. This action cannot be undone.
          </div>
        </DialogContent>
        <DialogActions>
          <CancelButton
            onClick={() => {
              setVehicleID(-1);
              setOpenDelete(false);
            }}
          >
            Cancel
          </CancelButton>
          <DialogDeleteButton
            onClick={() => {
              console.log(vehicleID);
              deleteVehicleRequest();
            }}
          >
            Delete
          </DialogDeleteButton>
        </DialogActions>
      </Dialog>

      {/* Add vehicle dialog */}
      <Dialog
        open={addVehicleDialogOpen}
        onClose={() => {
          setAddVehicleDialogOpen(false);
        }}
      >
        <DialogTitle>
          <h1 className="vehiclesDialogHeader">Add New Vehicle</h1>
        </DialogTitle>
        <DialogContent>
          <div className="vehiclesDialogRow">
            <div className="addVehicleLabel">Brand:</div>
            <VehicleInformationTextField
              fullWidth
              variant="outlined"
              value={brandAdd}
              onChange={(event) => {
                setBrandAdd(event.target.value);
              }}
            />
          </div>

          <div className="vehiclesDialogRow">
            <div className="addVehicleLabel">Model:</div>
            <VehicleInformationTextField
              fullWidth
              variant="outlined"
              helperText="e.g. Corolla 2012 "
              value={modelAdd}
              onChange={(event) => {
                setModelAdd(event.target.value);
              }}
            />
          </div>

          <div className="vehiclesDialogRow">
            <div className="addVehicleLabel">Type:</div>
            <VehicleInformationTextField
              fullWidth
              variant="outlined"
              helperText="e.g. delivery, vehicle"
              value={typeAdd}
              onChange={(event) => {
                setTypeAdd(event.target.value);
              }}
            />
          </div>

          <div className="vehiclesDialogRow">
            <div className="addVehicleLabel">Year:</div>
            <VehicleInformationTextField
              type="text"
              fullWidth
              variant="outlined"
              value={yearAdd}
              onChange={(e) => {
                let input = e.target.value;
                if (
                  !input ||
                  (input[input.length - 1].match("[0-9]") &&
                    input[0].match("[1-9]"))
                )
                  setYearAdd(e.target.value);
              }}
            />
          </div>

          <div className="vehiclesDialogRow">
            <div className="addVehicleLabel">Mass:</div>
            <VehicleInformationTextField
              type="text"
              fullWidth
              variant="outlined"
              value={massAdd}
              onChange={(e) => {
                let input = e.target.value;
                if (
                  !input ||
                  (input[input.length - 1].match("[0-9]") &&
                    input[0].match("[1-9]"))
                )
                  setMassAdd(e.target.value);
              }}
            />
          </div>

          <div className="vehiclesDialogRow">
            <div className="addVehicleLabel">Front Area:</div>
            <VehicleInformationTextField
              type="text"
              fullWidth
              variant="outlined"
              value={frontAreaAdd}
              onChange={(e) => {
                let input = e.target.value;
                if (input.match(/^[0-9]*.?[0-9]*$/))
                  setFrontAreaAdd(e.target.value);
              }}
            />
          </div>

          <div className="vehiclesDialogRow">
            <div className="addVehicleLabel">KMPL City:</div>
            <VehicleInformationTextField
              type="text"
              fullWidth
              variant="outlined"
              value={kmplCityAdd}
              onChange={(e) => {
                let input = e.target.value;
                if (input.match(/^[0-9]*.?[0-9]*$/))
                  setKmplCityAdd(e.target.value);
              }}
            />
          </div>

          <div className="vehiclesDialogRow">
            <div className="addVehicleLabel">KMPL Highway:</div>
            <VehicleInformationTextField
              type="text"
              fullWidth
              variant="outlined"
              value={kmplHighwayAdd}
              onChange={(e) => {
                let input = e.target.value;
                if (input.match(/^[0-9]*.?[0-9]*$/))
                  setKmplHighwayAdd(e.target.value);
              }}
            />
          </div>

          <div className="vehiclesDialogRow">
            <div className="addVehicleLabel">Trunk Capacity:</div>
            <VehicleInformationTextField
              type="text"
              fullWidth
              variant="outlined"
              value={trunkAdd}
              onChange={(e) => {
                let input = e.target.value;
                if (
                  !input ||
                  (input[input.length - 1].match("[0-9]") &&
                    input[0].match("[1-9]"))
                )
                  setTrunkAdd(e.target.value);
              }}
            />
          </div>

          <div className="vehiclesDialogRow">
            <div className="addVehicleLabel">Capacity:</div>
            <VehicleInformationTextField
              type="text"
              fullWidth
              variant="outlined"
              helperText="Passanger capacity of the vehicle"
              value={capacityAdd}
              onChange={(e) => {
                let input = e.target.value;
                if (
                  !input ||
                  (input[input.length - 1].match("[0-9]") &&
                    input[0].match("[1-9]"))
                )
                  setCapacityAdd(e.target.value);
              }}
            />
          </div>
        </DialogContent>
        <div className="vehicleError">{addVehicleError}</div>
        <DialogActions>
          <CancelButton
            onClick={() => {
              setVehicleID(-1);
              setAddVehicleDialogOpen(false);
            }}
          >
            Cancel
          </CancelButton>
          <AddButton
            onClick={() => {
              addVehicleRequest();
            }}
          >
            Add
          </AddButton>
        </DialogActions>
      </Dialog>

      {/* Edit vehicle dialog */}
      <Dialog
        open={openEdit}
        onClose={() => {
          setOpenEdit(false);
        }}
      >
        <DialogTitle>
          <h1 className="vehiclesDialogHeader">Edit Vehicle</h1>
        </DialogTitle>
        <DialogContent>
          <DialogContent>
            <div className="vehiclesDialogRow">
              <div className="addVehicleLabel">Brand:</div>
              <VehicleInformationTextField
                fullWidth
                variant="outlined"
                value={brandEdit}
                onChange={(event) => {
                  setBrandEdit(event.target.value);
                }}
              />
            </div>

            <div className="vehiclesDialogRow">
              <div className="addVehicleLabel">Model:</div>
              <VehicleInformationTextField
                fullWidth
                variant="outlined"
                helperText="e.g. Corolla 2012 "
                value={modelEdit}
                onChange={(event) => {
                  setModelEdit(event.target.value);
                }}
              />
            </div>

            <div className="vehiclesDialogRow">
              <div className="addVehicleLabel">Type:</div>
              <VehicleInformationTextField
                fullWidth
                variant="outlined"
                helperText="e.g. delivery "
                value={typeEdit}
                onChange={(event) => {
                  setTypeEdit(event.target.value);
                }}
              />
            </div>

            <div className="vehiclesDialogRow">
              <div className="addVehicleLabel">Year:</div>
              <VehicleInformationTextField
                type="text"
                fullWidth
                variant="outlined"
                value={yearEdit}
                onChange={(e) => {
                  let input = e.target.value;
                  if (
                    !input ||
                    (input[input.length - 1].match("[0-9]") &&
                      input[0].match("[1-9]"))
                  )
                    setYearEdit(e.target.value);
                }}
              />
            </div>

            <div className="vehiclesDialogRow">
              <div className="addVehicleLabel">Mass:</div>
              <VehicleInformationTextField
                type="text"
                fullWidth
                variant="outlined"
                value={massEdit}
                onChange={(e) => {
                  let input = e.target.value;
                  if (
                    !input ||
                    (input[input.length - 1].match("[0-9]") &&
                      input[0].match("[1-9]"))
                  )
                    setMassEdit(e.target.value);
                }}
              />
            </div>

            <div className="vehiclesDialogRow">
              <div className="addVehicleLabel">Front Area:</div>
              <VehicleInformationTextField
                type="text"
                fullWidth
                variant="outlined"
                value={frontAreaEdit}
                onChange={(e) => {
                  let input = e.target.value;
                  if (input.match(/^[0-9]*.?[0-9]*$/))
                    setFrontAreaEdit(e.target.value);
                }}
              />
            </div>

            <div className="vehiclesDialogRow">
              <div className="addVehicleLabel">KMPL City:</div>
              <VehicleInformationTextField
                type="text"
                fullWidth
                variant="outlined"
                value={kmplCityEdit}
                onChange={(e) => {
                  let input = e.target.value;
                  if (input.match(/^[0-9]*.?[0-9]*$/))
                    setKmplCityEdit(e.target.value);
                }}
              />
            </div>

            <div className="vehiclesDialogRow">
              <div className="addVehicleLabel">KMPL Highway:</div>
              <VehicleInformationTextField
                type="text"
                fullWidth
                variant="outlined"
                value={kmplHighwayEdit}
                onChange={(e) => {
                  let input = e.target.value;
                  if (input.match(/^[0-9]*.?[0-9]*$/))
                    setKmplHighwayEdit(e.target.value);
                }}
              />
            </div>

            <div className="vehiclesDialogRow">
              <div className="addVehicleLabel">Trunk Capacity:</div>
              <VehicleInformationTextField
                type="text"
                fullWidth
                variant="outlined"
                value={trunkEdit}
                onChange={(e) => {
                  let input = e.target.value;
                  if (
                    !input ||
                    (input[input.length - 1].match("[0-9]") &&
                      input[0].match("[1-9]"))
                  )
                    setTrunkEdit(e.target.value);
                }}
              />
            </div>

            <div className="vehiclesDialogRow">
              <div className="addVehicleLabel">Capacity:</div>
              <VehicleInformationTextField
                type="text"
                fullWidth
                variant="outlined"
                helperText="Passanger capacity of the vehicle"
                value={capacityEdit}
                onChange={(e) => {
                  let input = e.target.value;
                  if (
                    !input ||
                    (input[input.length - 1].match("[0-9]") &&
                      input[0].match("[1-9]"))
                  )
                    setCapacityEdit(e.target.value);
                }}
              />
            </div>
          </DialogContent>
        </DialogContent>
        <div className="vehicleError">{editVehicleError}</div>
        <DialogActions>
          <CancelButton
            onClick={() => {
              setVehicleID(-1);
              setOpenEdit(false);
            }}
          >
            Cancel
          </CancelButton>
          <SaveButton
            onClick={() => {
              editVehicleRequest();
            }}
          >
            Save
          </SaveButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Vehicles;

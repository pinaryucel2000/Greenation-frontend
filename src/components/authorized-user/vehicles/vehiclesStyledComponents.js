import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Pagination from "@mui/material/Pagination";
import Button from "@mui/material/Button";

const VehicleInformationTextField = styled(TextField)({
  marginLeft: "2%",
  marginTop: "2%",
  marginBottom: "3%",

  "& .MuiOutlinedInput-root": {
    backgroundColor: "white",
    "& fieldset": {
      border: "1.7px solid #535452",
    },
    "&:hover fieldset": {
      border: "2.2px solid #535452",
    },
    "&.Mui-focused fieldset": {
      border: "2.2px solid #535452",
    },
  },
});

const DialogDeleteButton = styled(Button)({
  fontFamily: "Montserrat",
  fontSize: "17px",
  fontWeight: "600",
  textAlign: "center",
  display: "block",
  width: "100%",
  margin: "0em auto",
  textDecoration: "none",
  color: "rgb(226, 0, 0)",
  padding: "0.5em",
});

const CancelButton = styled(Button)({
  fontFamily: "Montserrat",
  fontSize: "17px",
  fontWeight: "600",
  textAlign: "center",
  display: "block",
  width: "100%",
  margin: "0em auto",
  textDecoration: "none",
  color: "#535452",
  padding: "0.5em",
});

const AddButton = styled(Button)({
  fontFamily: "Montserrat",
  fontSize: "17px",
  fontWeight: "600",
  textAlign: "center",
  display: "block",
  width: "100%",
  margin: "0em auto",
  textDecoration: "none",
  color: "#719e4c",
  padding: "0.5em",
});

const AddVehicleButton = styled(Button)({
  "&:hover": {
    backgroundColor: "#eeeeee",
  },
  fontFamily: "Montserrat",
  fontSize: "18px",
  fontWeight: "600",
  textAlign: "center",
  textTransform: "none",
  backgroundColor: "#fdfdfd",
  borderRadius: "10px",
  boxShadow: "0 1px 7px rgba(0, 0, 0, 0.3)",
  color: "#282e38",
  height: "50px",
  margin: "auto",
  width: "250px",
});

const EditButton = styled(IconButton)({
  fontSize: "150px",
  color: "#535452",
});

const DeleteButton = styled(IconButton)({
  fontSize: "150px",
  color: "#CC2828",
});

const ShareButton = styled(IconButton)({
  fontSize: "150px",
  color: "#40a0e0",
});

const CustomPagination = styled(Pagination)({
  margin: "2% auto",
  width: "fit-content",
  ul: {
    "& .MuiPaginationItem-root": {
      fontSize: "20px",
      fontFamily: "Montserrat",
    },
    "& .MuiPaginationItem-root.Mui-selected": {
      backgroundColor: "#31b573",
      color: "white",

      "&:hover": {
        backgroundColor: "#3e9469",
      },
    },
  },
});

const SaveButton = styled(Button)({
  fontFamily: "Montserrat",
  fontSize: "17px",
  fontWeight: "600",
  textAlign: "center",
  display: "block",
  width: "100%",
  margin: "0em auto",
  textDecoration: "none",
  color: "#719e4c",
  padding: "0.5em",
});

export {
  VehicleInformationTextField,
  DialogDeleteButton,
  CancelButton,
  AddButton,
  AddVehicleButton,
  EditButton,
  DeleteButton,
  ShareButton,
  CustomPagination,
  SaveButton,
};

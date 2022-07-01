import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import UploadIcon from "@mui/icons-material/Upload";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import HelpIcon from "@mui/icons-material/Help";

export const OkButton = styled(Button)({
  fontFamily: "Montserrat",
  fontSize: "16px",
  fontWeight: "600",
  textAlign: "center",
  display: "block",
  width: "100%",
  margin: "0em auto",
  textDecoration: "none",
  color: "#719e4c",
  padding: "0.5em",
});

export const UploadFileIcon = styled(UploadIcon)({ fontSize: "30px" });

export const Help = styled(HelpIcon)({
  fontSize: "18px",
  color: "#737373",
  marginLeft: "3px",
});

export const UploadButton = styled(Button)({
  textTransform: "none",
  "&:hover": {
    backgroundColor: "white",
  },
  fontFamily: "Montserrat",
  fontSize: "16px",
  fontWeight: "600",
  background: "#f8faf8",
  width: "130px",
  textDecoration: "none",
  display: "flex",
  flexDirection: "row",
  color: "#535452",
  borderRadius: "10px",
  boxShadow: "0.5px 0.5px 4px rgba(0, 0, 0, 0.35)",
  color: "#282e38",
});

export const CreateButton = styled(Button)({
  "&:hover": {
    backgroundColor: "#3e9469",
  },
  fontFamily: "Montserrat",
  fontSize: "20px",
  fontWeight: "600",
  textAlign: "center",
  display: "block",
  background: "#31b573",
  width: "20%",
  margin: "0 auto",
  textDecoration: "none",
  padding: "0.5em",
  borderRadius: "10px",
  boxShadow: "10px 10px 10px rgba(0, 0, 0, 0.15)",
  color: "#f6fff3",
});

export const NameTextField = styled(TextField)({
  width: "36.3%",
  height: "19px",
  fontSize: "18px",
  marginLeft: "2%",
  marginTop: "0%",

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

export const AddressTextField = styled(TextField)({
  width: "100%",
  height: "50px",
  fontSize: "18px",
  color: "#535452",
  margin: "0%",
  paddingBottom: "50px",

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

export const VehicleSelect = styled(Autocomplete)({
  backgroundColor: "white",
  borderRadius: "5px",
  boxShadow: "2px 2px 2px 0px rgba(0, 0, 0, 0.15)",
  border: "1.7px solid #535452",
});

export const AddButton = styled(Button)({
  "&:hover": {
    fontWeight: "800",
  },
  fontFamily: "Montserrat",
  fontSize: "15px",
  fontWeight: "500",
  textTransform: "none",
  margin: "0.5em auto",
  marginBottom: "15px",
  textDecoration: "none",
  padding: "0.5em",
  color: "#282e38",
});

export const DeleteButton = styled(IconButton)({
  borderRadius: "50px",
  width: "50px",
  height: "50px",
  color: "#282e38",
  marginTop: "15px",
});

export const CargoVolume = styled(TextField)({
  width: "30%",
  height: "0px",
  fontSize: "18px",
  color: "#535452",
  margin: "0%",
  marginLeft: "2%",
  paddingBottom: "50px",

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

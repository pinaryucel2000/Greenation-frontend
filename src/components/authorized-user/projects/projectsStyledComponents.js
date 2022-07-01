import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Pagination from "@mui/material/Pagination";
import InfoIcon from "@mui/icons-material/Info";
import Button from "@mui/material/Button";

export const InformationIcon = styled(InfoIcon)({
  fontSize: "90px",
  padding: "0.1em",
  color: "#535452",
});

export const CancelButton = styled(Button)({
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

export const DialogDeleteButton = styled(Button)({
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

export const EditButton = styled(IconButton)({
  fontSize: "150px",
  color: "#535452",
});

export const DeleteButton = styled(IconButton)({
  fontSize: "150px",
  color: "#CC2828",
});

export const CustomPagination = styled(Pagination)({
  margin: "2% auto",
  width: "fit-content",
  paddingBottom: "3%",
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

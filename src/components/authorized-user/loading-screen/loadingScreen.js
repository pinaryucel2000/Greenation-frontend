import "./loadingScreen.css";
import CircularProgress from "@mui/material/CircularProgress";
import { Stack } from "@mui/material";

function LoadingScreen() {
  return (
    <Stack className="mapLoadingContainer">
      <span
        className="loadingText"
        style={{ position: "absolute", top: "650px", margin: "auto" }}
      >
        The map is loading...
      </span>
      <CircularProgress size="150px" className="mapLoading" color="inherit" />
    </Stack>
  );
}

export default LoadingScreen;

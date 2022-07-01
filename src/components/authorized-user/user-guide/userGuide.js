import Navbar from "../navbar/navbar";
import "./userGuide.css";
import Pagination from "@mui/material/Pagination";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import { getLocalStorage } from "../../../util";

function UserGuide() {
  const id = getLocalStorage("id");

  if (id == "") {
    window.location.href = "/about";
  }

  const [page, setPage] = useState(1);
  const changePage = (event, value) => {
    setPage(value);
  };

  return (
    <div>
      <Navbar />
      <header id="userGuideHeader">{page == 1 ? page1() : page2()}</header>
      <CustomPagination count={2} page={page} onChange={changePage} />
    </div>
  );
}

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

const page2 = () => {
  return (
    <section className="userGuideTwoColums">
      <div className="userGuideColum">
        <div className="userGuideHeaderParagraphPair">
          <h2>Reading the Output Data</h2>

          <h3>Personal Transportation </h3>
          <p>
            On the output map, you can see the generated route for the input
            provided. Arrows are aligned from the point of departure to the
            point of destination.
          </p>
        </div>
      </div>

      <div className="userGuideColum">
        <div className="userGuideHeaderParagraphPair">
          <h2></h2>
          <h3>Cargo Deliveries and Shuttle Services </h3>
          <p>
            The output map will consist of different routes in different colors
            that indicate different vehicles. You can see which vehicle
            corresponds to which route with the help of the map legend located
            below the map.
          </p>
        </div>
      </div>
    </section>
  );
};

const page1 = () => {
  return (
    <section className="userGuideTwoColums">
      <div className="userGuideColum">
        <h2>Providing the Input Data</h2>
        <div className="userGuideHeaderParagraphPair">
          <h3>Available Vehicles</h3>
          <p>
            Greenation provides a list of vehicles to choose from. If your
            vehicle does not exist in the default vehicle list, it should be
            added to the list of the user’s vehicles first.
          </p>
        </div>

        <div className="userGuideHeaderParagraphPair">
          <h3>Choosing Points with the Map</h3>
          <p>
            You can choose the points that will establish the route with
            Greenation's interactive map. Click on the marker button next to the
            desired point (destination or departure) then click on the map. You
            can drag the point as you want for further adjustment.
          </p>
        </div>

        <div className="userGuideHeaderParagraphPair">
          <h3>Personal Transportation </h3>
          <p>
            You should provide one departure and one destination point with
            their coordinates. You can use the map to choose the coordinates you
            want.
          </p>
        </div>
      </div>

      <div className="userGuideColum">
        <h2></h2>
        <div className="userGuideHeaderParagraphPair">
          <h3>Shuttle Services </h3>
          <p>
            You should provide at least one destination and departure point, and
            at least one vehicle. You can use a CSV file to automatically fill
            the data for the destination point(s). Every line of the CSV file
            should consist of the latitude and the longitude of one destination
            point, separated by comma. Total capacity of all of the provided
            vehicles cannot be less then the number of destination points. If
            you check the return button, the route will display the way to the
            point of departure.
          </p>
        </div>
        <div className="userGuideHeaderParagraphPair">
          <h3>Cargo Deliveries</h3>
          <p>
            Cargo deliveries requires one more input more than shuttle services.
            You need to provide the volume of the total cargo.
          </p>
        </div>
      </div>
    </section>
  );
};

export default UserGuide;

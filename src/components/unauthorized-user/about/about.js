import "./about.css";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Navbar from "../navbar/navbar";
import HowItWorks from "../how-it-works/how-it-works";
import MeetTheTeam from "../meet-the-team/meet-the-team";

const RegistrationButton = styled(Button)({
  "&:hover": {
    backgroundColor: "#3fd98c",
  },
  fontFamily: "Montserrat",
  fontSize: "20px",
  fontWeight: "600",
  textAlign: "center",
  display: "block",
  background: "#25cf7a",
  width: "9.5em",
  margin: "2em auto",
  textDecoration: "none",
  color: "#282e38",
  padding: "0.5em",
  borderRadius: "10px",
  boxShadow: "1px 3px 15px rgba(0, 0, 0, 0.35)",
});

function About() {
  return (
    <div>
      <Navbar />
      <section id="about">
        <header id="aboutHeader">
          <div className="headerContainer">
            <h1>Stop global warming with one powerful app.</h1>
          </div>

          <div className="aboutBorder"></div>
          <section className="aboutTwoColumns">
            <div className="aboutColumn">
              <p>
                Transportation accounts for 29% of greenhouse emissions.
                Transportation scheduling helps with efficiency and thus helps
                reduce emissions.
              </p>
            </div>

            <div className="aboutColumn">
              <p>
                Greenation is an online tool that schedules transportation
                routes according to your transportation needs and available
                vehicles with minimum emissions.
              </p>
            </div>
          </section>
          <RegistrationButton
            onClick={() => {
              window.location.href = "/register";
            }}
          >
            REGISTRATION
          </RegistrationButton>
        </header>
      </section>

      <div className="howItWorksAndMeetTheTeam">
        <HowItWorks />
        <MeetTheTeam />
      </div>
    </div>
  );
}

export default About;

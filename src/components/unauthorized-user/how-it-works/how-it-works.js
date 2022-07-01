import { useEffect, useState } from "react";
import "./how-it-works.css";

function HowItWorks() {
  const [scrollY, setScrollY] = useState(0);

  function logit() {
    setScrollY(window.pageYOffset);
    if (scrollY >= 1545) {
      document
        .getElementById("ropeItem")
        .setAttribute("style", "top: " + 1045 + "px");
      return;
    }
    if (scrollY - 500 >= 0) {
      let prev = parseInt(scrollY - 500);
      prev = prev - 13;
      document.getElementById("rope").setAttribute("y2", prev);
      prev = prev + 13;
      document
        .getElementById("ropeItem")
        .setAttribute("style", "top: " + prev + "px");
    } else {
      document
        .getElementById("ropeItem")
        .setAttribute("style", "top: " + 0 + "px");
      document.getElementById("rope").setAttribute("y2", 0);
    }
  }

  useEffect(() => {
    function watchScroll() {
      window.addEventListener("scroll", logit);
    }
    watchScroll();
    return () => {
      window.removeEventListener("scroll", logit);
    };
  });

  return (
    <section id="how-it-works">
      <div>
        <header id="howItWorksHeader">
          <h2>How It Works</h2>

          <section className="howItWorksTwoColums">
            <div className="howItWorksColumn">
              <div className="howItWorksHeaderParagraphPair">
                <h3>What does Greenation do?</h3>
                <p>
                  Greenation takes input data from the user which indicates
                  their transportation needs and available vehicles and creates
                  transportation schedules that minimize carbon emissions.
                </p>
              </div>
              <div className="howItWorksHeaderParagraphPair">
                <h3>Which transportation scheduling types does it provide?</h3>
                <p>
                  Greenation offers 3 types of transportation scheduling
                  services which are used for shuttle services, personal
                  transportation, and cargo deliveries.
                </p>
              </div>
              <div className="howItWorksHeaderParagraphPair">
                <h3>Do I need any computer science skills to use it?</h3>
                <p>Absolutely not.</p>
              </div>
            </div>
            <div id="ropeContainer">
              <img
                id="ropeItem"
                src="../ropeItem.png"
                width="100"
                height="100"
              />
              <svg id="ropeSVG">
                <line
                  id="rope"
                  x1="50%"
                  y1="0"
                  x2="50%"
                  y2="0"
                  stroke-width="10"
                  stroke=""
                ></line>
              </svg>
            </div>
            <div className="howItWorksColumn">
              <div className="howItWorksHeaderParagraphPair">
                <h3>Do lower carbon emissions mean long rides?</h3>
                <p>
                  Absolutely not. Greenation balances between minimizing the CO2
                  emissions and creating routes with reasonable travel time.
                </p>
              </div>
              <div className="howItWorksHeaderParagraphPair">
                <h3>Why should I use Greenation?</h3>
                <p>
                  Greenation helps users to choose routes that will result in
                  minimum emissions with the destination provided. Reducing CO2
                  emissions improves air quality and helps slow down climate
                  change.
                </p>
              </div>
              <div className="howItWorksHeaderParagraphPair">
                <h3>Is Greenation free to use?</h3>
                <p>
                  Greenation is %100 free to use. Our goal is to reduce CO2
                  emissions and make the world a better place.
                </p>
              </div>
            </div>
          </section>
        </header>
      </div>
    </section>
  );
}

export default HowItWorks;

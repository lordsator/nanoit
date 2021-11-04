import "./App.css";
import "bulma/css/bulma.min.css";
import React from "react";
import Scenario from "./Scenario";

const App = () => {
  const [scenario, setScenario] = React.useState({});

  React.useEffect(() => {
    const headers = {
      Accept: "application/json",
    };

    fetch(`${process.env.PUBLIC_URL}/scenario-a.json`, { headers })
      .then((response) => response.json())
      .then((data) => data.scenario)
      .then((scenario) => setScenario(scenario));
  }, []);

  return (
    <>
      <nav
        class="navbar is-fixed-top"
        role="navigation"
        aria-label="main navigation"
      >
        <div class="navbar-brand">
          <a class="navbar-item brand">NanoIT</a>
        </div>
        <div className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item">Scenario A</a>
            <a className="navbar-item">Scenario B</a>
            <a className="navbar-item">Scenario C</a>
          </div>
        </div>
      </nav>
      <Scenario scenario={scenario} />
    </>
  );
};

export default App;

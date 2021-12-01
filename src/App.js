import "./App.css";
import React from "react";
import Welcome from "./Welcome";
import { Route, Routes, Link } from "react-router-dom";
import ScenarioInput from "./ScenarioInput";
import ScenarioAnalysis from "./ScenarioAnalysis";
import ScenarioAnalysisApi from "./ScenarioAnalysis-api";

const App = () => {
  const [navigationVisible, setNavigationVisible] = React.useState(false);

  const toggleNavigation = () => {
    setNavigationVisible(!navigationVisible);
  };

  return (
    <>
      <nav
        className="navbar is-fixed-top"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <Link className="navbar-item brand" to="/">
            [nanoit]
          </Link>
          <a
            role="button"
            className={"navbar-burger " + (navigationVisible && "is-active")}
            data-target="navMenu"
            aria-label="menu"
            aria-expanded="false"
            onClick={toggleNavigation}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div className={"navbar-menu  " + (navigationVisible && "is-active")}>
          <div className="navbar-start">
            <Link className="navbar-item" to="/scenarios/1">
              Demo
            </Link>
            {/* <Link className="navbar-item" to="/scenarios/7pv-5bat">
              Scenario 7PV-5BAT
            </Link>
            <Link className="navbar-item" to="/scenarios/7pv-10bat">
              Scenario 7PV-10BAT
            </Link>
            <Link className="navbar-item" to="/scenarios/11pv-20bat">
              Scenario 11PV-20BAT
            </Link> */}
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" exact element={<Welcome />} />
        <Route path="/scenarios/:id" element={<ScenarioInput />} />
        <Route path="/scenarios/:id/analysis" element={<ScenarioAnalysis />} />
        <Route exact path="/scenarios-api/" element={<ScenarioAnalysisApi />} />
      </Routes>
    </>
  );
};

export default App;

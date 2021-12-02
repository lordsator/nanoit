import "./App.css";
import React from "react";
import Welcome from "./Welcome";
import { Route, Routes, Link } from "react-router-dom";
import ScenarioInput from "./ScenarioInput";
// import ScenarioAnalysis from "./ScenarioAnalysis";
import ScenarioAnalysisApi from "./ScenarioAnalysis-api";
import logo from "./res/arteria_logo.jpg"

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
          {/* <a
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
          </a> */}
        </div>
        <div style={{ display: "flex", justifyContent: "center", minWidth:"90%" }}>
          <Link  to="/scenarios/1">
            <button className="button is-primary" style={{ minWidth: "40%", margin: "10px" }}>Demo</button>
          </Link>
        </div>
      </nav>
      <div style={{margin:"25px",textAlign: "right"}}>
          <a href="http://www.arteria.at" target="_blank">
            <img width={75} height={75} src={logo} alt="Arteria logo"></img>
          </a>
          </div>
      <Routes>
        <Route path="/" exact element={<Welcome />} />
        <Route path="/scenarios/:id" element={<ScenarioInput />} />
        {/* <Route path="/scenarios/:id/analysis" element={<ScenarioAnalysis />} /> */}
        <Route exact path="/scenarios-api/" element={<ScenarioAnalysisApi />} />
      </Routes>
    </>
  );
};

export default App;

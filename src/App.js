import "./App.css";
import React from "react";
import Welcome from "./Welcome";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import ScenarioInput from "./ScenarioInput";
import ScenarioAnalysis from "./ScenarioAnalysis";

const App = () => {
  return (
    <BrowserRouter>
      <nav
        className="navbar is-fixed-top"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <Link className="navbar-item brand" to="/">
            [nanoit]
          </Link>
        </div>
        <div className="navbar-menu">
          <div className="navbar-start">
            <Link className="navbar-item" to="/scenarios/5pv-7bat">
              Scenario 5PV-7BAT
            </Link>
            <Link className="navbar-item" to="/scenarios/7pv-5bat">
              Scenario 7PV-5BAT
            </Link>
            <Link className="navbar-item" to="/scenarios/7pv-10bat">
              Scenario 7PV-10BAT
            </Link>
            <Link className="navbar-item" to="/scenarios/11pv-20bat">
              Scenario 11PV-20BAT
            </Link>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" exact element={<Welcome />} />
        <Route path="/scenarios/:id" element={<ScenarioInput />} />
        <Route path="/scenarios/:id/analysis" element={<ScenarioAnalysis />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

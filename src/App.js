import "./App.css";
import "bulma/css/bulma.min.css";
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
            [NanoIT]
          </Link>
        </div>
        <div className="navbar-menu">
          <div className="navbar-start">
            <Link className="navbar-item" to="/scenarios/a">
              Scenario A
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

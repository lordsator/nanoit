import "./App.css";
import "bulma/css/bulma.min.css";
import React from "react";
import Scenario from "./Scenario";
import Welcome from "./Welcome";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <nav
        class="navbar is-fixed-top"
        role="navigation"
        aria-label="main navigation"
      >
        <div class="navbar-brand">
          <Link className="navbar-item brand" to="/">
            NanoIT
          </Link>
        </div>
        <div className="navbar-menu">
          <div className="navbar-start">
            <Link className="navbar-item brand" to="/scenarios/a">
              Scenario A
            </Link>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" exact element={<Welcome />} />
        <Route path="/scenarios/:id" element={<Scenario />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

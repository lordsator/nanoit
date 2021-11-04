import React from "react";
import GoogleChart from "./GoogleChart";

const Scenario = (props) => {
  const { scenario } = props;

  return (
    <main>
      <section class="hero is-fullheight">
        <div class="hero-body">
          <div class="container">
            <div class="columns is-centered">
              <div class="column is-7-tablet is-6-desktop is-7-widescreen">
                <div id="success-box" class="box">
                  <div class="notification is-success is-light has-text-centered">
                    {scenario.name}
                  </div>
                </div>
                <div class="box">
                  <p class="copy"></p>
                  <div className="field">
                    <label className="label"># People in the household</label>
                    <p className="control">
                      <input className="input" type="text" value="5"></input>
                    </p>
                  </div>
                  <div className="field">
                    <label className="label"># Electric cars</label>
                    <p className="control">
                      <input className="input" type="text" value="1"></input>
                    </p>
                  </div>
                  <div className="field">
                    <label className="label">Annual energy demand</label>
                    <p className="control has-icons-right">
                      <input className="input" type="text" value="4500"></input>
                      <span className="icon is-small is-right">kWh</span>
                    </p>
                  </div>
                </div>
                <GoogleChart />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Scenario;

import React from "react";
import GoogleChart from "./GoogleChart";
import { useParams, useNavigate } from "react-router-dom";

const Scenario = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [scenario, setScenario] = React.useState({});

  React.useEffect(() => {
    const headers = {
      Accept: "application/json",
    };

    fetch(`${process.env.PUBLIC_URL}/scenario-${params.id}.json`, { headers })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw `Scenario ${params.id} does not exist!`;
        }
      })
      .then((data) => data.scenario)
      .then((scenario) => setScenario(scenario))
      .catch((error) => {
        alert(error);
        navigate("/");
      });
  }, []);

  return (
    <main>
      <section className="section">
        <div class="container box">
          <h1 className="title is-size-2">{scenario.name}</h1>
          <br />
          <div class="columns is-centered">
            <div class="column">
              <div className="field">
                <label className="label"># People in the household</label>
                <p className="control">
                  <input
                    className="input"
                    type="text"
                    value={scenario.people_household}
                    defaultValue={0}
                  ></input>
                </p>
              </div>
              <div className="field">
                <label className="label">Annual energy demand</label>
                <p className="control has-icons-right">
                  <input
                    className="input"
                    type="text"
                    value={scenario.annual_demand}
                    defaultValue={0}
                  ></input>
                  <span className="icon is-small is-right">kWh</span>
                </p>
              </div>
              <div className="field">
                <label className="label">Waterdemand per Person</label>
                <p className="control has-icons-right">
                  <input
                    className="input"
                    type="text"
                    value={scenario.water_per_person}
                  ></input>
                  <span className="icon is-small is-right">kWh</span>
                </p>
              </div>
              <div className="field">
                <label className="label"># Electric cars</label>
                <p className="control">
                  <input
                    className="input"
                    type="text"
                    value={scenario.electric_cars}
                    defaultValue={0}
                  ></input>
                </p>
              </div>
              <div className="field">
                <label className="label">Total heating demand</label>
                <p className="control has-icons-right">
                  <input
                    className="input"
                    type="text"
                    value={scenario.total_heating_demand}
                  ></input>
                  <span className="icon is-small is-right">kWh</span>
                </p>
              </div>
            </div>
            <div class="column">
              <div className="field">
                <label className="label">Heat pump size</label>
                <p className="control has-icons-right">
                  <input
                    className="input"
                    type="text"
                    value={scenario.heatpump_size}
                  ></input>
                  <span className="icon is-small is-right">kW</span>
                </p>
              </div>
              <div className="field">
                <label className="label">Heating system temperature</label>
                <p className="control has-icons-right">
                  <input
                    className="input"
                    type="text"
                    value={scenario.heating_system_temp}
                  ></input>
                  <span className="icon is-small is-right">*C</span>
                </p>
              </div>
              <div className="field">
                <label className="label">Mean COP</label>
                <p className="control">
                  <input
                    className="input"
                    type="text"
                    value={scenario.mean_cop}
                  ></input>
                </p>
              </div>
              <div className="field">
                <label className="label">COP space heating</label>
                <p className="control">
                  <input
                    className="input"
                    type="text"
                    value={scenario.cop_space_heating}
                  ></input>
                </p>
              </div>
              <div className="field">
                <label className="label">COP hot water</label>
                <p className="control">
                  <input
                    className="input"
                    type="text"
                    value={scenario.cop_hot_water}
                  ></input>
                </p>
              </div>
            </div>
            <div class="column">
              <div className="field">
                <label className="label">Annual energy demand</label>
                <p className="control has-icons-right">
                  <input
                    className="input"
                    type="text"
                    value={scenario.annual_demand}
                  ></input>
                  <span className="icon is-small is-right">kWh</span>
                </p>
              </div>
              <div className="field">
                <label className="label">Roof area</label>
                <p className="control has-icons-right">
                  <input
                    className="input"
                    type="text"
                    value={scenario.roof_area}
                  ></input>
                  <span className="icon is-small is-right">qm</span>
                </p>
              </div>
              <div className="field">
                <label className="label">Installed power</label>
                <p className="control has-icons-right">
                  <input
                    className="input"
                    type="text"
                    value={scenario.installed_power}
                  ></input>
                  <span className="icon is-small is-right">kWp</span>
                </p>
              </div>
            </div>
          </div>
          <div class="columns is-centered">
            <div class="column">
              <GoogleChart />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Scenario;

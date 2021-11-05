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
          <div class="columns">
            <div class="column">
              <GoogleChart chart={scenario.chart} />
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <h2 className="title is-size-4">Demand</h2>
              <table className="table is-narrow is-striped">
                <tbody>
                  <tr>
                    <td>Space heating demand:</td>
                    <td className="has-text-right">11.30 [MWh]</td>
                  </tr>
                  <tr>
                    <td>Hot water demand:</td>
                    <td className="has-text-right">5.20 [MWh]</td>
                  </tr>
                  <tr>
                    <td>Total heating demand:</td>
                    <td className="has-text-right">16.50 [MWh]</td>
                  </tr>
                  <tr>
                    <td>Power demand appliances:</td>
                    <td className="has-text-right">4.50 [MWh]</td>
                  </tr>
                  <tr>
                    <td>Power demand heat pump:</td>
                    <td className="has-text-right">5.62 [MWh]</td>
                  </tr>
                  <tr>
                    <td>Power demand e-car:</td>
                    <td className="has-text-right">1.26 [MWh]</td>
                  </tr>
                  <tr>
                    <td>Total power demand:</td>
                    <td className="has-text-right">11.38 [MWh]</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="column">
              <h2 className="title is-size-4">Generation</h2>
              <table className="table is-narrow is-striped">
                <tbody>
                  <tr>
                    <td>Heat pump installed power:</td>
                    <td className="has-text-right">2.59 [kWp]</td>
                  </tr>
                  <tr>
                    <td>PV installed power:</td>
                    <td className="has-text-right">7.00 [kWp]</td>
                  </tr>
                  <tr>
                    <td>PV energy generated:</td>
                    <td className="has-text-right">6.57 [kWp]</td>
                  </tr>
                  <tr>
                    <td>Self consumption:</td>
                    <td className="has-text-right">5.02 [kWp]</td>
                  </tr>
                  <tr>
                    <td>Energy from grid:</td>
                    <td className="has-text-right">6.37 [kWp]</td>
                  </tr>
                  <tr>
                    <td>Energy to grid:</td>
                    <td className="has-text-right">1.56 [kWp]</td>
                  </tr>
                  <tr>
                    <td>Self sufficiency:</td>
                    <td className="has-text-right">44 [%]</td>
                  </tr>
                  <tr>
                    <td>Renewable production ratio:</td>
                    <td className="has-text-right">76 [%]</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="column">
              <h2 className="title is-size-4">Economics</h2>
              <table className="table is-narrow is-striped">
                <tbody>
                  <tr>
                    <td>Total invest:</td>
                    <td className="has-text-right">22,900 [EUR]</td>
                  </tr>
                  <tr>
                    <td>Annual savings (net):</td>
                    <td className="has-text-right">1,049 [EUR]</td>
                  </tr>
                  <tr>
                    <td>Net present value of invest:</td>
                    <td className="has-text-right">-6,117 [EUR]</td>
                  </tr>
                  <tr>
                    <td>Return of investment:</td>
                    <td className="has-text-right">21.8 [Years]</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Scenario;

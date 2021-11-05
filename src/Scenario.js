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
                <label className="label">Anzahl der Hausbewohner</label>
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
                <label className="label">J&auml;hrlicher Strombedarf</label>
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
                <label className="label">Warmwasserbedarf pro Person</label>
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
                <label className="label">Anzahl der E-Autos</label>
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
                <label className="label">W&auml;rmebedarf (gesamt)</label>
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
                <label className="label">
                  Kapazit&auml;t der W&auml;rmepumpe
                </label>
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
                <label className="label">Heizungsvorlauftemperatur</label>
                <p className="control has-icons-right">
                  <input
                    className="input"
                    type="text"
                    value={scenario.heating_system_temp}
                  ></input>
                  <span className="icon is-small is-right">°C</span>
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
                <label className="label">Strombedarf</label>
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
                <label className="label">Dachfl&auml;che</label>
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
              <h2 className="title is-size-4">Bedarf</h2>
              <table className="table is-narrow is-striped">
                <tbody>
                  <tr>
                    <td>Heinzw&auml;rmebedarf:</td>
                    <td className="has-text-right">
                      {scenario.space_heating_demand} [MWh]
                    </td>
                  </tr>
                  <tr>
                    <td>Warmwasserbedarf:</td>
                    <td className="has-text-right">
                      {scenario.hot_water_demand} [MWh]
                    </td>
                  </tr>
                  <tr>
                    <td>W&auml;rmebedarf (gesamt):</td>
                    <td className="has-text-right">
                      {scenario.total_heating_demand} [kWh]
                    </td>
                  </tr>
                  <tr>
                    <td>Haushaltsstrombedarf:</td>
                    <td className="has-text-right">
                      {scenario.power_demand_appliances} [MWh]
                    </td>
                  </tr>
                  <tr>
                    <td>Strombedarf (W&auml;rmepumpe):</td>
                    <td className="has-text-right">
                      {scenario.power_demand_heat_pump} [MWh]
                    </td>
                  </tr>
                  <tr>
                    <td>Strombedarf (E-Auto):</td>
                    <td className="has-text-right">
                      {scenario.power_demand_ecar} [MWh]
                    </td>
                  </tr>
                  <tr>
                    <td>Strombedarf (gesamt):</td>
                    <td className="has-text-right">
                      {scenario.total_power_demand} [MWh]
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="column">
              <h2 className="title is-size-4">Erzeugung</h2>
              <table className="table is-narrow is-striped">
                <tbody>
                  <tr>
                    <td>Heat pump installed power:</td>
                    <td className="has-text-right">2.59 [kWp]</td>
                  </tr>
                  <tr>
                    <td>Installierte Leistung PV:</td>
                    <td className="has-text-right">7.00 [kWp]</td>
                  </tr>
                  <tr>
                    <td>Erzeugter PV-Stromg:</td>
                    <td className="has-text-right">6.57 [kWp]</td>
                  </tr>
                  <tr>
                    <td>Eigenverbrauch:</td>
                    <td className="has-text-right">5.02 [kWp]</td>
                  </tr>
                  <tr>
                    <td>Strombezug (Netz):</td>
                    <td className="has-text-right">6.37 [kWp]</td>
                  </tr>
                  <tr>
                    <td>Stromeinspeisung (Netz):</td>
                    <td className="has-text-right">1.56 [kWp]</td>
                  </tr>
                  <tr>
                    <td>Selbstversorgung:</td>
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
              <h2 className="title is-size-4">Wirtschaftlichkeit</h2>
              <table className="table is-narrow is-striped">
                <tbody>
                  <tr>
                    <td>Gesamtinvestition:</td>
                    <td className="has-text-right">22,900 [EUR]</td>
                  </tr>
                  <tr>
                    <td>J&auml;hrliche Einsparungen (netto):</td>
                    <td className="has-text-right">1,049 [EUR]</td>
                  </tr>
                  <tr>
                    <td>Netoobarwert der Investition:</td>
                    <td className="has-text-right">-6,117 [EUR]</td>
                  </tr>
                  <tr>
                    <td>Return of investment:</td>
                    <td className="has-text-right">21.8 [Jahre]</td>
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

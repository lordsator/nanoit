import React from "react";
import GoogleChart from "./GoogleChart";
import { useParams, useNavigate } from "react-router-dom";

const ScenarioAnalysis = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [analysis, setAnalysis] = React.useState({});

  React.useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/${params.id}.results.json`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`No result data for scenario ${params.id}.`);
        }
      })
      .then((data) => data.results)
      .then((results) => setAnalysis(results))
      .catch((error) => {
        console.log(error);
        navigate("/");
      });
  }, []);

  return (
    <section className="section">
      <div className="container box">
        <h1 className="title is-size-2">Analyse</h1>
        <div className="columns is-centered">
          <div className="column">
            <GoogleChart
              chart={analysis.summer}
              title="Verbrauch und Bedarf im Sommer"
            />
            <GoogleChart
              chart={analysis.winter}
              title="Verbrauch und Bedarf im Winter"
            />
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
                    {analysis.space_heating_demand} [MWh]
                  </td>
                </tr>
                <tr>
                  <td>Warmwasserbedarf:</td>
                  <td className="has-text-right">
                    {analysis.hot_water_demand} [MWh]
                  </td>
                </tr>
                <tr>
                  <td>W&auml;rmebedarf (gesamt):</td>
                  <td className="has-text-right">
                    {analysis.total_heating_demand} [kWh]
                  </td>
                </tr>
                <tr>
                  <td>Haushaltsstrombedarf:</td>
                  <td className="has-text-right">
                    {analysis.power_demand_appliances} [MWh]
                  </td>
                </tr>
                <tr>
                  <td>Strombedarf (W&auml;rmepumpe):</td>
                  <td className="has-text-right">
                    {analysis.power_demand_heat_pump} [MWh]
                  </td>
                </tr>
                <tr>
                  <td>Strombedarf (E-Auto):</td>
                  <td className="has-text-right">
                    {analysis.power_demand_ecar} [MWh]
                  </td>
                </tr>
                <tr>
                  <td>Strombedarf (gesamt):</td>
                  <td className="has-text-right">
                    {analysis.total_power_demand} [MWh]
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
  );
};

export default ScenarioAnalysis;

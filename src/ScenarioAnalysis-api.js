import React from "react";
import GoogleChart from "./GoogleChart";
import { useNavigate, useLocation } from "react-router-dom";
import NumberFormat from "react-number-format";
import axios from "axios";

const ScenarioAnalysisApi = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [analysis, setAnalysis] = React.useState({});

  React.useEffect(() => {
    // fetch(`${process.env.PUBLIC_URL}/${params.id}.results.json`)
    // console.log(props);
    // console.log(location);
    // console.log(location);

    // console.log(props.location.state);
    const data = location.state ? location.state.input : { sqm: 100, annual_heating_demand: 16000, people_household: 3, electric_cars: 1, roof_area: 100, pv_usage: 50 }

    // console.log(process.env.REACT_APP_PUBLIC_DATA_URL);
    //
    // axios.post(process.env.REACT_APP_PUBLIC_DATA_URL + "/getData",
    // axios.post("http://39ed-2a02-8388-e041-e880-d473-361f-701e-70ac.ngrok.io" + "/getData",
    axios.post("https://b0ff-2a02-8388-e041-e880-80e2-6536-3195-53f7.ngrok.io/getData", {
      headers: {
        'Bypass-Tunnel-Reminder': 'abc'
      },
      'inputData': [data.sqm, data.annual_heating_demand, data.people_household, data.electric_cars
        , data.roof_area, data.pv_usage]
    })
      .then((response) => {
        // console.log(response);
        if (response.statusText === "OK" || response.status === 200) {
          return response.data;
        } else {
          throw new Error(`No result data for scenario `);
        }
      })
      .then((data) => { 
        // console.log(data);
        setAnalysis(data) })
      .catch((error) => {
        // console.log(error);

        navigate("/");
      });
  }, [navigate,location.state]);

  return (
    <section className="section">
      <div className="container has-text-centered">
        <div className="column is-8 is-offset-2">
          <h1 className="title is-3">{analysis.scenario}</h1>
          <hr></hr>
          <p className="subtitle is-4">Analyse</p>
        </div>
      </div>
      <div className="container box">
        <div className="columns is-centered">
          <div className="column">
            <GoogleChart
              chart={analysis.datarows}
              title="Bedarf und Erzeugung"
            />
            {/* <GoogleChart
              chart={analysis.winter}
              title="Bedarf und Erzeugung im Winter"
            /> */}
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <h2 className="title is-size-4">
              Eigenverbrauch (
              <DecimalValue
                amount={analysis.own_consumption_ratio}
                suffix=" %"
              />
              )
            </h2>
            <table className="table is-narrow is-striped">
              <tbody>
                <tr>
                  <td>Stromgbedarf (gesamt):</td>
                  <td className="has-text-right numeric">
                    <DecimalValue
                      amount={analysis.total_power_demand}
                      suffix=" [MWh]"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Stromerzeugung PV (gesamt):</td>
                  <td className="has-text-right numeric">
                    <DecimalValue
                      amount={analysis.generation_pv}
                      suffix=" [MWh]"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Eigenverbrauch:</td>
                  <td className="has-text-right numeric">
                    <DecimalValue
                      amount={analysis.own_consumption}
                      suffix=" [MWh]"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Strombezug:</td>
                  <td className="has-text-right numeric">
                    <DecimalValue
                      amount={analysis.power_purchased}
                      suffix=" [MWh]"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Stromeinspeisung:</td>
                  <td className="has-text-right numeric">
                    <DecimalValue
                      amount={analysis.power_sold}
                      suffix=" [MWh]"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="column">
            <h2 className="title is-size-4">
              Wirtschaftlichkeit (ROI{" "}
              <DecimalValue
                amount={analysis.return_on_invest}
                suffix=" Jahre"
              />
              )
            </h2>
            <table className="table is-narrow is-striped">
              <tbody>
                <tr>
                  <td>Gesamtinvestition:</td>
                  <td className="has-text-right numeric">
                    <DecimalValue
                      amount={analysis.total_cost}
                      suffix=" [EUR]"
                    />
                  </td>
                </tr>
                <tr>
                  <td>J&auml;hrliche Einsparungen (netto):</td>
                  <td className="has-text-right numeric">
                    <DecimalValue
                      amount={analysis.annual_savings}
                      suffix=" [EUR]"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

const DecimalValue = ({ amount, suffix }) => {
  return (
    <NumberFormat
      value={amount}
      suffix={suffix}
      decimalSeparator=","
      thousandSeparator="."
      displayType="text"
    />
  );
};

export default ScenarioAnalysisApi;

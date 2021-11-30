import React from "react";
import GoogleChart from "./GoogleChart";
import { useParams, useNavigate } from "react-router-dom";
import NumberFormat from "react-number-format";

const ScenarioAnalysis = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [analysis, setAnalysis] = React.useState({});

  React.useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/${params.id}.results.json`)
    // fetch(`${process.env.PUBLIC_DATA_URL}/${params.id}.results.json`)
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
  }, [params,navigate]);

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
              chart={analysis.summer}
              title="Bedarf und Erzeugung im Sommer"
            />
            <GoogleChart
              chart={analysis.winter}
              title="Bedarf und Erzeugung im Winter"
            />
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

export default ScenarioAnalysis;

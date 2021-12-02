import React from "react";
import { Chart } from "react-google-charts";
import { useNavigate, useLocation } from "react-router-dom";
import NumberFormat from "react-number-format";
import axios from "axios";

const ScenarioAnalysisApi = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [analysis, setAnalysis] = React.useState({});

  React.useEffect(() => {
    // fetch(`${process.env.PUBLIC_URL}/${params.id}.results.json`)
    console.log(location.state);

    const data = location.state ? location.state.input : {
      area: 100, people_household: 3, electric_cars: 1,
      heating_demand_sqm: 100, roof_area: 100, pv_usage: 50, battery_size: 0.03
    }

    // console.log(process.env.REACT_APP_PUBLIC_DATA_URL);
    //
    axios.post(process.env.REACT_APP_PUBLIC_DATA_URL + "/getData", {
      // axios.post("http://39ed-2a02-8388-e041-e880-d473-361f-701e-70ac.ngrok.io" + "/getData",
      // axios.post("https://b0ff-2a02-8388-e041-e880-80e2-6536-3195-53f7.ngrok.io/getData", {
      'inputData': [data.area, data.people_household, data.electric_cars,
      data.heating_demand_sqm, data.roof_area, data.pv_usage, data.battery_size],
      'controlData': { 'h_from': data.h_from, "h_to": data.h_to }
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
        console.log(data);
        setAnalysis(data)
      })
      .catch((error) => {
        console.log(error);

        navigate("/");
      });
  }, [navigate, location.state]);

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
            <Chart
              width="100%"
              height={"400px"}
              chartType="ComboChart"
              loader={<div>Loading Chart..</div>}
              data={analysis.datarows}
              options={{
                title: "Bedarf und Erzeugung",
                legend: { position: "top", maxLines: 3 },
                chartArea: { width: "90%", height: "70%" },
                seriesType: "area",
                isStacked: true,
                series: { 1: { type: "line" }, 6: { type: "line" }},
                hAxis: { title: "Hour" },
                vAxis: { title: "kW" },
              }}
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
              {/* Eigenverbrauch (
              <DecimalValue
                amount={parseInt(analysis.eco?.sum_erzeugung / analysis.eco?.sum_bedarf * 100)}
                // amount={1000}
                suffix=" %"
              />
              ) */}
              Eigenverbrauch
            </h2>
            <table className="table is-narrow is-striped">
              <tbody>
                <tr>
                  <td>Strombedarf (gesamt):</td>
                  <td className="has-text-right numeric">
                    <DecimalValue
                      amount={analysis.eco?.sum_bedarf}
                      suffix=" [MWh]"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Stromerzeugung PV (gesamt)::</td>
                  <td className="has-text-right numeric">
                    <DecimalValue
                      amount={analysis.eco?.sum_erzeugung}
                      suffix=" [MWh]"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Eigenverbrauch:</td>
                  <td className="has-text-right numeric">
                    <DecimalValue
                      amount={analysis.eco?.sum_eigenversorgung}
                      suffix=" [MWh]"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Netzbezug:</td>
                  <td className="has-text-right numeric">
                    <DecimalValue
                      amount={analysis.eco?.sum_bezug}
                      suffix=" [MWh]"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Netzeinspeisung:</td>
                  <td className="has-text-right numeric">
                    <DecimalValue
                      amount={analysis.eco?.sum_lieferung}
                      suffix=" [MWh]"
                    />
                  </td>
                </tr>
                <tr>
                  <td><b>Eigenverbrauchsquote:</b></td>
                  <td className="has-text-right numeric">
                    <b>
                    <DecimalValue
                      amount={analysis.eco?.eigenVerbrauchsquote*100}
                      suffix=" [%]"
                      />
                      </b>
                  </td>
                </tr>
                <tr>
                  <td><b>Eigennutzungsgrad:</b></td>
                  <td className="has-text-right numeric">
                      <b>
                    <DecimalValue
                      amount={analysis.eco?.eigenNutzungsGrad*100}
                      suffix=" [%]"
                    />
                    </b>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="column">
            <h2 className="title is-size-4">
              Wirtschaftlichkeit (ROI{" "}
              <DecimalValue
                amount={analysis.eco?.roi}
                suffix=" Years"
              />
              )
            </h2>
            <table className="table is-narrow is-striped">
              <tbody>
                <tr>
                  <td>Gesamtinvestition:</td>
                  <td className="has-text-right numeric">
                    <DecimalValue
                      amount={analysis.eco?.total_capex}
                      suffix=" [EUR]"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Jährliche Einsparungen (netto):</td>
                  <td className="has-text-right numeric">
                    <DecimalValue
                      amount={analysis.eco?.net_annual_savings}
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
      decimalScale={0}
    />
  );
};

export default ScenarioAnalysisApi;

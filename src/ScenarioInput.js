import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const ScenarioInput = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [input, setInput] = React.useState({});

  React.useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/${params.id}.input.json`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`No input data for scenario ${params.id}.`);
        }
      })
      .then((data) => data.input)
      .then((input) => setInput(input))
      .catch((error) => {
        console.log(error);
        navigate("/");
      });
  }, []);

  return (
    <section className="section">
      <div className="container has-text-centered">
        <div className="column is-8 is-offset-2">
          <h1 className="title is-3">{input.scenario}</h1>
          <hr></hr>
          <p className="subtitle is-4">Eingabeparameter</p>
        </div>
      </div>
      <div className="container box">
        <div className="columns is-centered">
          <div className="column">
            <h2 className="title is-size-4">Verbraucher</h2>
            <Field
              label="Anzahl der Hausbewohner"
              type="number"
              value={input.people_household}
            />
            <Field
              label="Anzahl der E-Autos"
              type="number"
              value={input.electric_cars}
            />
            <Field
              label="J&auml;hrlicher Strombedarf"
              type="number"
              value={input.annual_demand}
              unit="kWh"
            />
          </div>
          <div className="column">
            <h2 className="title is-size-4">W&auml;rmeversorgung</h2>
            <Field
              label="Wärmebedarf"
              type="number"
              value={input.people_household}
            />
            <Field
              label="Wärmepumpe"
              type="number"
              value={input.electric_cars}
            />
            <Field
              label="Heizungsvorlauftemperatur"
              type="number"
              value={input.annual_demand}
              unit="°C"
            />
          </div>
          <div className="column">
            <h2 className="title is-size-4">Stromerzeugung + Speicher</h2>
            <Field
              label="Dachfl&auml;che"
              type="number"
              value={input.people_household}
              unit="qm"
            />
            <Field
              label="Installierte PV"
              type="number"
              value={input.electric_cars}
              unit="kWp"
            />
            <Field
              label="Batterie"
              type="number"
              value={input.annual_demand}
              unit="kWh"
            />
          </div>
        </div>
        <Link
          className="button is-link is-light"
          to={`/scenarios/${params.id}/analysis`}
        >
          Berechnen
        </Link>
      </div>
    </section>
  );
};

const Field = ({ label, type, value, unit }) => {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <p className="control has-icons-right">
        <input className="input" type={type} value={value}></input>
        {unit && <span className="icon is-small is-right">{unit}</span>}
      </p>
    </div>
  );
};

export default ScenarioInput;

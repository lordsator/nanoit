import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const ScenarioInput = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [input, setInput] = useState({});


  useEffect(() => {
    // console.log(process.env.PUBLIC_URL);
    fetch(`${process.env.PUBLIC_URL}/default.input.json`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`No input data for scenario ${params.id}.`);
        }
      })
      .then((data) => data.input)
      .then((input) => { setInput(input) })
      .catch(() => {
        navigate("/");
      });
  }, [params, navigate]);

  const handleChange = (e) => {
    // console.log(input);
    if (input) {
      let name = e.target.id;
      input[name] = parseFloat(e.target.value);
      console.log(input);
    }
  }

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
            <h2 className="title is-size-4">Haushalt</h2>
            <Field
              id="area"
              label="Wohnbereich qm"
              type="number"
              defaultValue={input.area}
              unit="qm"
              changeFunc={handleChange}
            />
            <Field
              id="people_household"
              label="Hausbewohner"
              type="number"
              defaultValue={input.people_household}
              changeFunc={handleChange}
            />
            <Field
              id="electric_cars"
              label="E-Autos"
              type="number"
              defaultValue={input.electric_cars}
              changeFunc={handleChange}
            />
          </div>
          <div className="column">
            <h2 className="title is-size-4">Energiesystem</h2>
            <Field
              id="heating_demand_sqm"
              label="Heizbedarf kwh pro qm"
              type="number"
              defaultValue={input.heating_demand_sqm}
              unit="kWh"
              changeFunc={handleChange}
            />
            <Field
              id="roof_area"
              label="Dachareal qm"
              type="number"
              defaultValue={input.roof_area}
              unit="qm"
              changeFunc={handleChange}
            />
            <Field
              id="pv_usage"
              label="PW Verwendung"
              type="number"
              defaultValue={input.pv_usage}
              unit="%"
              changeFunc={handleChange}
            />
            <Field
              id="battery_size"
              label="Batterieumfang in MWh"
              type="number"
              defaultValue={input.battery_size}
              unit="MWh"
              step={0.01}
              changeFunc={handleChange}
            />
            {/* <Field label="Wärmepumpe" type="text" value={input.heating_pump} /> */}
          </div>
          {/* <div className="column">
            <h2 className="title is-size-4">Stromerzeugung + Speicher</h2>
            <Field
              label="Dachfl&auml;che"
              type="number"
              value={input.roof_area}
              unit="qm"
            />
            <Field
              label="Installierte PV"
              type="number"
              defaultValue={75}
              unit="%"
            />
            <Field
              label="Batterie"
              type="number"
              value={input.battery_size}
              unit="kWh"
            />
          </div> */}
        </div>
        <label className="label">Die angezeigten Stunden beziehen sich auf die Grafik im nächsten Schritt, für die wirtschaftlichen Kennzahlen wird das ganze Jahr herangezogen</label>
        <div className="row" style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <Field
            id="h_from"
            label="angezeigte Stunden von (1 = 1.1.2020)"
            type="number"
            defaultValue={input.h_from}
            unit="h"
            changeFunc={handleChange}
          />
          <Field
            id="h_to"
            label="angezeigte Stunden bis (8760 = 1.1.2020)"
            type="number"
            defaultValue={input.h_to}
            unit="h"
            changeFunc={handleChange}
          />
        </div>
        <Link className="button is-link is-light"
          to={'/scenarios-api/'}
          state={{ input }}
        >
          Berechnen
        </Link>
        {/* <Link
          to={"/posts"}
          state={{ test: 'test' }}>
          Posts
        </Link> */}
      </div>
    </section>
  );
};
const Field = ({ id, label, type, value, unit, defaultValue, changeFunc, step }) => {

  let input = <div></div>;
  if (defaultValue) {
    input = <input id={id} name={label} className="input" type={type} defaultValue={defaultValue} onChange={changeFunc} step={step}></input>
  } else {
    input = <input className="input" type={type} value={value} ></input>
  }

  return (
    <div className="field">
      <label className="label">{label}</label>
      <p className="control has-icons-right">
        {input}
        {unit && <span className="icon is-small is-right">{unit}</span>}
      </p>
    </div>
  );
};


export default ScenarioInput;

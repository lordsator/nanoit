import React from "react";
import dorfer from "./res/p_dorfer.jpeg"
import coss from "./res/p_coss.jpeg"
import gorris from "./res/p_gorris.jpeg"

const Welcome = () => {
  return (
    <section className="section">
      <div className="container box">
        <b>Planungstool für Nanogrids</b>
        <p>Erlaubt es Installateuren leicht zu planen und zeigt Einsparungpotenzial und Wirtschaftlichkeit.
           Durch das ausgeklügelte Modell lassen sich Stundengenaue Berechnungen durchführen,
            die sowohl Hausbesitzern, als auch Installateuren schnell und einfach Kennzahlen liefern.
             Diese Kennzahlen helfen bei Entscheidungen über Art und Größe von PV Anlagen, Wärmespeichern und Wärmepumpen</p>
            <p></p>
        <br/>
        <div style={{display:'flex',justifyContent:"space-evenly"}}>
          <div style={{margin:"20px"}}><img src={coss} alt="Stefano Coss" /><p>Dr Stefano Coss</p></div>
          <div style={{margin:"20px"}}><img src={gorris} alt="MBA Verena Gorris" /><p>MBA Verena Gorris</p></div>
          <div style={{margin:"20px"}}><img src={dorfer} alt="Sebastian Dorfer" /><p>Sebastian Dorfer</p></div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;

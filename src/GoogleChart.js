import React from "react";
import { Chart } from "react-google-charts";

const GoogleChart = (props) => {
  const { chart, title } = props;

  return (
    <Chart
      width="100%"
      height={"400px"}
      chartType="ComboChart"
      loader={<div>Loading Chart..</div>}
      data={chart}
      options={{
        title: title,
        legend: { position: "top", maxLines: 3 },
        chartArea: { width: "93%", height: "70%" },
        seriesType: "area",
        isStacked: true,
        series: { 0: { type: "line" }, 1: { type: "line" } },
        hAxis: { title: "Hour" },
        vAxis: { title: "kW" },
      }}
    />
  );
};

export default GoogleChart;

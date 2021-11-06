import React from "react";
import { Chart } from "react-google-charts";

const GoogleChart = (props) => {
  const { chart, title } = props;

  return (
    <Chart
      width="100%"
      height={"400px"}
      chartType="AreaChart"
      loader={<div>Loading Chart</div>}
      data={chart}
      options={{
        title: title,
        legend: { position: "top", maxLines: 3 },
        chartArea: { width: "100%", height: "70%" },
      }}
    />
  );
};

export default GoogleChart;

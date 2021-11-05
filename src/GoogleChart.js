import React from "react";
import { Chart } from "react-google-charts";

const GoogleChart = (props) => {
  const { chart } = props;

  return (
    <>
      <Chart
        width="100%"
        height={"400px"}
        chartType="AreaChart"
        loader={<div>Loading Chart</div>}
        data={chart}
        options={{
          //title: "Fancy Curves",
          legend: { position: "top", maxLines: 3 },
          //vAxis: { minValue: 0 },
          // For the legend to fit, we make the chart area smaller
          chartArea: { width: "100%", height: "70%" },
          // lineWidth: 25
          //colors: ["#f72585", "#4895ef"],
        }}
      />
    </>
  );
};

export default GoogleChart;

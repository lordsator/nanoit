import React from "react";
import { Chart } from "react-google-charts";

const GoogleChart = () => {
  return (
    <>
      <Chart
        width="100%"
        height={"400px"}
        chartType="AreaChart"
        loader={<div>Loading Chart</div>}
        data={[
          ["Year", "Sales", "Expenses"],
          ["2013", 1000, 400],
          ["2014", 1170, 460],
          ["2015", 660, 820],
          ["2016", 1030, 540],
          ["2017", 433, 840],
          ["2018", 1637, 1540],
          ["2019", 888, 640],
          ["2020", 213, 340],
          ["2021", 900, 440],
          ["2022", 1230, 440],
          ["2023", 1430, 940],
          ["2024", 1430, 740],
          ["2025", 999, 240],
        ]}
        options={{
          title: "Fancy Curves",
          vAxis: { minValue: 0 },
          // For the legend to fit, we make the chart area smaller
          chartArea: { width: "100%", height: "80%" },
          // lineWidth: 25
          colors: ["#f72585", "#4895ef"],
        }}
      />
    </>
  );
};

export default GoogleChart;

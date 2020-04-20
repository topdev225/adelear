import React from "react";
import * as Highcharts from "highcharts";
import BaseChart from "./BaseChart";

const options: Highcharts.Options = {
  title: {
    text: "Duration"
  },
  subtitle: {
    text: ""
  },
  exporting: {
    enabled: false
  },
  chart: {
    type: "scatter"
  },
  series: [
    {
      name: "Duration Minimum",
      color: "rgba(223, 83, 83, .5)",
      type: "scatter",
      lineWidth: 0,
      data: [
        [1513348200000, 20],
        [1513607400000, 10],
        [1513693800000, 84],
        [1513780200000, 12],
        [1513866600000, 1],
        [1513953000000, 5],
        [1514298600000, 30],
        [1514385000000, 43]
      ]
    },
    {
      name: "Duration Average",
      color: "rgba(232, 177, 88, .5)",
      type: "scatter",
      lineWidth: 0,
      data: [
        [1513348200000, 25],
        [1513607400000, 10],
        [1513693800000, 84],
        [1513780200000, 12],
        [1513866600000, 1],
        [1513953000000, 5],
        [1514298600000, 30],
        [1514385000000, 43]
      ]
    },
    {
      name: "Duration Maximum",
      color: "rgba(28, 217, 47, .5)",
      type: "scatter",
      lineWidth: 0,
      data: [
        [1513348200000, 20],
        [1513607400000, 10],
        [1513693800000, 84],
        [1513780200000, 12],
        [1513866600000, 1],
        [1513953000000, 5],
        [1514298600000, 30],
        [1514385000000, 43]
      ]
    }
  ],
  plotOptions: {
    scatter: {
      marker: {
        enabled: true,
        radius: 2
      },
      states: {
        hover: {
          lineWidthPlus: 0
        }
      }
    }
  },
  tooltip: {
    shared: true,
    headerFormat: "{point.key}",
    pointFormat: "{series.name}: {point.y}",
    footerFormat: "Footer"
  },
  yAxis: {
    title: {
      text: "Count"
    }
  },
  xAxis: {},
  credits: {
    enabled: true
  }
};

function DurationChart() {
  return <BaseChart options={options} />;
}

export default DurationChart;

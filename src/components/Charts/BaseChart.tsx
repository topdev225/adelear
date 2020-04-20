import React from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

type BaseChartProps = {
  options: Highcharts.Options;
};

function BaseChart({ options }: BaseChartProps) {
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      // constructorType="stockChart"
      immutable
    />
  );
}

export default BaseChart;

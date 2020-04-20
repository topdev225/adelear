import React, { useMemo } from "react";
import * as Highcharts from "highcharts";
import moment, { Moment } from "moment";
import BaseChart from "./BaseChart";

// Modules Import
import { selectedJobSelector } from "@Modules";
import { connectStore } from "@Store";

// Types Import
import { SelectedJobType, MapStateToPropsType, StateType } from "@Types";

import { loopRelativeTimeByGranularity } from "@Utils";

type ErrorNSuccessChartProps = {
  relativeTime: string;
  granularity: string;
  selectedJob: SelectedJobType;
};

function generateOptions(
  data: any,
  relativeTime: string,
  granularity: string
): Highcharts.Options {
  const invocations: { [key: number]: number } = {};
  const successes: { [key: number]: number } = {};

  loopRelativeTimeByGranularity(
    relativeTime,
    granularity,
    (startTime: Moment, endTime: Moment) => {
      const startTimeInMillis = startTime.valueOf();

      invocations[startTimeInMillis] = 0;
      successes[startTimeInMillis] = 0;

      data.forEach((record: any) => {
        const startTimeInRecord = moment(record.startTime);

        if (
          startTimeInRecord.isSameOrAfter(startTime) &&
          startTimeInRecord.isBefore(endTime)
        ) {
          invocations[startTimeInMillis] = invocations[startTimeInMillis] + 1;

          if (record.status === 0) {
            successes[startTimeInMillis] = successes[startTimeInMillis] + 1;
          }
        }
      });
    }
  );

  const successRatesData = Object.keys(invocations)
    .map((millis: string) => Number(millis))
    .sort((a, b) => a - b)
    .map((millis: number) => [
      millis,
      Math.floor((successes[millis] / invocations[millis]) * 100)
    ]);

  return {
    title: {
      text: "Success Rate"
    },
    subtitle: {
      text: ""
    },
    xAxis: {
      type: "datetime"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Success Rate(%)"
      }
    },
    legend: {
      align: "right",
      x: -30,
      verticalAlign: "top",
      y: 25,
      floating: true,
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || "white",
      borderColor: "#CCC",
      borderWidth: 1,
      shadow: false
    },
    tooltip: {
      pointFormat: "{series.name}: {point.y}"
    },
    series: [
      {
        type: "line",
        name: "Success Rate(%)",
        data: successRatesData,
        color: "green"
      }
    ]
  };
}

const mapState: MapStateToPropsType = (state: StateType) => ({
  selectedJob: selectedJobSelector(state)
});

function ErrorNSuccessChart({
  selectedJob,
  relativeTime,
  granularity
}: ErrorNSuccessChartProps) {
  const options: Highcharts.Options = useMemo(
    () => generateOptions(selectedJob.history, relativeTime, granularity),
    [selectedJob, granularity]
  );

  return <BaseChart options={options} />;
}

export default connectStore(mapState)(ErrorNSuccessChart);

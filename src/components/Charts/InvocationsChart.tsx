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

type InvocationChartProps = {
  relativeTime: string;
  granularity: string;
  selectedJob: SelectedJobType;
};

function generateOptions(
  data: any,
  relativeTime: string,
  granularity: string
): Highcharts.Options {
  const successes: { [key: number]: number } = {};
  const errors: { [key: number]: number } = {};
  const inprogresses: { [key: number]: number } = {};

  loopRelativeTimeByGranularity(
    relativeTime,
    granularity,
    (startTime: Moment, endTime: Moment) => {
      const startTimeInMillis = startTime.valueOf();

      successes[startTimeInMillis] = 0;
      inprogresses[startTimeInMillis] = 0;
      errors[startTimeInMillis] = 0;

      data.forEach((record: any) => {
        const startTimeInRecord = moment(record.startTime);

        if (
          startTimeInRecord.isSameOrAfter(startTime) &&
          startTimeInRecord.isBefore(endTime)
        ) {
          if (record.status === 0) {
            successes[startTimeInMillis] = successes[startTimeInMillis] + 1;
          } else if (record.status === 1) {
            inprogresses[startTimeInMillis] =
              inprogresses[startTimeInMillis] + 1;
          } else if (record.status === 2) {
            errors[startTimeInMillis] = errors[startTimeInMillis] + 1;
          }
        }
      });
    }
  );

  const successesData = Object.keys(successes)
    .map((millis: string) => Number(millis))
    .sort((a, b) => a - b)
    .map((millis: number) => [millis, successes[millis]]);

  const errorsData = Object.keys(errors)
    .map((millis: string) => Number(millis))
    .sort((a, b) => a - b)
    .map((millis: number) => [millis, errors[millis]]);

  const inprogressesData = Object.keys(inprogresses)
    .map((millis: string) => Number(millis))
    .sort((a, b) => a - b)
    .map((millis: number) => [millis, inprogresses[millis]]);

  return {
    chart: {
      type: "column"
    },
    title: {
      text: "Invocations"
    },
    xAxis: {
      type: "datetime"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Invocations, Success, Errors and In progress"
      },
      stackLabels: {
        enabled: false
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
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false
        }
      }
    },
    series: [
      {
        name: "In Progress",
        type: "column",
        data: inprogressesData,
        color: "blue"
      },
      {
        name: "Error",
        type: "column",
        data: errorsData,
        color: "red"
      },
      {
        name: "Success",
        type: "column",
        data: successesData,
        color: "green"
      }
    ]
  };
}

const mapState: MapStateToPropsType = (state: StateType) => ({
  selectedJob: selectedJobSelector(state)
});

function InvocationsChart({
  selectedJob,
  relativeTime,
  granularity
}: InvocationChartProps) {
  const options: Highcharts.Options = useMemo(
    () => generateOptions(selectedJob.history, relativeTime, granularity),
    [selectedJob, granularity]
  );

  return <BaseChart options={options} />;
}

export default connectStore(mapState)(InvocationsChart);

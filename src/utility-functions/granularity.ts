import moment, { unitOfTime, Moment } from "moment";
import Granularities, {
  granularityUntiOrders
} from "../static-data/granularities";

type InterpretedRelativeTimeType = {
  relativeAmount: number;
  unit: unitOfTime.DurationConstructor;
};

type InterpretedGranularityType = {
  granularityValue: number;
  granularityUnit: unitOfTime.DurationConstructor;
};

export const interpretRelativeTime = (
  relativeTime: string
): InterpretedRelativeTimeType => {
  const len = relativeTime.length;
  const relativeAmount = parseInt(relativeTime.substring(0, len - 1));
  const unit = relativeTime.substring(
    len - 1
  ) as unitOfTime.DurationConstructor;

  return {
    relativeAmount,
    unit
  };
};

export const interpretGranularity = (
  granularity: string
): InterpretedGranularityType => {
  const len = granularity.length;
  const granularityValue = parseInt(granularity.substring(0, len - 1));
  const granularityUnit = granularity.substring(
    len - 1
  ) as unitOfTime.DurationConstructor;

  return {
    granularityValue,
    granularityUnit
  };
};

export const filterGranularitiesByRelativeTime = (
  relativeTime: string
): Array<string> => {
  const { relativeAmount, unit } = interpretRelativeTime(relativeTime);

  return Granularities.filter(g => {
    const granularity = interpretGranularity(g);
    const orderA = granularityUntiOrders.indexOf(granularity.granularityUnit);
    const orderB = granularityUntiOrders.indexOf(unit);

    return (
      orderA < orderB ||
      (orderA === orderB && granularity.granularityValue < relativeAmount)
    );
  });
};

export const loopRelativeTimeByGranularity = (
  relativeTime: string,
  granularity: string,
  callback: (startTime: Moment, endTime: Moment) => void
) => {
  const interpretedRelativeTime = interpretRelativeTime(relativeTime);
  const interpretedGranularity = interpretGranularity(granularity);

  const endTimeInRange = moment();
  const startTimeInRange = moment(endTimeInRange)
    .startOf(interpretedRelativeTime.unit)
    .subtract(
      interpretedRelativeTime.relativeAmount - 1,
      interpretedRelativeTime.unit
    );
  let endTime = moment();
  let strictEndTime = moment().endOf(interpretedGranularity.granularityUnit);
  let startTime = moment()
    .startOf(interpretedGranularity.granularityUnit)
    .subtract(
      interpretedGranularity.granularityValue - 1,
      interpretedGranularity.granularityUnit
    );

  while (1) {
    if (startTime.isBefore(startTimeInRange)) break;

    callback(startTime, endTime);

    endTime = moment(strictEndTime).subtract(
      interpretedGranularity.granularityValue,
      interpretedGranularity.granularityUnit
    );
    startTime = moment(startTime).subtract(
      interpretedGranularity.granularityValue,
      interpretedGranularity.granularityUnit
    );
    strictEndTime = endTime;
  }
};

import React, { useCallback, useEffect, useState, useRef, memo } from "react";
import moment, { unitOfTime } from "moment";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Divider
} from "@material-ui/core";

// Components Import
import {
  JobSummary,
  Loader,
  InvocationsChart,
  // DurationChart,
  SuccessRateChart,
  SelectFilterAndGroup
} from "@Components";

// Modules Import
import {
  loadJobStatus as loadJobStatusActionCreator,
  loadJobHistoryInRange,
  selectedJobSelector
} from "@Modules";
import { connectStore } from "@Store";

// Types Import
import {
  MapDispatchToPropsType,
  LoadJobStatusRequestType,
  SelectedJobType,
  LoadJobHistoryInDateRangeRequestType
} from "@Types";

import { useStyles } from "./job-status.styles";

import { interpretRelativeTime } from "@Utils";

// Type definition of the props that are passed in JobStatusProps component
type JobStatusProps = {
  jobId: number;
  loadJobStatus: LoadJobStatusRequestType;
  loadJobHistoryInRange: LoadJobHistoryInDateRangeRequestType;
};

const mapDispatch: MapDispatchToPropsType = {
  loadJobStatus: loadJobStatusActionCreator,
  loadJobHistoryInRange
};

const JobStatus = ({
  jobId,
  loadJobStatus,
  loadJobHistoryInRange
}: JobStatusProps) => {
  const classes = useStyles({});

  const [currentRelativeTime, setRelativeTime] = useState("3M");
  const [currentGranularity, setGranularity] = useState("1d");

  function loadJobHistory(relativeTime: string) {
    const interpreted = interpretRelativeTime(relativeTime);
    const relativeAmount = interpreted.relativeAmount;
    const unit = interpreted.unit;
    const startDate = moment()
      .subtract(relativeAmount, unit)
      .format();
    // const endDate = moment().format();
    loadJobHistoryInRange(jobId, startDate);
  }

  useEffect(() => {
    loadJobStatus([jobId]);
    loadJobHistory(currentRelativeTime);
  }, []);

  const handleFilterChange = useCallback((relativeTime: string) => {
    setRelativeTime(relativeTime);
    loadJobHistory(relativeTime);
  }, []);

  const handleGranularityChange = useCallback((granularity: string) => {
    setGranularity(granularity);
  }, []);

  return (
    <Box>
      <Box maxWidth={1072} mx="auto" my="auto">
        <Card className={classes.cardContainer}>
          <CardHeader title="Detail" />
          <CardContent>
            <Loader
              actionCreator={loadJobStatusActionCreator}
              selector={selectedJobSelector}
            >
              {(selectedJob: SelectedJobType) =>
                selectedJob.status ? (
                  <JobSummary jobStatus={selectedJob.status} />
                ) : (
                  <Box />
                )
              }
            </Loader>
          </CardContent>
        </Card>
      </Box>
      <Box mt={3} />
      <Box display="flex" justifyContent="flex-end" py={1}>
        <SelectFilterAndGroup
          filterValue={currentRelativeTime}
          groupValue={currentGranularity}
          onFilterChange={handleFilterChange}
          onGranularityChange={handleGranularityChange}
        />
      </Box>
      <Divider />
      <Box mb={1} />
      <Box px={1}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6}>
            <Card className={classes.cardContainer}>
              <CardHeader title="" />
              <CardContent>
                <InvocationsChart
                  relativeTime={currentRelativeTime}
                  granularity={currentGranularity}
                />
              </CardContent>
            </Card>
          </Grid>
          {/* <Grid item xs={12} sm={12} md={6}>
          <Card className={classes.cardContainer}>
            <CardHeader title="" />
            <CardContent>
              <DurationChart />
            </CardContent>
          </Card>
        </Grid> */}
          <Grid item xs={12} sm={12} md={6}>
            <Card className={classes.cardContainer}>
              <CardHeader title="" />
              <CardContent>
                <SuccessRateChart
                  relativeTime={currentRelativeTime}
                  granularity={currentGranularity}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default connectStore(null, mapDispatch)(JobStatus);

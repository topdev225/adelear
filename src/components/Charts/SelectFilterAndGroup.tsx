import React, { useCallback, useEffect, useState, useRef, memo } from "react";
import {
  Box,
  Portal,
  ClickAwayListener,
  Grow,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { useStyles } from "./select-filter-and-group.styles";

import DateFilter from "./DateFilter";

// Constants Import
import { filterGranularitiesByRelativeTime } from "@Utils";

type SelectFilterAndGroupProps = {
  filterValue: string;
  groupValue: string;
  onFilterChange: (value: string) => void;
  onGranularityChange: (value: string) => void;
};

const popularRelativeTimes = ["12h", "1d", "2d", "1w", "1M", "3M"];

function SelectFilterAndGroup({
  filterValue,
  groupValue,
  onFilterChange,
  onGranularityChange
}: SelectFilterAndGroupProps) {
  const classes = useStyles({});

  const customRangeRef = useRef(null);
  const [currentRelativeTime, setRelativeTime] = useState(filterValue);
  const [customRelative, setCustomRelative] = useState(filterValue);
  const [customRelativePopupVisible, showCustomRelativePopup] = useState(false);
  const [currentGranularity, setGranularity] = useState(groupValue);
  const [currentGranularities, setGranularities] = useState([]);

  useEffect(() => {
    if (popularRelativeTimes.includes(filterValue)) {
      setRelativeTime(filterValue);
    } else {
      setRelativeTime("custom");
      setCustomRelative(filterValue);
    }

    const granularities = filterGranularitiesByRelativeTime(filterValue);
    setGranularities(granularities);
    if (!granularities.includes(groupValue)) {
      onGranularityChange(granularities[0]);
    }
  }, [filterValue]);

  useEffect(() => {
    setGranularity(groupValue);
  }, [groupValue]);

  const handleRelativeDateChange = useCallback(
    (s: object, value: string) => {
      let relativeTime = value;
      if (!value) {
        relativeTime = currentRelativeTime;
      }

      if (relativeTime === "custom") {
        showCustomRelativePopup(!customRelativePopupVisible);
      } else {
        onFilterChange(relativeTime);
      }
    },
    [currentRelativeTime, customRelativePopupVisible]
  );

  const handleCustomRelativeRange = useCallback((customRelative: string) => {
    onFilterChange(customRelative);
    showCustomRelativePopup(false);
  }, []);

  const handleCloseCustomRelativePopup = useCallback(() => {
    showCustomRelativePopup(false);
  }, []);

  const handleGranularityChange = useCallback(e => {
    onGranularityChange(e.target.value);
  }, []);

  return (
    <Box display="flex" alignItems="center">
      <Box position="relative">
        <ToggleButtonGroup
          value={currentRelativeTime}
          exclusive
          onChange={handleRelativeDateChange}
        >
          {popularRelativeTimes.map((time, index) => (
            <ToggleButton key={index} value={time}>
              {time}
            </ToggleButton>
          ))}
          <ToggleButton value="custom">
            {currentRelativeTime === "custom" && customRelative
              ? `Custom (${customRelative})`
              : "Custom"}
          </ToggleButton>
        </ToggleButtonGroup>
        <div ref={customRangeRef} className={classes.dateRangePopup} />
      </Box>
      <Box ml={2} width={100}>
        <FormControl fullWidth>
          <InputLabel>Group By</InputLabel>
          <Select value={currentGranularity} onChange={handleGranularityChange}>
            {currentGranularities.map((granularity, index) => (
              <MenuItem key={index} value={granularity}>
                {granularity}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {customRelativePopupVisible && (
        <Portal container={customRangeRef.current}>
          <ClickAwayListener onClickAway={handleCloseCustomRelativePopup}>
            <Grow in>
              <Box>
                <DateFilter
                  value={currentRelativeTime}
                  onChange={handleCustomRelativeRange}
                />
              </Box>
            </Grow>
          </ClickAwayListener>
        </Portal>
      )}
    </Box>
  );
}

export default SelectFilterAndGroup;

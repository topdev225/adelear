import React, { useCallback, useState, useEffect } from "react";
import { Paper, Box, Typography } from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";

type DateFilterProps = {
  value: string;
  onChange: (value: string) => void;
};

function DateFilter({ value, onChange }: DateFilterProps) {
  const [currentRelative, setRelative] = useState(value);

  useEffect(() => {
    setRelative(value);
  }, [value]);

  const handleChangeRelative = useCallback(
    (s: object, value: string) => {
      if (value) {
        setRelative(value);
        onChange(value);
      }
    },
    [currentRelative]
  );

  return (
    <Paper>
      <Box px={2}>
        <Box display="flex" alignItems="center" py={1}>
          <Box width="100px">
            <Typography>Hours</Typography>
          </Box>
          <ToggleButtonGroup
            value={currentRelative}
            exclusive
            onChange={handleChangeRelative}
          >
            <ToggleButton value="1h">1</ToggleButton>
            <ToggleButton value="2h">2</ToggleButton>
            <ToggleButton value="3h">3</ToggleButton>
            <ToggleButton value="6h">6</ToggleButton>
            <ToggleButton value="8h">8</ToggleButton>
            <ToggleButton value="12h">12</ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Box display="flex" alignItems="center" py={1}>
          <Box width="100px">
            <Typography>Days</Typography>
          </Box>
          <ToggleButtonGroup
            value={currentRelative}
            exclusive
            onChange={handleChangeRelative}
          >
            <ToggleButton value="1d">1</ToggleButton>
            <ToggleButton value="2d">2</ToggleButton>
            <ToggleButton value="3d">3</ToggleButton>
            <ToggleButton value="4d">4</ToggleButton>
            <ToggleButton value="5d">5</ToggleButton>
            <ToggleButton value="6d">6</ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Box display="flex" alignItems="center" py={1}>
          <Box width="100px">
            <Typography>Weeks</Typography>
          </Box>
          <ToggleButtonGroup
            value={currentRelative}
            exclusive
            onChange={handleChangeRelative}
          >
            <ToggleButton value="1w">1</ToggleButton>
            <ToggleButton value="2w">2</ToggleButton>
            <ToggleButton value="4w">4</ToggleButton>
            <ToggleButton value="6w">6</ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Box display="flex" alignItems="center" py={1}>
          <Box width="100px">
            <Typography>Months</Typography>
          </Box>
          <ToggleButtonGroup
            value={currentRelative}
            exclusive
            onChange={handleChangeRelative}
          >
            <ToggleButton value="3M">3</ToggleButton>
            <ToggleButton value="6M">6</ToggleButton>
            <ToggleButton value="12M">12</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>
    </Paper>
  );
}

export default DateFilter;

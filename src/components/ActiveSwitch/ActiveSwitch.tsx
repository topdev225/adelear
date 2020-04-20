import React, { ChangeEvent } from "react";
import {
  Switch,
  withStyles,
  WithStyles,
  Theme,
  Tooltip
} from "@material-ui/core";

interface ActiveSwitchProps {
  tooltip?: string;
  active: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const styles = (theme: Theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0
  },
  switchBase: {
    padding: 1,
    "&$checked": {
      transform: "translateX(16px)",
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: "#52d869",
        opacity: 1,
        border: "none"
      }
    },
    "&$focusVisible $thumb": {
      color: "#52d869",
      border: "6px solid #fff"
    }
  },
  thumb: {
    width: 24,
    height: 24
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"])
  },
  checked: {},
  focusVisible: {}
});

interface IOSSwitchProps extends WithStyles<typeof styles> {
  tooltip?: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const IOSSwitch = withStyles(styles)(
  ({ classes, checked, onChange, tooltip }: IOSSwitchProps) => {
    return (
      <Tooltip title={tooltip}>
        <Switch
          focusVisibleClassName={classes.focusVisible}
          disableRipple
          classes={{
            root: classes.root,
            switchBase: classes.switchBase,
            thumb: classes.thumb,
            track: classes.track,
            checked: classes.checked
          }}
          checked={checked}
          onChange={onChange}
        />
      </Tooltip>
    );
  }
);

const ActiveSwitch: React.SFC<ActiveSwitchProps> = ({
  tooltip,
  active,
  onChange
}: ActiveSwitchProps) => {
  return <IOSSwitch checked={active} onChange={onChange} tooltip={tooltip} />;
};

export default ActiveSwitch;

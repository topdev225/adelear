import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  cardContainer: {
    boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.30)"
  },
  headerCell: {
    fontWeight: 600
  },
  dateRangePopup: {
    zIndex: 1,
    position: "absolute",
    width: "100%"
  }
}));

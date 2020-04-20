import { createMuiTheme } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { colors } from "./colors";

// TODO: Update font sizes for theme
// TODO: Update spacing for theme. Styles are too specific for this page only.
export const theme: Theme = createMuiTheme({
  overrides: {
    MuiListItemIcon: {
      root: {
        minWidth: "unset"
      }
    }
  },
  palette: {
    primary: {
      main: colors.blue.dark
    },
    secondary: {
      main: colors.blue.medium
    },
    error: {
      main: colors.red.medium
    },
    background: {
      default: colors.gray.extraLight
    }
  },
  shape: {
    borderRadius: 4
  },
  typography: {
    fontFamily: "Rubik, Raleway, Arial, Helvetica, sans-serif",
    button: {
      textTransform: "none"
    }
  }
});

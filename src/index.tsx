import { runWithAdal } from "react-adal";
import { authContext } from "./adalConfig";
// import "./assets/icons/favicon.ico";
import "./styles/global.css";

const DO_NOT_LOGIN = true;

runWithAdal(
  authContext,
  () => {
    // eslint-disable-next-line
    require("./indexApp");
  },
  DO_NOT_LOGIN
);

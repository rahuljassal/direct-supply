import { alpha, createTheme } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      dark: "#66DDB7", //P2
      main: "#52C9A3", //P3
      light: "#7AC9CB", //P4
      contrastText: "rgb(20, 20, 20)",
    },
    secondary: {
      dark: "rgb(49, 49, 49)", // S2
      main: "rgb(20, 20, 20)", // S3
      light: "#aab3b8", //S4
      contrastText: "#52C9A3",
    },

    background: {
      paper: "rgb(49, 49, 49)",
      default: "rgb(20, 20, 20)",
    },
    common: {
      black: "#000000",
      white: "#FFFFFF",
    },
    success: {
      main: "#4EBE19",
    },
    error: {
      main: "#D41B1B",
    },
    warning: {
      main: "#EAB01A",
    },
    info: {
      main: "#2196f3",
    },
    text: {
      secondary: "#000",
      primary: "#fff",
    },
    divider: "#d9d9d9",
    action: {
      hover: "#f5f5f5",
      disabled: "#000",
      disabledBackground: alpha("#52C9A3", 0.4),
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: "Graphik-Regular, sans-serif",
  },
  spacing: 8,
  transitions: {
    easing: {
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
    },
  },
});

export default theme;

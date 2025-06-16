const PRIMARY = {
  main: "#007AFF", //blue
  light: "#1972d2",
  dark: "#0054B0", //dark blue
};

const SECONDARY = {
  main: "#F17B21",
  light: "#FFECE1",
  dark: "#5E35B1",
};
const COMMON = {
  black: "#0E0D0D",
  white: "#FFFFFF",
};
const GREY = {
  50: "#F6F6F6",
  100: "#D8D8D8",
  200: "#9C9C9C",
  300: "#E0E0E0",
  500: "#BDBDBD",
  600: "#4B5565",
  700: "#364152",
  900: "#121926",
};
const SUCCESS = { light: "#B9F6CA", dark: "#00C853", main: "#00C853" };
const ERROR = {
  main: "#8C1823",
};
const ThemePalette = {
  light: {
    primary: PRIMARY,
    secondary: SECONDARY,
    common: COMMON,
    grey: GREY,
    success: SUCCESS,
    error: ERROR,
  },
  dark: {
    primary: {
      main: "#90caf9",
    },
    background: {
      default: "#121212",
    },
    text: {
      primary: "#fff",
      secondary: '#95a0ab'
    },
  },
};

export default ThemePalette

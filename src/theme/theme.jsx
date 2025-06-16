import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import ComponentOverride from "./ComponentOverride";
import ThemePalette from "./Palette";

const ThemeSetUp = ({ children, primaryColor, mode }) => {
  let theme = createTheme({
    colorSchemes: {
      dark: true,
    },
    palette: {
      mode: mode,
      primary: {
        main: primaryColor,
      },
      ...(mode === "dark" && {
        background: {
          default: "#121212",
          paper: "#1d1d1d",
        },
        text: {
          primary: "#fff",
        },
      }),
      ...(mode === "light" && {
        background: {
          default: "#f5f5f5",
          paper: "#fff",
        },
        text: {
          primary: "#272A33",
        },
      }),
      ...ThemePalette,
    },
  });
  theme.components = ComponentOverride(theme);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
export default ThemeSetUp;

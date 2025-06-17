import { DarkMode, LightMode } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useState } from "react";
import HomePage from "./pages/Home";
import ThemeSetUp from "./theme/theme";
import { ColorPaletteModal } from "./utils/Models";
import { RouterProvider } from "react-router-dom";
import Routes from "./routes/routes";
import { FileProvider } from "./utils/FileProvider";

function App() {
  const [primaryColor, setPrimaryColor] = useState("#007AFF");
  const [mode, setMode] = useState("light");
  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <FileProvider>
        <RouterProvider router={Routes}>
          <ThemeSetUp primaryColor={primaryColor} mode={mode}>
            <Box
              sx={{
                position: "fixed",
                display: "flex",
                flexDirection: "column",
                gap: 1,
                left: 5,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 6,
              }}
            >
              <IconButton
                onClick={toggleMode}
                sx={{
                  backgroundColor: "#4b5563",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#374151",
                  },
                  transition: "background-color 0.3s ease",
                }}
              >
                {mode === "dark" ? <LightMode /> : <DarkMode />}
              </IconButton>
              <ColorPaletteModal setPrimaryColor={setPrimaryColor} />
            </Box>
            <HomePage />
          </ThemeSetUp>
        </RouterProvider>
      </FileProvider>
    </Box>
  );
}

export default App;

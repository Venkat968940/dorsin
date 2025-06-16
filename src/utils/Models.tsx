import { Settings } from "@mui/icons-material";
import { Box, IconButton, Menu } from "@mui/material";
import { colorPalette } from "./constants";
import { useState } from "react";

export const ColorPaletteModal = ({setPrimaryColor}) => {
      const [anchorEl, setAnchorEl] = useState(null);
      const open = Boolean(anchorEl);
    
      // Handle color change from the picker
      const handleColorChange = (color) => {
        setPrimaryColor(color);
      };
    
      const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };
    
  return (
    <>
      <IconButton
        id="color-palette"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          backgroundColor: "#4b5563", // Grey background color
          color: "#fff", // White icon color
          "&:hover": {
            backgroundColor: "#374151", // Slightly darker grey on hover
          },
          transition: "background-color 0.3s ease",
        }}
      >
        <Settings
          sx={{
            animation: "spin 2s linear infinite",
          }}
        />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "color-palette",
          },
        }}
      >
        <Box
          sx={{
            width: 300,
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 1,
            m: 1,
          }}
        >
          {colorPalette.map((color, index) => (
            <Box
              key={index}
              onClick={() => handleColorChange(color)}
              sx={{
                width: 28,
                height: 28,
                backgroundColor: color,
                border: "1px solid #e0e0e0",
                borderRadius: "4px",
                cursor: "pointer",
                transition: "transform 0.1s",
                "&:hover": {
                  transform: "scale(1.1)",
                  zIndex: 1,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                },
              }}
            />
          ))}
        </Box>
      </Menu>
    </>
  );
};

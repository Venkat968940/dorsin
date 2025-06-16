import { PlayCircleOutline } from "@mui/icons-material";
import {
  Box,
  Container,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";

const HeroSection = () => {
  const theme = useTheme();
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        minHeight: 675,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Background Image */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage:
            "url('https://dorsin.angular.themesbrand.com/assets/images/bg-home.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: 1,
        }}
      />

      {/* Purple Gradient Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(to right, #512da8, #711e72)",
          opacity: 0.9,
          zIndex: 2,
        }}
      />

      {/* Content */}
      <Container
        sx={{
          position: "relative",
          zIndex: 3,
          textAlign: "center",
          color: "white",
          px: { xs: 2, sm: 3 },
          maxWidth: { xs: "90%", lg: 960, xl: 1140 },
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: 32, lg: 47 },
            fontFamily: "poppins-medium",
            pt: 6,
            lineHeight: "60px",
          }}
        >
          We help startups launch their
          <br />
          products
        </Typography>

        <Typography
          sx={{
            fontSize: 15,
            my: 4,
            opacity: 0.7,
            maxWidth: 600,
            mx: "auto",
            lineHeight: 1.6,
          }}
        >
          Etiam sed.Interdum consequat proin vestibulum class at.
        </Typography>

        <IconButton
          aria-label="Play video"
          sx={{
            width: { xs: 60, sm: 70, md: 80 },
            height: { xs: 60, sm: 70, md: 80 },
            backgroundColor: "transparent",
            transition: "all 0.3s ease",
          }}
        >
          <PlayCircleOutline
            color="primary"
            sx={{
              fontSize: { xs: 40, sm: 50, md: 60, lg: 70 },
            }}
          />
        </IconButton>
      </Container>

      {/* Wave SVG at bottom */}
      <Box
        sx={{
          position: "absolute",
          bottom: -3,
          left: 0,
          width: "100%",
          zIndex: 4,
        }}
      >
        <svg
          style={{
            width: "100%",
            height: "auto",
            display: "block",
          }}
          viewBox="0 0 2002 43"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0 9.49999V42L1998.5 40V23H1962L1879 33L1758.5 36L1703 29.5L1304.5 21.5C1285.3 15.5 1183.83 24 1135.5 29L636 35.5C455.2 1.89999 136.667 4.16665 0 9.49999Z"
            fill={theme.palette.mode === "dark" ? "#1D262D" : "white"}
            fillOpacity="0.1"
          />
          <path
            opacity="0.1"
            d="M0 33.5V41.5L1997.5 42V27H1972.5C1585.3 -21.8 1403.17 6.66666 1360.5 27C1299.7 13.4 1035.17 6 910.5 4C856.1 -6.8 597.5 8.5 475 17.5L0 33.5Z"
            fill={theme.palette.mode === "dark" ? "#1D262D" : "white"}
          />
          <path
            d="M0 31.6689V42.1689L2001.5 41.6689V11.6689L1942.25 18.3143C1910.49 21.8758 1879.21 29.7147 1847.38 32.5593C1799.52 36.8366 1750.41 29.3968 1727 23.6689C1577.8 -8.33114 1367.17 10.3355 1280.5 23.6689C1199.3 40.8689 1126.17 30.8355 1106 23.6689C1023.13 -2.89279 818.252 7.7814 689.669 19.2529C659.224 21.9691 629.271 29.2178 598.77 31.21C559.856 33.7516 520.953 28.0794 502 23.6689C395.2 -8.73115 122.833 15.1689 0 31.6689Z"
            fill={theme.palette.mode === "dark" ? "#1D262D" : "white"}
          />
        </svg>
      </Box>
    </Box>
  );
};

export default HeroSection;

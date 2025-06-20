import { Menu } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useScrollTrigger,
  useTheme,
} from "@mui/material";
import PropTypes from "prop-types";
import { cloneElement, Fragment, useContext, useState } from "react";
import FileContext from "../../utils/FileContext";
import useActiveSection from "../../utils/useActiveSection";
import { useNavigate } from "react-router-dom";

// ElevationScroll component to manage elevation behavior on scroll
function ElevationScroll(props) {
  const { children, window } = props;
  const theme = useTheme();
  const isMdAndUp = useMediaQuery(theme.breakpoints.up("md"));

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return children
    ? cloneElement(children, {
        elevation: trigger ? 4 : 0, // Change elevation based on scroll
        style: {
          backgroundColor: !isMdAndUp
            ? "#1d262d" // Always use default background below md
            : trigger
            ? "#1d262d"
            : "transparent", // Change background color based on scroll for md and up
          // transition: "background-color 0.3s ease", // Smooth transition for background color
          transition:
            "background-color 0.6s ease, padding 0.6s ease, box-shadow 0.6s ease",
          position: "fixed",
          top: 0,
          // padding: trigger && "10px",
          padding: trigger ? "6px 0" : "18px 0",
        },
      })
    : null;
}

ElevationScroll.propTypes = {
  children: PropTypes.element,
  window: PropTypes.func,
};

// Header component with dynamic scroll behavior
const Header = ({ sectionsRef, props }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { activeSection, setActiveSection } = useActiveSection();

  const { setUploadedFile } = useContext(FileContext);

  const scrollToSection = (ref, sectionId) => {
    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "center", // Scroll to the center of the section
    });
    setActiveSection(sectionId);
  };

  const sections = [
    { name: "Home", ref: sectionsRef.home, id: "home" },
    { name: "Services", ref: sectionsRef.services, id: "services" },
    { name: "Features", ref: sectionsRef.features, id: "features" },
    { name: "Pricing", ref: sectionsRef.pricing, id: "pricing" },
    { name: "Team", ref: sectionsRef.team, id: "team" },
    { name: "Blog", ref: sectionsRef.blog, id: "blog" },
    { name: "Contact", ref: sectionsRef.contact, id: "contact" },
  ];

  const NavItems = sections.map((section) => {
    return (
      <Typography
        key={section.name}
        onClick={() => scrollToSection(section.ref, section.id)}
        fontSize={15}
        sx={{
          color: activeSection === section.id ? "white" : "#FFFFFF99",
          cursor: "pointer",
          padding: "15px 10px",
        }}
      >
        {section.name}
      </Typography>
    );
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Optionally, preview the file or do something with it
      const fileURL = URL.createObjectURL(file);
      setUploadedFile(fileURL);
      console.log("File:", file, "fileURL:", fileURL);
      navigate(`/${file?.name}`);
    }
  };
  return (
    <Fragment>
      <ElevationScroll {...props}>
        <AppBar position="sticky">
          <Toolbar sx={{ ml: 2.5 }}>
            <Box
              sx={{
                width: "100%",
                maxWidth: { xs: "90%", lg: 960, xl: 1140 },
                display: "flex",
                alignItems: "center",
                margin: "0 auto",
              }}
            >
              <Typography
                fontSize={20}
                fontFamily="poppins-medium"
                fontWeight={700}
                sx={{ color: "white", letterSpacing: "2px" }}
              >
                DORSIN
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  ml: "70px",
                }}
              >
                <Box
                  sx={{
                    gap: 2,
                    display: {
                      xs: "none",
                      lg: "flex",
                    },
                    ml: 1,
                  }}
                >
                  {NavItems}
                </Box>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    variant="contained"
                    sx={{
                      display: { xs: "none", lg: "flex" },
                      borderRadius: 25,
                    }}
                  >
                    Try it Free
                  </Button>
                  <input
                    type="file"
                    accept="application/pdf" // Ensure it's only PDFs
                    style={{ display: "none" }}
                    id="upload-pdf"
                    onChange={handleFileChange}
                  />
                  <Button
                    variant="contained"
                    sx={{
                      display: { xs: "none", lg: "flex" },
                      borderRadius: 25,
                    }}
                    onClick={() =>
                      document.getElementById("upload-pdf").click()
                    }
                  >
                    Upload PDF
                  </Button>
                </Box>
              </Box>

              <IconButton
                sx={{ display: { xs: "block", lg: "none" } }}
                onClick={() => setOpen(!open)}
              >
                <Menu sx={{ color: "white" }} />
              </IconButton>
            </Box>
          </Toolbar>
          {open && (
            <Box
              sx={{
                display: { xs: "flex", lg: "none" },
                flexDirection: "column",
              }}
            >
              {NavItems}
              <Button
                variant="contained"
                sx={{
                  borderRadius: 25,
                  width:'fit-content'
                }}
                onClick={() => document.getElementById("upload-pdf").click()}
              >
                Upload PDF
              </Button>
            </Box>
          )}
        </AppBar>
      </ElevationScroll>
    </Fragment>
  );
};

export default Header;

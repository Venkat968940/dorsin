import { Box, useTheme } from "@mui/material";
import { useRef } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Blog from "../Blog";
import Contact from "../Contact";
import Features from "../Features";
import Pricing from "../Pricing";
import Services from "../Services";
import Team from "../Team";
import Testimonial from "../Testimonial";
import HeroSection from "./HeroSection";

const HomePage = () => {
  const theme = useTheme();
  const sectionsRef = {
    home: useRef(null),
    services: useRef(null),
    features: useRef(null),
    pricing: useRef(null),
    team: useRef(null),
    blog: useRef(null),
    contact: useRef(null),
  };

  return (
    <Box>
      <div ref={sectionsRef.home} id="home">
        <HeroSection />
      </div>

      <Header sectionsRef={sectionsRef} />
      <Box
        ref={sectionsRef.services}
        id="services"
        sx={{
          background: theme.palette.mode === "dark" ? "#1D262D" : "white",
          width: "100%",
        }}
      >
        <Services />
      </Box>
      <Box
        ref={sectionsRef.features}
        id="features"
        sx={{
          width: "100%",
          background: theme.palette.mode === "dark" ? "#232D34" : "#F8F9FA",
        }}
      >
        <Features />
      </Box>
      <Box
        ref={sectionsRef.pricing}
        id="pricing"
        sx={{
          width: "100%",
          background: theme.palette.mode === "dark" ? "#232D34" : "transparent",
        }}
      >
        <Pricing />
      </Box>
      <Box
        ref={sectionsRef.team}
        id="team"
        sx={{
          width: "100%",
          background: theme.palette.mode === "dark" ? "#1D262D" : "#F8F9FA",
        }}
      >
        <Team />
      </Box>
      <Box
        sx={{
          width: "100%",
          background: theme.palette.mode === "dark" ? "#232D34" : "white",
        }}
      >
        <Testimonial />
      </Box>
      <Box
        ref={sectionsRef.blog}
        id="blog"
        sx={{
          width: "100%",
          background: theme.palette.mode === "dark" ? "#232D34" : "#F8F9FA",
        }}
      >
        <Blog />
      </Box>
      <Box
        ref={sectionsRef.contact}
        id="contact"
        sx={{
          width: "100%",
          background: theme.palette.mode === "dark" ? "#272a33" : "white",
        }}
      >
        <Contact />
      </Box>
      <Footer />
    </Box>
  );
};

export default HomePage;

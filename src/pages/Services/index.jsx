import AppsIcon from "@mui/icons-material/Apps";
import DiamondIcon from "@mui/icons-material/Diamond";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import {
  Box,
  Container,
  Grid,
  IconButton,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import TitleContent from "../../utils/TitleContent";

const services = [
  {
    icon: <DiamondIcon sx={{ fontSize: 32 }} color="primary" />,
    title: "Digital Design",
    description:
      "Some quick example text to build on the card title and make up the bulk of the card's content. Moltin gives you the platform.",
  },
  {
    icon: <FormatColorFillIcon sx={{ fontSize: 32 }} color="primary" />,
    title: "Unlimited Colors",
    description:
      "Credibly brand standards compliant users without extensible services. Anibh euismod tincidunt ut laoreet.",
  },
  {
    icon: <SettingsApplicationsIcon sx={{ fontSize: 32 }} color="primary" />,
    title: "Strategy Solutions",
    description:
      "Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean necessary regelialia.",
  },
  {
    icon: <SupportAgentIcon sx={{ fontSize: 32 }} color="primary" />,
    title: "Awesome Support",
    description:
      "It is a paradisematic country, in which roasted parts of sentences fly into your mouth leave for the far World.",
  },
  {
    icon: <AppsIcon sx={{ fontSize: 32 }} color="primary" />,
    title: "Truly Multipurpose",
    description:
      "Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.",
  },
  {
    icon: <FlightTakeoffIcon sx={{ fontSize: 32 }} color="primary" />,
    title: "Easy to customize",
    description:
      "Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed her seven versalia.",
  },
];

const Services = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        margin: "0 auto",
        py: 5,
        maxWidth: { xs: "90%", lg: 960, xl: 1140 },
      }}
    >
      <TitleContent
        title="OUR SERVICES"
        message=" We craft digital, graphic and dimensional thinking, to create category leading brand experiences that have meaning and add a value for our clients."
      />

      <Grid container sx={{ my: 2 }}>
        {services?.map((item, index) => (
          <Grid
            size={{ xs: 12, sm: 6, md: 4 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "Center",
              gap: 2,
              p: 3,
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "translateY(-10px)",
                "& .MuiPaper-root": {
                  background: theme.palette.primary.main,
                  "& .MuiSvgIcon-root": {
                    color: "white",
                  },
                },
              },
              height: 262,
            }}
            key={index}
          >
            <Paper
              sx={{
                borderRadius: 15,
                width: 68,
                height: 68,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0 0 1.25rem rgba(108, 118, 134, 0.1)",
              }}
            >
              {item.icon}
            </Paper>
            <Typography
              fontSize={18}
              textAlign="center"
              fontFamily="poppins-medium"
            >
              {item?.title}
            </Typography>
            <Typography fontSize={14} color="textSecondary" textAlign="center">
              {item?.description}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Services;

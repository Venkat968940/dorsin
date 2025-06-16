import {
  ArrowRightAlt,
  Badge,
  ChevronRight,
  DesignServices,
  GpsFixed,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import TitleContent from "../../utils/TitleContent";

const teamMembers = [
  {
    name: "Frank Johnson",
    role: "CEO",
    image:
      "https://dorsin.angular.themesbrand.com/assets/images/team/img-1.jpg",
  },
  {
    name: "Elaine Stclair",
    role: "DESIGNER",
    image:
      "https://dorsin.angular.themesbrand.com/assets/images/team/img-2.jpg",
  },
  {
    name: "Wanda Arthur",
    role: "DEVELOPER",
    image:
      "https://dorsin.angular.themesbrand.com/assets/images/team/img-3.jpg",
  },
  {
    name: "Joshua Stemple",
    role: "MANAGER",
    image:
      "https://dorsin.angular.themesbrand.com/assets/images/team/img-4.jpg",
  },
];

const steps = [
  {
    icon: <DesignServices color="primary" sx={{ fontSize: 48 }} />,
    title: "Tell us what you need",
    description: "The Big Oxmox advised her not to do so.",
  },
  {
    icon: <Badge color="primary" sx={{ fontSize: 48 }} />,
    title: "Get free quotes",
    description: "Little Blind Text didn’t listen.",
  },
  {
    icon: <GpsFixed color="primary" sx={{ fontSize: 48 }} />,
    title: "Deliver high quality product",
    description: "When she reached the first hills.",
  },
];

const Team = () => {
  const theme = useTheme();
  return (
    <>
      <Box sx={{ py: "80px", background: theme.palette.mode==='light' && "white" }}>
        <Container
          sx={{
            maxWidth: { xs: "90%", lg: 960, xl: 1140 },
          }}
        >
          <TitleContent
            title="BEHIND THE PEOPLE"
            message="It is a long established fact that create category leading brand
            experiences a reader will be distracted by the readable
            content of a page when looking at its layout."
          />

          <Grid container spacing={3} justifyContent="space-between">
            {teamMembers.map((member, index) => (
              <Grid
                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                sx={{
                  borderBottom:
                    theme.palette.mode === "dark"
                      ? "1px solid #495057"
                      : "1px solid #e9ecef",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-10px)",
                  },
                }}
                key={index}
              >
                <Card
                  sx={{
                    borderRadius: 2,
                    overflow: "hidden",
                    // bgcolor: "#fff",
                    textAlign: "center",
                    boxShadow: "none",
                    background: "none",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="250"
                    sx={{ borderRadius: 2 }}
                    image={member.image}
                    alt={member.name}
                  />
                  <CardContent
                    sx={
                      {
                        // bgcolor: "#0b111f",
                      }
                    }
                  >
                    <Typography mb={1} pt={3} fontFamily="poppins-medium">
                      {member.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "#a8aeb4", textTransform: "uppercase" }}
                    >
                      {member.role}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Box
        sx={{
          py: "70px",
          background: theme.palette.mode !== "dark" && "#F8F9FA",
        }}
      >
        <Box
          sx={{
            maxWidth: { xs: "90%", lg: 960, xl: 1140 },
            margin: "0 auto",
          }}
        >
          <TitleContent title="WORK PROCESS" message="In an ideal world this website wouldn’t exist, a client would
            acknowledge the importance of having web copy before the Proin vitae
            ipsum vel ex finibus semper design starts."/>
     

          <Grid container justifyContent="center" spacing={4} mt={4}>
            {steps.map((step, index) => (
              <Grid
                size={{ xs: 12, md: 4 }}
                key={index}
                sx={{
                  textAlign: "center",
                  position: "relative",
                }}
              >
                {/* Content */}
                <Box sx={{ position: "relative", zIndex: 1 }}>
                  {step.icon}
                  <Typography fontFamily="poppins-medium" fontSize={18} mt={1}>
                    {step.title}
                  </Typography>
                  <Typography sx={{ color: "#95a0ab", fontSize: 14, mt: 0.5 }}>
                    {step.description}
                  </Typography>
                  {index < 2 && (
                    <>
                      <Box
                        sx={{
                          position: "absolute",
                          borderBottom: "1px dotted #ccc",
                          height: "2px",
                          width: "80%",
                          right: "-40%",
                          top: 20,
                          display: { xs: "none", md: "block" },
                        }}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          width: "80%",
                          right: "-40%",
                          top: 8,
                          display: { xs: "none", md: "block" },
                        }}
                      >
                        <ChevronRight
                          sx={{
                            background: theme.palette.primary.main,
                            color: theme.palette.common.white,
                            borderRadius: 20,
                            fontSize: 30,
                          }}
                        />
                      </Box>
                    </>
                  )}
                </Box>
              </Grid>
            ))}
            <Grid
              size={{ xs: 12 }}
              sx={{ pt: 5, display: "flex", justifyContent: "center" }}
            >
              <Button endIcon={<ArrowRightAlt />} variant="contained">
                Get Started
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Team;

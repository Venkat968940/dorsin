import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import TitleContent from "../../utils/TitleContent";

const Pricing = () => {
  const theme = useTheme();

  const pricingDetails = [
    {
      title: "ECONOMY",
      price: "$9.90",
      bandWidth: "1GB",
      onlineSpace: "50MB",
      support: "No",
      domains: "1",
    },
    {
      title: "DELUXE",
      price: "$19.90",
      bandWidth: "10GB",
      onlineSpace: "500MB",
      support: "Yes",
      domains: "10",
    },
    {
      title: "ULTIMATE",
      price: "$29.90",
      bandWidth: "10GB",
      onlineSpace: "2GB",
      support: "Yes",
      domains: "Unlimited",
    },
  ];
  return (
    <>
      <Box
        component="section"
        sx={{
          position: "relative",
          padding: "100px 0",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "url('https://dorsin.angular.themesbrand.com/assets/images/img-1.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            zIndex: 1,
          }}
        />
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
            fontFamily="poppins-medium"
            sx={{
              fontSize: 30,
              mb: 3,
              lineHeight: 1.2,
            }}
          >
            Build your dream website today
          </Typography>

          <Typography
            variant="h6"
            sx={{
              fontSize: 15,
              mb: 4,
              opacity: 0.9,
              maxWidth: 600,
              mx: "auto",
              lineHeight: 1.6,
              color: "#FFFFFFB3",
            }}
          >
            But nothing the copy said could convince her and so it didn’t take
            long until a few insidious Copy Writers ambushed her.
          </Typography>

          <Button
            variant="outlined"
            sx={{ color: "#000", background: "white" }}
          >
            View Plan & Pricing
          </Button>
        </Container>

        <Box
          sx={{
            position: "absolute",
            bottom: -22,
            left: 0,
            width: "100%",
            zIndex: 4,
          }}
        >
          <svg
            _ngcontent-ng-c2304683374=""
            width="100%"
            height="43"
            viewBox="0 0 2002 43"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              _ngcontent-ng-c2304683374=""
              d="M0 9.49999V42L1998.5 40V23H1962L1879 33L1758.5 36L1703 29.5L1304.5 21.5C1285.3 15.5 1183.83 24 1135.5 29L636 35.5C455.2 1.89999 136.667 4.16665 0 9.49999Z"
              fill={theme.palette.mode === "dark" ? "#232D34" : "#F8F9FA"}
              fill-opacity="0.1"
            ></path>
            <path
              _ngcontent-ng-c2304683374=""
              opacity="0.1"
              d="M0 33.5V41.5L1997.5 42V27H1972.5C1585.3 -21.8 1403.17 6.66666 1360.5 27C1299.7 13.4 1035.17 6 910.5 4C856.1 -6.8 597.5 8.5 475 17.5L0 33.5Z"
              fill={theme.palette.mode === "dark" ? "#232D34" : "#F8F9FA"}
            ></path>
            <path
              _ngcontent-ng-c2304683374=""
              d="M0 31.6689V42.1689L2001.5 41.6689V11.6689L1942.25 18.3143C1910.49 21.8758 1879.21 29.7147 1847.38 32.5593C1799.52 36.8366 1750.41 29.3968 1727 23.6689C1577.8 -8.33114 1367.17 10.3355 1280.5 23.6689C1199.3 40.8689 1126.17 30.8355 1106 23.6689C1023.13 -2.89279 818.252 7.7814 689.669 19.2529C659.224 21.9691 629.271 29.2178 598.77 31.21C559.856 33.7516 520.953 28.0794 502 23.6689C395.2 -8.73115 122.833 15.1689 0 31.6689Z"
              fill={theme.palette.mode === "dark" ? "#232D34" : "#F8F9FA"}
            ></path>
          </svg>
        </Box>
      </Box>
      <Box
        sx={{
          maxWidth: { xs: "90%", lg: 960, xl: 1140 },
          margin: "0 auto",
          py: 5,
        }}
      >
        <TitleContent
          title="OUR PRICING"
          message="Call to action pricing table is really crucial to your for your
            business website. Make your bids stand-out with amazing options."
        />
        <Grid container my={2} spacing={3}>
          {pricingDetails?.map((item, idx) => (
            <Grid size={{ xs: 12, md: 4 }} key={idx}>
              <Paper
                sx={{
                  borderRadius: 2,
                  border:
                    theme.palette.mode === "dark"
                      ? "1px solid #495057"
                      : "1px solid #e9ecef",
                  padding: "50px 40px",
                  textAlign: "center",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  background:
                    theme.palette.mode === "light" && idx === 1
                      ? "white"
                      : "transparent",
                  boxShadow:
                    idx === 1
                      ? "0 0rem 4rem rgba(0, 0, 0, 0.1)"
                      : "0 0 1.25rem rgba(108, 118, 134, 0.1)",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-10px)",
                  },
                }}
              >
                <Box>
                  {/* Header Section */}
                  <Box mb={3}>
                    <Typography
                      fontSize={15}
                      gutterBottom
                      sx={{ margin: "0 0 8px" }}
                    >
                      {item?.title}
                    </Typography>
                    <Typography
                      fontFamily="poppins-medium"
                      fontSize={36}
                      sx={{ padding: "5px 0 0",  }}
                    >
                      {item?.price}
                    </Typography>
                    <Typography
                      fontSize={12}
                      sx={{ margin: "0 0 8px" }}
                      variant="body2"
                      color="text.secondary"
                      mb={2}
                    >
                      BILLING PER MONTH
                    </Typography>
                    <Divider sx={{mt: 4}}/>
                  </Box>

                  {/* Features Section */}
                  <Box sx={{ textAlign: "left", mb: 3 }}>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      sx={{ margin: "0 0 16px", padding: "5px 0 0" }}
                      fontSize={14}
                    >
                      <Typography mr={1}>Bandwidth:</Typography>
                      <Typography color="primary" fontWeight="medium">
                        {item.bandWidth}
                      </Typography>
                    </Box>

                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      sx={{ margin: "0 0 16px", padding: "5px 0 0" }}
                      fontSize={14}
                    >
                      <Typography mr={1}>Online space:</Typography>
                      <Typography color="primary" fontWeight="medium">
                        {item.onlineSpace}
                      </Typography>
                    </Box>

                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      sx={{ margin: "0 0 16px", padding: "5px 0 0" }}
                      fontSize={14}
                    >
                      <Typography mr={1}>Support:</Typography>
                      <Typography color="primary" fontWeight="medium">
                        {item.support}
                      </Typography>
                    </Box>

                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      sx={{ margin: "0 0 16px", padding: "5px 0 0" }}
                      fontSize={14}
                    >
                      <Typography mr={1}>Domain:</Typography>
                      <Typography color="primary" fontWeight="medium">
                        {item.domains}
                      </Typography>
                    </Box>

                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      sx={{ margin: "0 0 16px", padding: "5px 0 0" }}
                      fontSize={14}
                    >
                      <Typography mr={1}>Hidden Fees:</Typography>
                      <Typography color="primary" fontWeight="medium">
                        No
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Button Section */}
                <Button
                  variant="contained"
                  sx={{ width: "fit-content", mx: "auto" }}
                >
                  Join Now
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Pricing;

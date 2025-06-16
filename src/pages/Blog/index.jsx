import { ArrowRightAlt } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import TitleContent from "../../utils/TitleContent";

const Blog = () => {
  const theme = useTheme();

  const blogDetails = [
    {
      title: "UI & UX Design",
      headline: "Doing a cross country road trip",
      message:
        "She packed her seven versalia, put her initial into the belt and made herself on the way..",
      imageUrl:
        "https://dorsin.angular.themesbrand.com/assets/images/blog/img-1.jpg",
    },
    {
      title: "Digital Marketing",
      headline: "New exhibition at our Museum",
      message:
        "Pityful a rethoric question ran over her cheek, then she continued her way.",
      imageUrl:
        "https://dorsin.angular.themesbrand.com/assets/images/blog/img-2.jpg",
    },
    {
      title: "Traveling",
      headline: "Why are so many people..",
      message:
        "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.",
      imageUrl:
        "https://dorsin.angular.themesbrand.com/assets/images/blog/img-3.jpg",
    },
  ];
  return (
    <>
      <Box
        component="section"
        sx={{
          position: "relative",
          minHeight: 450,
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
              "url('https://dorsin.angular.themesbrand.com/assets/images/img-2.jpg')",
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
            variant="h1"
            sx={{
              fontSize: 36,
              fontFamily: "poppins-medium",
              mb: 4,
              lineHeight: 1.2,
            }}
          >
            Let's Get Started
          </Typography>
          <Box
            sx={{
              width: 50,
              height: 2,
              background: theme.palette.primary.main,
              margin: "0 auto",
            }}
          />

          <Typography
            variant="h6"
            sx={{
              fontSize: 14,
              margin: "0 auto 16px",
              p: "24px 0 0",
              maxWidth: 600,
              opacity: 0.9,
              lineHeight: 1.6,
            }}
          >
            Far far away, behind the word mountains, far from the countries
            Vokalia and Consonantia, there live the blind texts.
          </Typography>

          <Button sx={{ mt: 2 }} variant="outlined" endIcon={<ArrowRightAlt />}>
            Get Started
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
            p: "48px 0 10px",
          }}
        >
          <TitleContent
            title="BLOG"
            message="Call to action pricing table is really crucial to your for your
            business website. Make your bids stand-out with amazing options."
          />

          <Grid container my={2} justifyContent="space-around" mt={4} spacing={3}>
            {blogDetails?.map((item, idx) => (
              <Grid
                size={{ xs: 12, md: 3 }}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-10px)",
                  },
                }}
                key={idx}
              >
                <Avatar
                  variant="square"
                  src={item.imageUrl}
                  sx={{ height: "auto", width: 'auto' }}
                />
                <Typography
                sx={{margin:'24px 0 8px'}}
                  fontSize={14}
                  color="textSecondary"
                  fontFamily="poppins-medium"
                >
                  {item?.title}
                </Typography>
                <Typography fontSize={18} fontFamily="poppins-medium">
                  {item?.headline}
                </Typography>
                <Typography fontSize={14} color="textSecondary">
                  {item?.message}
                </Typography>
                <Button
                  sx={{
                    width: "fit-content",
                    p: 0,
                    "&: hover": {
                      background: "none",
                      color: "black",
                    },
                  }}
                  endIcon={<ArrowRightAlt />}
                >
                  Read More
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
    </>
  );
};

export default Blog;

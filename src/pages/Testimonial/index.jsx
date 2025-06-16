import { Avatar, Box, Grid, Paper, Typography, useTheme } from "@mui/material";
import TitleContent from "../../utils/TitleContent";

const Testimonial = () => {
  const theme = useTheme();
  const testimonialData = [
    {
      imageUrl:
        "https://dorsin.angular.themesbrand.com/assets/images/testimonials/user-2.jpg",
      message:
        "I feel confident imposing change on myself. It's a lot more fun progressing than looking back. That's why scelerisque pretium dolor, sit amet vehicula erat pelleque need throw curve balls.",
      userName: "Ruben Reed",
      place: "Charleston",
    },
    {
      imageUrl:
        "https://dorsin.angular.themesbrand.com/assets/images/testimonials/user-1.jpg",
      message:
        "Our task must be to free ourselves by widening our circle of compassion to embrace all living creatures Integer varius lacus non magna tempor congue natuasre the whole its beauty.",
      userName: "Michael P. Howlett",
      place: "Worcester",
    },
    {
      imageUrl:
        "https://dorsin.angular.themesbrand.com/assets/images/testimonials/user-3.jpg",
      message:
        "I've learned that people will forget what you said, people will forget what you did, but people will never aliquam in nunc quis tincidunt forget how you vestibulum egestas them feel.",
      userName: "Theresa D. Sinclair ",
      place: "Lynchburg",
    },
  ];
  return (
    <Box
      sx={{
        maxWidth: { xs: "90%", lg: 960, xl: 1140 },
        margin: "0 auto",
        py: 5,
      }}
    >
      <TitleContent
        title="WHAT THEY'VE SAID"
        message="We craft digital, graphic and dimensional thinking, to create category
        leading brand experiences that have meaning and add a value for our
        clients."
      />
      <Grid container sx={{ my: 6 }}>
        {testimonialData?.map((item, idx) => (
          <Grid
            size={{ xs: 12, sm: 6, md: 4 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "Center",
              gap: 2,
              p: 3,
              transition: "transform 0.3s ease",
              "& .MuiPaper-root": {
                boxShadow: "0 0 1.25rem rgba(108, 118, 134, 0.1)",
                border:
                  theme.palette.mode === "dark"
                    ? "1px solid #495057"
                    : "1px solid #e9ecef",
                borderRadius: 2,
              },
              "&:hover": {
                transform: "translateY(-10px)",
                "& .MuiPaper-root": {
                  "& .MuiSvgIcon-root": {
                    color: "white",
                  },
                },
              },
              position: "relative",
            }}
            key={idx}
          >
            <Box
              sx={{
                height: 68,
                width: 68,
                position: "absolute",
                top: -8,
                border: "1px solid #e9ecef",
                p: 0.2,
                borderRadius: "50%",
              }}
            >
              <Avatar
                sx={{ width: "100%", height: "100%" }}
                src={item?.imageUrl}
              />
            </Box>
            <Paper
              sx={{
                p: "60px 25px 30px",
                background:"transparent"
              }}
            >
              <Typography
                textAlign="center"
                fontFamily="poppins-italic"
                color="textSecondary"
              >
                {item?.message}
              </Typography>
            </Paper>
            <Box component="span" sx={{ display: "flex" }}>
              <Typography fontSize={14} textAlign="center" fontFamily="poppins-medium">{item?.userName} -</Typography>
              <Typography fontSize={14} color="textSecondary">{item?.place}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Testimonial;

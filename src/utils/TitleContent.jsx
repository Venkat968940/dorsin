import { Box, Typography, useTheme } from "@mui/material";

const TitleContent = ({ title, message }) => {
  const theme = useTheme();
  return (
    <>
      <Typography
        fontSize={28}
        sx={{ fontFamily: "poppins-medium", pb: "10px" }}
        textAlign="center"
      >
        {title}
      </Typography>
      <Box
        sx={{
          width: 50,
          height: 2,
          background: theme.palette.primary.main,
          margin: "16px  auto",
        }}
      />
      <Typography
        textAlign="center"
        color="textSecondary"
        maxWidth="600px"
        sx={{ margin: "0 auto", padding:'10px 0 16px 0' }}
      >
        {message}
      </Typography>
    </>
  );
};

export default TitleContent;

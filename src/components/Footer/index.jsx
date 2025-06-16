import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#272a33", color: "#fff", pt: 6 }}>
      <Grid
        container
        spacing={4}
        // justifyContent="center"
        sx={{
          maxWidth: { xs: "90%", lg: 960, xl: 1140 },
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* DORSIN */}
        <Grid size={{ xs: 12, md: 3 }}>
          <Typography fontSize={18} fontFamily="poppins-medium" gutterBottom>
            DORSIN
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Link href="#" underline="none" color="#bbb" fontSize={14}>
              Home
            </Link>
            <Link href="#" underline="none" color="#bbb" fontSize={14}>
              About us
            </Link>
            <Link href="#" underline="none" color="#bbb" fontSize={14}>
              Careers
            </Link>
            <Link href="#" underline="none" color="#bbb" fontSize={14}>
              Contact us
            </Link>
          </Box>
        </Grid>

        {/* Information */}
        <Grid size={{ xs: 12, md: 3 }}>
          <Typography fontSize={18} fontFamily="poppins-medium" gutterBottom>
            Information
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Link href="#" underline="none" color="#bbb" fontSize={14}>
              Terms & Condition
            </Link>
            <Link href="#" underline="none" color="#bbb" fontSize={14}>
              About us
            </Link>
            <Link href="#" underline="none" color="#bbb" fontSize={14}>
              Jobs
            </Link>
            <Link href="#" underline="none" color="#bbb" fontSize={14}>
              Bookmarks
            </Link>
          </Box>
        </Grid>

        {/* Support */}
        <Grid size={{ xs: 12, md: 3 }}>
          <Typography fontSize={18} fontFamily="poppins-medium" gutterBottom>
            Support
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Link href="#" underline="none" color="#bbb" fontSize={14}>
              FAQ
            </Link>
            <Link href="#" underline="none" color="#bbb" fontSize={14}>
              Contact
            </Link>
            <Link href="#" underline="none" color="#bbb" fontSize={14}>
              Discussion
            </Link>
          </Box>
        </Grid>

        {/* Subscribe */}
        <Grid size={{ xs: 12, md: 3 }}>
          <Typography fontSize={18} fontFamily="poppins-medium" gutterBottom>
            Subscribe
          </Typography>
          <Typography variant="body2" color="#bbb" mb={2}>
            In an ideal world this text wouldn’t exist, a client would
            acknowledge the importance of having web copy before the design
            starts.
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Email"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SendIcon sx={{ color: "#bbb" }} />
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                backgroundColor: "#1c2b36",
                color: "#fff",
                borderRadius: 1,
              },
            }}
            sx={{
              input: { color: "#fff" },
            }}
          />
        </Grid>
      </Grid>

      {/* Bottom Bar */}
      <Box
        sx={{
          backgroundColor: "#1c2b36",
          mt: 6,
          py: 2,
          px: { xs: 4, md: 10 },
          display: "flex",
          // flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="body2" color="#bbb">
          2025 © Dorsin - Themesbrand
        </Typography>
        <Box sx={{ mt: { xs: 1, md: 0 }, display: "flex", gap: 2 }}>
          <img
            src="https://dorsin.angular.themesbrand.com/assets/images/payment.png"
            alt="visa"
            height={24}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;

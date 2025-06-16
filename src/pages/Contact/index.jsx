import {
  Email,
  Facebook,
  Google,
  LinkedIn,
  Phone,
  Reddit,
  Twitter,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Alert,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import TitleContent from "../../utils/TitleContent";

const Contact = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // clear error on input
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError("*Please enter a name*");
      return;
    }
    // Submit logic here...
    alert("Message sent!");
  };

  const socialMediaIcons = [
    {
      icon: <Facebook sx={{ fontSize: 22 }} />,
    },
    {
      icon: <Twitter sx={{ fontSize: 22 }} />,
    },
    {
      icon: <LinkedIn sx={{ fontSize: 22 }} />,
    },
    {
      icon: <Google sx={{ fontSize: 22 }} />,
    },
    {
      icon: <Reddit sx={{ fontSize: 22 }} />,
    },
  ];
  return (
    <>
      <Box
        sx={{
          maxWidth: { xs: "90%", lg: 960, xl: 1140 },
          margin: "0 auto",
          padding: "40px 0 0",
        }}
      >
        {/* Header */}
        <TitleContent
          title="GET IN TOUCH"
          message="We thrive when coming up with innovative ideas but also understand that
        a smart concept should be supported with faucibus sapien odio measurable
        results."
        />

        {/* Main Grid */}
        <Grid
          container
          sx={{
            py: "70px",
          }}
          spacing={4}
        >
          {/* Left Column */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              fontSize={14}
              fontFamily="poppins-medium"
              mb={2}
              fontWeight={600}
            >
              Office Address 1:
            </Typography>
            <Typography sx={{ color: "#7a7a7a", mb: 2 }}>
              4461 Cedar Street Moro, AR 72368
            </Typography>

            <Typography
              fontSize={14}
              fontFamily="poppins-medium"
              mb={2}
              fontWeight={600}
            >
              Office Address 2:
            </Typography>
            <Typography sx={{ color: "#7a7a7a", mb: 2 }}>
              2467 Swick Hill Street
              <br />
              New Orleans, LA 70171
            </Typography>

            <Typography
              fontSize={14}
              fontFamily="poppins-medium"
              mb={2}
              fontWeight={600}
            >
              Working Hours:
            </Typography>
            <Typography sx={{ color: "#7a7a7a" }}>9:00AM To 6:00PM</Typography>
          </Grid>

          {/* Right Column (Form) */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              {error && (
                <Alert severity="warning" sx={{ fontSize: 14 }}>
                  {error}
                </Alert>
              )}

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    placeholder="Your name*"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    placeholder="Your email*"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>

              <TextField
                fullWidth
                placeholder="Your Subject.."
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                placeholder="Your message..."
                multiline
                minRows={4}
                name="message"
                value={formData.message}
                onChange={handleChange}
              />

              <Box textAlign="right" mt={2}>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ backgroundColor: "#ff4d4d", px: 4 }}
                >
                  Send Message
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          p: "40px 0",
          background: theme.palette.mode === "dark" ? "#232d34" : "#F8F9FA",
        }}
      >
        <Grid
          container
          alignItems="center"
          spacing={4}
          sx={{
            maxWidth: { xs: "90%", lg: 960, xl: 1140 },
            margin: "0 auto",
          }}
        >
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: "flex", gap: 2 }}>
            {socialMediaIcons?.map((item, idx) => (
              <Box
                sx={{
                  border: "2px solid #afb5bd",
                  width: 48,
                  borderRadius: 20,
                  height: 48,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#afb5bd",
                }}
                key={idx}
              >
                {item?.icon}
              </Box>
            ))}
          </Grid>
          <Grid
            size={{ xs: 12, md: 3 }}
            sx={{
              display: "flex",
              alignItems: "center",
              fontFamily: "poppins-medium",
              fontSize: 20,
            }}
          >
            <Phone sx={{ mr: 1 }} />
            +91 123 4556 789
          </Grid>
          <Grid
            size={{ xs: 3 }}
            sx={{
              display: "flex",
              alignItems: "center",
              fontFamily: "poppins-medium",
              fontSize: 20,
            }}
          >
            <Email sx={{ mr: 1 }} />
            Support@info.com
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Contact;

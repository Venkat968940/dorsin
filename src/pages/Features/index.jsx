import { ArrowRightAlt, FiberManualRecord } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

const Features = () => {
  const items = [
    "We put a lot of effort in design.",
    "The most important ingredient of successful website.",
    "Sed ut perspiciatis unde omnis iste natus error sit.",
    "Submit Your Organization.",
  ];
  return (
    <Grid
      container
      spacing={2}
      sx={{
        maxWidth: { xs: "90%", lg: 960, xl: 1140 },
        margin: "0 auto",
        py: '80px',
      }}
    >
      <Grid size={{ xs: 12, md: 5 }}>
        <Typography fontSize={24} fontFamily='poppins-medium' mb={4}>
          A digital web design studio creating modern & engaging online
          experiences
        </Typography>
        <Typography fontSize={14} color="textSecondary" mb={2}>
          Separated they live in Bookmarksgrove right at the coast of the
          Semantics, a large language ocean. A small river named Duden flows by
          their place and supplies it with the necessary regelialia.
        </Typography>
        <List>
          {items.map((item, index) => (
            <ListItem key={index} sx={{ paddingLeft: 0 }}>
              <ListItemIcon sx={{ minWidth: 20 }}>
                <FiberManualRecord
                  sx={{ fontSize: 8, color: "primary.main" }}
                />
              </ListItemIcon>
              <ListItemText
                primary={item}
                sx={{
                  "& .MuiListItemText-primary": {
                    fontSize: 15,
                    lineHeight: 1.5,
                    color:'#95A0AB'
                  },
                }}
              />
            </ListItem>
          ))}
        </List>
        <Button variant="contained" endIcon={<ArrowRightAlt />}>Learn More</Button>
      </Grid>
      <Grid size={{ xs: 12, md: 7 }} sx={{ display:"flex", justifyContent:"right"}}>
        <Avatar
          sx={{ width: 500, height: 393 }}
          variant="square"
          src="https://dorsin.angular.themesbrand.com/assets/images/online-world.svg"
        />
      </Grid>
    </Grid>
  );
};

export default Features;

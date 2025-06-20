export default function ComponentOverride(theme) {
  const { primary, common, grey } = theme.palette;
  return {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: "4px",
          textTransform: "capitalize",
          padding: "10px 20px",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "translateY(-10px)",
          },
          "&.MuiButton-contained": {
            backgroundColor: primary.main,
            color: common.white,
            fontFamily: "poppins-medium",
          },
          "&.MuiButton-outlined": {
            backgroundColor: "#fff",
            color: "#000",
            border: `0.4px solid ${grey[500]}`,
            // fontWeight: 600,
            fontSize: 14,
            "&:hover": {
              // backgroundColor: common.white,
              // border: `2px solid ${primary.main}`,
              // color: primary.main,
            },
          },
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        variant: "body1",
      },
      styleOverrides: {
        root: {
          // Default styles for all Typography components
        },
      },
    },
    MuiTextField: {
      defaultProps: {},
      styleOverrides: {
        root: {},
      },
    },
  };
}

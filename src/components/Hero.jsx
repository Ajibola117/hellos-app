import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import hero from "../assets/images/banner5.jpg";

const Hero = () => {
  return (
    <Box
      sx={{
        height: "50vh",
        backgroundImage: `url(${hero})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center",
        objectFit: "cover",
      }}
    >
      {/* <Typography
        variant="h2"
        component="h1"
        sx={{ backgroundColor: "rgba(0, 0, 0, 0.5)", padding: "10px 20px" }}
      >
        Welcome to Play CO
      </Typography> */}
    </Box>
  );
};

export default Hero;

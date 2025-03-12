import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "var(--footer-color)",
        color: "var(--secondary-color)",
        padding: "26px 0",
        marginTop: "20px",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="body1"
            sx={{ textAlign: { xs: "center", sm: "center" } }}
          >
            &copy; {new Date().getFullYear()} Play CO. All rights reserved.
          </Typography>
          {/* <Box
            component="nav"
            sx={{
              display: "flex",
              justifyContent: { xs: "center", sm: "flex-end" },
              marginTop: { xs: "8px", sm: "0" },
            }}
          >
            <Link
              href="/about"
              color="inherit"
              sx={{ marginLeft: { sm: "16px" } }}
            >
              About
            </Link>
            <Link
              href="/contact"
              color="inherit"
              sx={{ marginLeft: { sm: "16px" } }}
            >
              Contact
            </Link>
            <Link
              href="/privacy"
              color="inherit"
              sx={{ marginLeft: { sm: "16px" } }}
            >
              Privacy Policy
            </Link>
          </Box> */}
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

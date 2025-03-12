import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  Divider,
  Toolbar,
  CssBaseline,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ViewCards from "./ViewCards";
import videos from "../../data/videos";

const drawerWidth = 260; // Wider sidebar for better visibility

const AdminDashboard = () => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const categories = ["Comedy", "Action", "Drama"];
  const categoryCounts = categories.map((category) => ({
    category,
    count: videos.filter((video) => video.category === category).length,
  }));

  const drawer = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#121212", // Dark background for contrast
        color: "#fff",
        paddingTop: 2,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          padding: "16px",
          fontWeight: "bold",
          color: "var(--primary-color)", // Highlight color
        }}
      >
        Admin Panel
      </Typography>

      <Divider
        sx={{ backgroundColor: "var(--primary-color)", margin: "8px 20px" }}
      />

      <List>
        {[
          { text: "Visit Site", path: "/" },
          { text: "Dashboard", path: "/admin" },
          { text: "Upload Video", path: "/admin/upload" },
        ].map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            sx={{
              color:
                location.pathname === item.path
                  ? "var(--primary-color)"
                  : "#fff",
              backgroundColor:
                location.pathname === item.path ? "#1E1E1E" : "transparent",
              borderRadius: "8px",
              margin: "8px 12px",
              "&:hover": {
                backgroundColor: "#1E1E1E",
              },
            }}
          >
            <ListItemText primary={item.text} sx={{ textAlign: "center" }} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {isMobile ? (
        <>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ marginLeft: 2, color: "#FF9800" }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              "& .MuiDrawer-paper": {
                width: "80%",
                boxSizing: "border-box",
                backgroundColor: "#121212",
              },
            }}
          >
            {drawer}
          </Drawer>
        </>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#121212",
            },
          }}
        >
          <Toolbar />
          {drawer}
        </Drawer>
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: "#F5F5F5",
          minHeight: "100vh",
        }}
      >
        {location.pathname === "/admin" && <ViewCards />}
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminDashboard;

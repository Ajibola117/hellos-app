import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const AdminAccessModal = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h6">Admin Access Required</Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          You must log in as an admin to access this page.
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 3 }}
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            window.location.href = "/login";
          }}
        >
          Logout & Login as Admin
        </Button>
      </Box>
    </Modal>
  );
};

export default AdminAccessModal;

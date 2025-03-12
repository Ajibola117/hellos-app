import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import MediaDetails from "./pages/MediaDetails";
import AllMediaPage from "./pages/AllMediaPage";
import CategoryPage from "./pages/CategoryPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UploadMediaPage from "./pages/admin/UploadMediaPage";
import Container from "@mui/material/Container";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/admin/*"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        >
          <Route path="upload" element={<UploadMediaPage />} />
        </Route>
        <Route
          path="*"
          element={
            <>
              <Header />
              <Container
                maxWidth="lg"
                sx={{ flexGrow: 1, paddingTop: "16px", paddingBottom: "16px" }}
              >
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/media/:id" element={<MediaDetails />} />
                  <Route path="/medias" element={<AllMediaPage />} />
                  <Route
                    path="/category/:category"
                    element={<CategoryPage />}
                  />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignUpPage />} />
                </Routes>
              </Container>
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

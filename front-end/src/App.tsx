// frontend/src/App.tsx
import * as React from "react";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import ResponsiveDrawer from "./components/responsivedrawer";
import { IInstagramReel } from "../../Back-End/src/models/instagramReel";
import VideoCard from "./components/videocard";
import mockReels from "./mockdata";
import { Grid } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import ForgotPassword from "./components/forgotPassword";
import { Home } from "@mui/icons-material";
import Signup from "./components/signUp";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#FF5733", // Vibrant orange: Evokes excitement, energy, and creativity
    },
    secondary: {
      main: "#2563ec", // Calming blue:  Trust, stability, and professionalism
    },
    background: {
      default: "transparent", // Light grey background: Clean, modern, and easy on the eyes
      paper: "#FFFFFF", // White for content areas: Readability and focus
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
    // Roboto: Modern, clean, and legible
    h6: {
      fontWeight: 600, // Medium weight: Strong, but not overwhelming
    },
    body1: {
      fontSize: "1rem", // Optimal for readability
    },
    body2: {
      fontSize: "0.875rem", // Smaller size for less important details
      color: "#555555", // Dark grey: Subtle contrast for secondary text
    },
  },
  shape: {
    borderRadius: 8, // Slightly rounded corners: Modern aesthetic, feels approachable
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          transition: "box-shadow 0.3s ease", // Smooth transition for hover effect
          "&:hover": {
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Subtle lift on hover
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
          color: "#8c8c8c",
          boxShadow: "none",
        },
      },
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/app" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/"
            element={
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row", // Use "column" if you want to stack them vertically
                  flexWrap: "wrap", // Wrap the items if there are multiple in a row
                  justifyContent: "center", // Center horizontally
                  alignItems: "center", // Center vertically if you have enough height
                  padding: "20px", // Optional: Add padding around the container
                  gap: "20px", // Optional: Add space between the items
                }}
              >
                <ResponsiveDrawer>
                  <Box sx={{ flexGrow: 1, paddingTop: 15 }}>
                    <Grid container spacing={1}>
                      <Grid container item spacing={3}>
                        <Grid container spacing={3}>
                          {(mockReels as IInstagramReel[]).map((reel) => (
                            <Grid item xs={12} sm={6} md={4} key={reel.postId}>
                              <VideoCard video={reel} />
                            </Grid>
                          ))}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                </ResponsiveDrawer>
              </Box>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;

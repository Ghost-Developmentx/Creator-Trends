// frontend/src/App.tsx
import * as React from "react";
import "./App.css";
import Navbar from "./components/navbar";
import VideoCard from "./components/videocard";
import mockReels from "./mockdata";
import {
  Box,
  Container,
  Grid,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import { IInstagramReel } from "../../Back-End/src/models/instagramReel";

// Create a custom Material UI theme
// frontend/src/App.tsx (or create a separate theme.ts file)

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#FF5733", // Vibrant orange: Evokes excitement, energy, and creativity
    },
    secondary: {
      main: "#3498DB", // Calming blue:  Trust, stability, and professionalism
    },
    background: {
      default: "#F8F8F8", // Light grey background: Clean, modern, and easy on the eyes
      paper: "#FFFFFF", // White for content areas: Readability and focus
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif", // Roboto: Modern, clean, and legible
    h6: {
      fontWeight: 500, // Medium weight: Strong, but not overwhelming
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
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <Navbar />

        <Container maxWidth="md">
          <Box>
            <Grid container spacing={2}>
              {(mockReels as IInstagramReel[]).map((reel) => (
                <Grid item xs={12} sm={6} md={4} key={reel.postId}>
                  <VideoCard video={reel} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;

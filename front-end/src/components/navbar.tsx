import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Divider,
} from "@mui/material";
import React from "react";

/**
 * React functional component for displaying a navigation bar.
 * @returns {React.ReactElement} The rendered React element.
 */
const Navbar: React.FC = (): React.ReactElement => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1, marginLeft: 3 }}>
          <Typography variant="h6" component="div">
            Creator Trends
          </Typography>
        </Box>
        <Button color="inherit">Login</Button>
        <Button color="inherit" sx={{ marginRight: 3 }}>
          Register
        </Button>
      </Toolbar>
      <Divider variant="middle" aria-hidden="true" />
    </AppBar>
  );
};

export default Navbar;

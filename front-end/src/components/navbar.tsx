import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Box,
  Button,
  Divider,
  Badge,
  Avatar,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import {
  Search as SearchIcon,
  NotificationsNoneSharp as NotificationsIcon,
  KeyboardArrowDown as ArrowDownIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import logo from "../assets/ghost.png";

/**
 * React functional component for displaying a navigation bar.
 * @returns {React.ReactElement} The rendered React element.
 */
const Navbar: React.FC = (): React.ReactElement => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            marginLeft: 3,
            backgroundColor: "rgba(0, 0, 0, 0.015)",
            borderRadius: 1.6,
            padding: "4px 8px",
            maxWidth: "20%",
            border: "1px solid rgba(0, 0, 0, 0.2)",
            transition: "border-color 0.2s ease-in-out",
            "&:hover": {
              borderColor: "rgba(0, 0, 0, 0.4)",
            },
          }}
        >
          <IconButton sx={{ color: "rgba(0, 0, 0, 0.4)", marginRight: 1 }}>
            <SearchIcon />
          </IconButton>
          <InputBase
            placeholder="Search Trending Videos..."
            sx={{
              flexGrow: 1,
              color: "#111828",
              "& .MuiInputBase-input": {
                padding: "6px",
              },
            }}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", marginLeft: "auto" }}>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              ml: 2,
              cursor: "pointer",
              position: "relative",
            }}
            onClick={toggleDrawer}
          >
            <Avatar alt="User Profile" src={logo} />
            <Box sx={{ ml: 1, mr: 5 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  variant="subtitle1"
                  component="div"
                  fontWeight="bold"
                  color="black"
                >
                  Thomas Bernier
                </Typography>
                <ArrowDownIcon sx={{ ml: 0.5 }} />
              </Box>
              <Typography
                variant="body2"
                color="textSecondary"
                fontWeight="bold"
              >
                Creator Trends
              </Typography>
            </Box>
            {/* Drawer */}
            <Drawer
              anchor="right"
              open={isDrawerOpen}
              onClose={toggleDrawer}
              PaperProps={{
                sx: {
                  width: "auto",
                  minWidth: "200px",
                  maxWidth: "300px",
                  mt: "64px", // Adjust this value based on the height of your navbar
                  borderTopLeftRadius: "16px",
                  borderBottomLeftRadius: "16px",
                },
              }}
            >
              <List>
                <ListItemButton>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Account Settings" />
                </ListItemButton>
                <ListItemButton>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary="Profile Settings" />
                </ListItemButton>
              </List>
            </Drawer>
          </Box>
        </Box>
      </Toolbar>
      <Divider variant="middle" aria-hidden="true" />
    </AppBar>
  );
};

export default Navbar;

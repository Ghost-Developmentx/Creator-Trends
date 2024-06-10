import * as React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import { Box, Button } from "@mui/material";
import logo from "../assets/logo.png";

// Import your icons here (e.g., HomeIcon, CategoryIcon, SearchIcon, etc.)

export interface SidebarProps {
  drawerWidth?: number;
}

const Sidebar: React.FC<SidebarProps> = ({ drawerWidth }: SidebarProps) => {
  // ... (state and other logic will be added later)
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        backgroundColor: "lightgrey",
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#f3f4f6",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 1,
        }}
      >
        <img
          src={logo}
          alt="Creator Trends Logo"
          style={{ width: "100%", height: "auto" }}
        />
        <Button
          variant="contained"
          color="secondary"
          sx={{
            width: "100%",
            height: "45px",
            paddingTop: "3",
            borderRadius: 1.4,
            boxShadow: 0,
          }}
        >
          Discover Trends
        </Button>
      </Box>
      <List>
        <ListItem sx={{ borderRadius: 2 }}>
          <ListItemButton component="a" href="#">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;

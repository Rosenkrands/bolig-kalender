import axios from "axios";
import { UserContext } from "../Components/AuthorizeView.tsx";
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Stack,
  Menu,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";

import Copyright from "../Components/Copyright.tsx";
import { useNavigate } from "react-router";
import { ReactNode, useContext, useState } from "react";
import ThemeSelector from "./ThemeSelector.tsx";

const drawerWidth = 240;

export default function AppPage({
  children,
}: Readonly<{ children: ReactNode }>) {
  // helpers
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("md")
  );

  // states
  const user = useContext(UserContext);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // functions
  const handleAvatarClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAvatarClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `/api/logout`,
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        navigate("/signin");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("An error occurred during logout", error);
    }
  };

  const handleNavigateHome = () => {
    navigate("/");
  };

  return (
    <Box display={"flex"}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <MenuIcon
            onClick={() => setDrawerOpen(!drawerOpen)}
            sx={{ cursor: "pointer" }}
          />
          <Box
            sx={{ flexGrow: 1, cursor: "pointer", ml: 2 }}
            onClick={() => handleNavigateHome()}
          >
            <Stack direction="row" spacing={1} sx={{ flexGrow: 1 }}>
              <img
                src="sample-app-logo.svg"
                alt="sample app logo"
                height="30px"
              />
              <Typography variant="h6" component="div" noWrap>
                <strong>Sample App</strong>
              </Typography>
            </Stack>
          </Box>
          <ThemeSelector />
          <Avatar
            onClick={(e) => handleAvatarClick(e)}
            sx={{ bgcolor: "primary.main", ml: 2, cursor: "pointer" }}
          >
            {user?.email.charAt(0).toUpperCase()}
          </Avatar>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleAvatarClose}
          >
            <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
          </Menu>
          {!isSmallScreen && (
            <Stack direction={"column"}>
              <Typography variant="body1" component="div" noWrap sx={{ ml: 2 }}>
                {
                  // Display the first part of the email before the '@' symbol
                  // and capitalize the first letter
                  user?.email
                    .split("@")[0]
                    ?.replace(/^./, (char) => char.toUpperCase()) || "Error"
                }
              </Typography>
              <Typography variant="body2" component="div" noWrap sx={{ ml: 2 }}>
                {user?.email || "Error"}
              </Typography>
            </Stack>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        anchor="top"
        open={drawerOpen}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {[{ title: "Home", path: "/", icon: <HomeIcon /> }].map((obj) => (
              <ListItem
                key={obj.title}
                disablePadding
                onClick={() => navigate(obj.path)}
              >
                <ListItemButton>
                  <ListItemIcon>{obj.icon}</ListItemIcon>
                  <ListItemText primary={obj.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {[{ title: "Page 1", path: "/page1", icon: <DashboardIcon /> }].map(
              (obj) => (
                <ListItem
                  key={obj.title}
                  disablePadding
                  onClick={() => navigate(obj.path)}
                >
                  <ListItemButton>
                    <ListItemIcon>{obj.icon}</ListItemIcon>
                    <ListItemText primary={obj.title} />
                  </ListItemButton>
                </ListItem>
              )
            )}
          </List>
          <Divider />
          <List>
            {[
              {
                title: "Account",
                path: "/account",
                icon: <AccountCircleIcon />,
              },
            ].map((obj) => (
              <ListItem
                key={obj.title}
                disablePadding
                onClick={() => navigate(obj.path)}
              >
                <ListItemButton>
                  <ListItemIcon>{obj.icon}</ListItemIcon>
                  <ListItemText primary={obj.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Copyright />
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

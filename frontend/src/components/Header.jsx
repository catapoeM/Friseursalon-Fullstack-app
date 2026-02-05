import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Stack
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Link } from "react-router-dom";
import { useState } from "react";
import useStore from '../hooks/useStore'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LogoutIcon from '@mui/icons-material/Logout';

const navItems = [
  { label: "Home", path: "/" },
  { label: "Termin", path: "/stylists" },
  { label: "Preise", path: "/preise" },
  { label: "Produkte", path: "/produkte" },
  { label: "Kontakt", path: "/kontakt" }
];

const Header = () => {
  const {loggedinAdmin, adminLogout} = useStore((state) => state);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {/* Hamburger Icon (mobile only) */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleDrawer}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
                    {/* Logo / Title */}
          {loggedinAdmin ?
            <>
              <AdminPanelSettingsIcon fontSize="large"/>
              <Box sx={{flexGrow: 1}}>
                <Typography variant="h6"
                  component={Link}
                  to="/admindashboard" sx={{ flexGrow: 1,  textDecoration: "none", color: "inherit", display: "inline-block" }}
                >
                  Friseur Salon
                </Typography>
              </Box>
              <Stack 
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                alignItems="center"
              >
                <Button
                  component={Link}
                  color="inherit"
                  startIcon={<PersonAddIcon/>}
                  to='/createstylist'
                >
                  Create Stylist
                </Button>
              </Stack>
            </>
          : <Box sx={{flexGrow: 1}}>
              <Typography variant="h6"
                component={Link}
                to="/" sx={{ flexGrow: 1,  textDecoration: "none", color: "inherit", display: "inline-block" }}
              >
                Friseur Salon
              </Typography>
            </Box>
          }
          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                color="inherit"
                component={Link}
                to={item.path}
              >
                {item.label}
              </Button>
            ))}
            {loggedinAdmin && (
              <Button
                component={Link}
                color="inherit"
                startIcon={<LogoutIcon/>}
                onClick={() => {adminLogout()}}
              >
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={toggleDrawer}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        <Box sx={{ width: 250 }} onClick={toggleDrawer}>
          <List>
            {navItems.map((item) => (
              <ListItem key={item.path} disablePadding>
                <ListItemButton component={Link} to={item.path}>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
            {loggedinAdmin && (
              <Button
                component={Link}
                color="inherit"
                startIcon={<LogoutIcon/>}
                onClick={() => {adminLogout()}}
              >
                Logout
              </Button>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default Header;

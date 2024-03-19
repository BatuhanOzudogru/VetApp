import { Link } from "react-router-dom";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import PetsIcon from '@mui/icons-material/Pets';

// Array containing page names and their corresponding paths
const pages = [
  { name: "Customer", path: "/customer" },
  { name: "Animal", path: "/animal" },
  { name: "Doctor", path: "/doctor" },
  { name: "Appointment", path: "/appointment" },
  { name: "Report", path: "/report"},
  { name: "Vaccine", path: "/vaccine"}
];

// Array containing user settings options
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  // Handlers for opening navigation menu and user menu
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  // Handlers for closing navigation menu and user menu
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar className="menu" position="static" sx={{ bgcolor: '#D83F31' }} >
      <Container maxWidth="xl">
        <Toolbar disableGutters>

           {/* Icon and text displayed on medium-sized screens */}
          <PetsIcon sx={{ display: { xs: "none", md: "flex" }, mr:1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            VetClinic
          </Typography>

           {/* Box displayed on small-sized screens */}
          <Box  sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton >
              
            {/* Responsive menu for small-sized screens */}
            <Menu 
              className="menu-responsive"
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Link  to={page.path} sx={{textDecoration:'none'}}>{page.name}   </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Icon and text displayed on small-sized screens */}
          <PetsIcon sx={{ display: { xs: "flex", md: "none" }, mr:1 }} />
          <Typography 
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none" ,
            }}
          >
            VetClinic
          </Typography>

          {/* Box displayed on medium-sized screens */}
          <Box className="menu-box" sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{                 
                  my: 2,
                  color: "white",
                  display: "block",                                           
                }}
              >
                <Link 
                to={page.path}
                >{page.name}
                </Link>
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;

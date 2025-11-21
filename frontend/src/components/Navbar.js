import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isMobile = useMediaQuery('(max-width:1000px)');

  const isActive = path => currentPath === path;

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();
    const interval = setInterval(checkLoginStatus, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const drawerContent = (
    <Box
      id="navbar-mobile-drawer"
      sx={{ width: 250, backgroundColor: '#3f51b5', height: '100%', color: 'white' }}
      role="presentation"
    >
      <List>

        <ListItem
          id="navbar-mobile-home"
          button
          component={Link}
          to="/"
          selected={isActive('/')}
          onClick={handleDrawerToggle}
        >
          <ListItemText primary="Home" sx={{ color: isActive('/') ? '#ff9800' : 'white' }} />
        </ListItem>

        <ListItem
          id="navbar-mobile-dashboard"
          button
          component={Link}
          to="/dashboard"
          selected={isActive('/dashboard')}
          onClick={handleDrawerToggle}
        >
          <ListItemText primary="Dashboard" sx={{ color: isActive('/dashboard') ? '#ff9800' : 'white' }} />
        </ListItem>

        <ListItem
          id="navbar-mobile-employees"
          button
          component={Link}
          to="/employees"
          selected={isActive('/employees')}
          onClick={handleDrawerToggle}
        >
          <ListItemText primary="Employees" sx={{ color: isActive('/employees') ? '#ff9800' : 'white' }} />
        </ListItem>

        <ListItem
          id="navbar-mobile-departments"
          button
          component={Link}
          to="/departments"
          selected={isActive('/departments')}
          onClick={handleDrawerToggle}
        >
          <ListItemText primary="Departments" sx={{ color: isActive('/departments') ? '#ff9800' : 'white' }} />
        </ListItem>

        <ListItem
          id="navbar-mobile-profile"
          button
          component={Link}
          to="/profile"
          selected={isActive('/profile')}
          onClick={handleDrawerToggle}
        >
          <ListItemText primary="Profile" sx={{ color: isActive('/profile') ? '#ff9800' : 'white' }} />
        </ListItem>

        <ListItem
          id="navbar-mobile-login-or-logout"
          button
          component={Link}
          to="/login"
          selected={isActive('/login')}
          onClick={isLoggedIn ? handleLogout : handleDrawerToggle}
        >
          <ListItemText
            primary={isLoggedIn ? 'Logout' : 'Login'}
            sx={{ color: isLoggedIn ? 'red' : isActive('/login') ? '#ff9800' : 'white' }}
          />
        </ListItem>

        <ListItem
          id="navbar-mobile-register"
          button
          component={Link}
          to="/register"
          selected={isActive('/register')}
          onClick={handleDrawerToggle}
        >
          <ListItemText primary="Register" sx={{ color: isActive('/register') ? '#ff9800' : 'white' }} />
        </ListItem>

      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        id="navbar-container"
        position="static"
        sx={{ backgroundColor: '#3f51b5', padding: '0.5rem 0' }}
      >
        <Toolbar>

          {/* Brand Logo */}
          <Typography
            id="navbar-brand"
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'white',
              fontSize: '1.5rem',
              fontWeight: 600,
            }}
          >
            Employee Management System
          </Typography>

          {/* MOBILE NAV BUTTON */}
          {isMobile ? (
            <IconButton
              id="navbar-mobile-menu-btn"
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box id="navbar-desktop-menu" sx={{ display: 'flex', gap: '1rem' }}>

              <Button
                id="navbar-home"
                component={Link}
                to="/"
                sx={{ color: isActive('/') ? '#ff9800' : 'white' }}
              >
                Home
              </Button>

              <Button
                id="navbar-dashboard"
                component={Link}
                to="/dashboard"
                sx={{ color: isActive('/dashboard') ? '#ff9800' : 'white' }}
              >
                Dashboard
              </Button>

              <Button
                id="navbar-employees"
                component={Link}
                to="/employees"
                sx={{ color: isActive('/employees') ? '#ff9800' : 'white' }}
              >
                Employees
              </Button>

              <Button
                id="navbar-departments"
                component={Link}
                to="/departments"
                sx={{ color: isActive('/departments') ? '#ff9800' : 'white' }}
              >
                Departments
              </Button>

              <Button
                id="navbar-profile"
                component={Link}
                to="/profile"
                sx={{ color: isActive('/profile') ? '#ff9800' : 'white' }}
              >
                Profile
              </Button>

              {isLoggedIn ? (
                <Button
                  id="navbar-logout"
                  onClick={handleLogout}
                  sx={{ color: 'red' }}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  id="navbar-login"
                  component={Link}
                  to="/login"
                  sx={{ color: isActive('/login') ? '#ff9800' : 'white' }}
                >
                  Login
                </Button>
              )}

              <Button
                id="navbar-register"
                component={Link}
                to="/register"
                sx={{ color: isActive('/register') ? '#ff9800' : 'white' }}
              >
                Register
              </Button>

            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile */}
      <Drawer
        id="navbar-drawer"
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Navbar;

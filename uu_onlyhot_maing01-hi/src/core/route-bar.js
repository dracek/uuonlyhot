import React from 'react';
import { useRoute } from "uu5g05";
import { Link } from 'uu5g05-elements';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import { purple, black } from '@mui/material/colors';


const pages = ['Home', 'About', 'Sensor',];

const ResponsiveAppBar = () => {
  const [, setRoute] = useRoute();
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const navigateTo = (page) => {
    const route = page.toLowerCase(); 
    setRoute(route);
    handleCloseNavMenu();
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'transparent',  width: '80%',boxShadow: 'none', 
    border: 0}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <DeviceThermostatIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: '#2E0F15'}} />
          <Link href="home">
            <Typography
                variant="h6"
                noWrap                
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'transparent', 
                  textDecoration: 'none',
                  backgroundImage: 'linear-gradient(150deg, #2E0F15, #F3ECFB)', 
                  WebkitBackgroundClip: 'text', 
                  backgroundClip: 'text', 
                }}
              >
                ONLY HOT ||
              </Typography>
            </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color= "#2E0F15"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => navigateTo(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => navigateTo(page)}
                sx={{ my: 2, color: '#3B2E4D', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;

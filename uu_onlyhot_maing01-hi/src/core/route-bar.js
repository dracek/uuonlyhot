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

const pages = ['Home', 'About', 'Sensor'];

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
    <AppBar position="static" sx={{ backgroundColor: 'transparent',  width: '80%', boxShadow: 'none', border: 0 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <DeviceThermostatIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: '#BA00AD', fontSize: '30px' }} />
          <Link href="home">
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 900,
                fontSize: '30px',
                letterSpacing: '.5rem',
                color: 'transparent',
                textDecoration: 'none',
                backgroundImage: 'linear-gradient(150deg, #E50099, #F7FF00)',
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
              aria-label="open navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: '#00FFE5' }}
            >
              <MenuIcon sx={{ color: '#E50099' }} />
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
                display: { xs: 'block', md: 'none' },
                '& .MuiPaper-root': {
                  backgroundColor: 'rgba(232, 5, 153, 0.9)', // Semi-transparent pink
                  color: '#FFFFFF', // White text color
                },
                '& .MuiMenuItem-root': {
                  '&:hover': {
                    backgroundColor: 'rgba(247, 255, 0, 0.7)', // Yellow hover color
                  },
                },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => navigateTo(page)}>
                  <Typography textAlign="center" sx={{ color: '#FFFFFF' }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <DeviceThermostatIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, color: '#BA00AD', fontSize: '30px' }} />
          <Link href="home">
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'transparent',
                textDecoration: 'none',
                backgroundImage: 'linear-gradient(150deg, #E50099, #F7FF00)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
              }}
            >
              ONLY HOT ||
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => navigateTo(page)}
                sx={{ my: 2, color: '#E50099', display: 'block', fontSize:'17px' }}
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

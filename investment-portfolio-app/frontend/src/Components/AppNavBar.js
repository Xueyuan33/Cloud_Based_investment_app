import { CssBaseline, Drawer, ThemeProvider, createTheme } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


function AddProductDropDown() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    return (
      <div>
          <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              id="demo-positioned-button"
              aria-controls={open ? 'demo-positioned-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
          >
          <AddIcon />
          </IconButton>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <MenuItem 
              href="/addstock"
              component="a" 
              onClick={handleClose}>
                  Stock
          </MenuItem>
          <MenuItem 
              href="/addfuture"
              component="a" 
              onClick={handleClose}>
                  Future
          </MenuItem>
          <MenuItem 
              href="/addcd"
              component="a" 
              onClick={handleClose}>
                  CD
          </MenuItem>
        </Menu>
      </div>
    );
  };

export default function AppNavBar() {
    return (
        <Box dx = {{ display: "flex" }}>
        <CssBaseline />
        
        <AppBar position="static">
            <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                href="/"
                sx={{ mr: 2 }}
            >
                <HomeIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Investment Portfolio App
            </Typography>
            {/* Dropdown for adding new investmenr products */}
            <AddProductDropDown />
            </Toolbar>
        </AppBar>

    </Box>
    )
}
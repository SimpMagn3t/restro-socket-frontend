import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Navbar = () => {
  const navigate = useNavigate();
  const { tableNumber } = useSelector((state) => state.allCart);

  const navigateToHome = () => {
    if (tableNumber) {
      navigate(`/${tableNumber}`);
    } else {
      console.error('Table number is not available');
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" onClick={navigateToHome}>
          Home
        </Button>
        <Button color="inherit" component={RouterLink} to="/cart">
          Cart
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, Typography, Grid, Snackbar, Button } from '@mui/material';
import { io } from 'socket.io-client';

const Admin = () => {
  const [orders, setOrders] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  // const socket = useMemo(() => io('http://localhost:5000'), []);
  const socket = useMemo(() => io('https://restro.azurewebsites.net/'), []);

  useEffect(() => {
    socket.on('connect', () => {
      console.log(`connected ${socket.id}`);
    });
    socket.on('newOr', (o) => handleNewOrder(o.tableNumber));

    const fetchOrders = async () => {
      try {
        // const ord = await axios.get('http://localhost:5000/admin');
        const ord = await axios.get('https://restro.azurewebsites.net/admin');
        setOrders(ord.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchOrders();
  }, [socket]);

  const handleNewOrder = (tableNumber) => {
    setSnackbarMessage(`New order from table ${tableNumber}`);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    // Reload the page
    window.location.reload();
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '20px' }}>
      {orders.length === 0 ? (
        <Typography variant="h5">No orders available</Typography>
      ) : (
        <>
          {orders.map((order, index) => (
            <OrderCard key={index} tableNumber={order.tableNumber} foodItems={order.foodItems} />
          )).reverse()}
        </>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={null}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        action={
          <Button color="secondary" size="small" onClick={handleSnackbarClose}>
            CLOSE
          </Button>
        }
        style={{top: '10%', transform: 'translateY(-30%)', left: '50%', transform: 'translateX(-50%)' }}
      />
    </div>
  );
};

const FoodCard = ({ food }) => (
  <Card style={{ margin: '8px', padding: '8px', width: '80%', backgroundColor: '#ECEFF1' }}>
    <Typography variant="h6">{food.name}</Typography>
    <Typography variant="body2">Quantity: {food.quantity}</Typography>
  </Card>
);

const OrderCard = ({ foodItems, tableNumber }) => (
  <Card elevation={2} style={{ margin: '16px', padding: '16px', width: '300px' }}>
    <Typography variant="h5">Table No: {tableNumber}</Typography>
    <Grid container spacing={2} style={{ marginTop: '10px' }}>
      {foodItems.map((food) => (
        <Grid item xs={12} key={food.name}>
          <FoodCard food={food} />
        </Grid>
      ))}
    </Grid>
  </Card>
);

export default Admin;

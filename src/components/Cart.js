import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardContent, CardMedia, Button, Typography } from '@mui/material';
import { io } from 'socket.io-client';
import axios from 'axios';
import { addTable, addToCart } from '../features/CartSlice';
import emptyCartGif from '../assets/empty.gif';
import orderPlacedGif from '../assets/placed.gif';

const Cart = () => {
  const dispatch = useDispatch();
  const { cart, tableNumber } = useSelector((state) => state.allCart);
  // const socket = useMemo(() => io('http://localhost:5000'), []);
  const socket = useMemo(() => io('https://restro.azurewebsites.net/'), []);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    console.log('effect');
    socket.on('connect', () => {
      console.log(socket.id);
    });
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const placeOrder = async () => {
    const order = {
      tableNumber,
      cart,
    };
    try {
      // await axios.post('http://localhost:5000/user', order);
      await axios.post('https://restro.azurewebsites.net/user', order);
      socket.emit('newOrder', order);
      setOrderPlaced(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', padding: '20px' }}>
      {cart.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          {orderPlaced ? (
            <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
              <Typography variant="h5" style={{ margin: '20px' }}>Order Placed Successfully</Typography>
              <img src={orderPlacedGif} alt="Order Placed" style={{ width: '500px' }} />
            </div>
          ) : (
            <>
              {cart.map((item) => (
                <CartCard key={item.id} item={item} dispatch={dispatch} />
              ))}
              <div style={{ flex: 1, marginLeft: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <div className="cart-misc" style={{ padding: '20px' }}>
                    <div className="table"></div>
                    <div className="cart-total">
                      <Typography mt={3} mb={5} variant="h3">
                        Total Amount: ${calculateTotalAmount()}
                      </Typography>
                      <Button variant="contained" color="primary" onClick={placeOrder}>
                        Place Order
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );  
};

const CartCard = ({ item, dispatch }) => (
  <Card style={{ width: '300px', margin: '20px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '12px' }}>
    <CardMedia component="img" height="140" image={item.image} alt={item.name} style={{ borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }} />
    <CardContent style={{ padding: '16px' }}>
      <Typography variant="h5" component="div" style={{ marginBottom: '8px' }}>
        {item.name}
      </Typography>
      <Typography variant="body2" color="text.secondary" style={{ marginBottom: '12px' }}>
        Quantity: {item.quantity}
      </Typography>
      <Typography variant="body2" color="text.secondary" style={{ marginBottom: '12px' }}>
        Total: ${item.price * item.quantity}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => dispatch(addToCart(item))}
        style={{ width: '100%', borderRadius: '8px' }}
      >
        Add to Cart
      </Button>
    </CardContent>
  </Card>
);

const EmptyCart = () => (
  <div style={{ textAlign: 'center', marginTop: '50px' }}>
    <Typography variant="h5">Your cart is empty</Typography>
    <img src={emptyCartGif} alt="Empty Cart" style={{ marginTop: '20px' }} />
  </div>
);

export default Cart;

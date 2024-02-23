import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart, addTable } from '../features/CartSlice';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Home = () => {
  const dispatch = useDispatch();
  const { tableNumber } = useParams();
  dispatch(addTable(tableNumber));
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get(`http://localhost:5000/user`);
        const response = await axios.get(`https://restro.azurewebsites.net/user`);
        setMenu(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ backgroundColor: '#ECEFF1', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', padding: '20px' }}>
      {menu.map((item) => (
        <MenuCard
          key={item._id}
          name={item.name}
          price={item.price}
          image={item.image}
          dispatch={dispatch}
          item={item}
        />
      ))}
    </div>
  );
};

const MenuCard = ({ name, price, image, dispatch, item }) => (
  <Card style={{ width: '300px', margin: '20px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '12px' }}>
    <CardMedia component="img" height="140" image={image} alt={name} style={{ borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }} />
    <CardContent style={{ padding: '16px' }}>
      <Typography variant="h5" component="div" style={{ marginBottom: '8px' }}>
        {name}
      </Typography>
      <Typography variant="body2" color="text.secondary" style={{ marginBottom: '12px' }}>
        Price: ${price}
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

export default Home;

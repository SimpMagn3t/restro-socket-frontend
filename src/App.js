import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import Admin from './components/Admin';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50', // Soft green color for primary
    },
    secondary: {
      main: '#FF9800', // Soft orange color for secondary
    },
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/:tableNumber' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/admin' element={<Admin />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

import { useContext } from 'react';
import { Box } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import { UserContext } from './contexts/userContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Enter from './components/Enter';

const App = () => {
  const { user } = useContext(UserContext);
  const { pathname } = useLocation();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header />
      <Box component="main" sx={{ flex: 1 }}>
        {!user && pathname === '/' && <Enter />}
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default App;

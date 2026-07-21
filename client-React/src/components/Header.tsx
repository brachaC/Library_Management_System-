import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/userContext';
import {
  AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem,
} from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from 'react';

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleLogout = () => {
    setUser(null as any);
    setAnchorEl(null);
    navigate('/');
  };

  return (
    <AppBar position="sticky" color="inherit" sx={{ bgcolor: 'white', borderBottom: '1px solid', borderColor: 'divider' }}>
      <Toolbar sx={{ maxWidth: 1200, width: '100%', mx: 'auto' }}>
        <MenuBookIcon sx={{ color: 'primary.main', fontSize: 32, mr: 1 }} />
        <Typography variant="h5" sx={{ fontWeight: 800, color: 'primary.main', flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/')}>
          Boutique Library
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          {!user ? (
            <>
              <Button component={Link} to="/Login" variant="outlined" color="primary">התחברות</Button>
              <Button component={Link} to="/SignUp" variant="contained" color="primary">הרשמה</Button>
            </>
          ) : (
            <>
              <Button component={Link} to="/Home" color="primary">דף הבית</Button>
              <Button component={Link} to="/BooksDisplay" color="primary">ספרים</Button>
              {!user.status && (
                <Button component={Link} to="/ShowMyLends" color="primary">השאלות שלי</Button>
              )}
              {user.status && (
                <Button component={Link} to="/Admin" variant="outlined" color="primary">ניהול</Button>
              )}
              <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                <AccountCircleIcon sx={{ color: 'primary.main' }} />
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                <MenuItem disabled>
                  {user.firstName} {user.lastName}
                </MenuItem>
                <MenuItem onClick={handleLogout}>התנתקות</MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

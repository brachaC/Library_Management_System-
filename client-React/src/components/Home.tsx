import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/userContext';
import { Box, Container, Typography, Button, Stack, Paper } from '@mui/material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AdminIcon from '@mui/icons-material/AdminPanelSettings';
import image from '../image/library-singapore.jpg';

const Home = () => {
  const { user } = useContext(UserContext);

  return (
    <Box>
      <Box sx={{
        background: `linear-gradient(rgba(13,115,119,0.85), rgba(13,115,119,0.9)), url(${image})`,
        backgroundSize: 'cover', backgroundPosition: 'center', py: 10, textAlign: 'center', color: 'white',
      }}>
        <Container maxWidth="md">
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>ברוך הבא, {user?.firstName} {user?.lastName}!</Typography>
          <Typography variant="h6" sx={{ fontWeight: 400, opacity: 0.9 }}>אנחנו שמחים לראות אותך שוב בספריית הבוטיק</Typography>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: 6 }}>
        <Stack spacing={3}>
          <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2, transition: '0.2s', '&:hover': { boxShadow: 4 } }}>
            <LibraryBooksIcon sx={{ fontSize: 48, color: 'primary.main' }} />
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" fontWeight={700}>עיין בספרים</Typography>
              <Typography color="text.secondary">דפדף במגוון הספרים שלנו ומצא את הספר הבא שלך</Typography>
            </Box>
            <Button component={Link} to="/BooksDisplay" variant="contained">לספרים</Button>
          </Paper>
          {!user?.status && (
            <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2, transition: '0.2s', '&:hover': { boxShadow: 4 } }}>
              <BookmarkIcon sx={{ fontSize: 48, color: 'primary.main' }} />
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" fontWeight={700}>ההשאלות שלי</Typography>
                <Typography color="text.secondary">צפה בכל הספרים שהשאלת ומעקב אחר החזרות</Typography>
              </Box>
              <Button component={Link} to="/ShowMyLends" variant="contained">להשאלות</Button>
            </Paper>
          )}
          {user?.status && (
            <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2, transition: '0.2s', '&:hover': { boxShadow: 4 } }}>
              <AdminIcon sx={{ fontSize: 48, color: 'primary.main' }} />
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" fontWeight={700}>פאנל ניהול</Typography>
                <Typography color="text.secondary">נהל ספרים, משתמשים והרשאות במערכת</Typography>
              </Box>
              <Button component={Link} to="/Admin" variant="contained">לניהול</Button>
            </Paper>
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default Home;

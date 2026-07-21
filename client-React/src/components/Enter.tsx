import { Box, Typography, Container, Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

const Enter = () => (
  <Box sx={{
    background: 'linear-gradient(135deg, #0d7377 0%, #149aa3 50%, #2db8c4 100%)',
    minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
  }}>
    <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
      <LibraryBooksIcon sx={{ fontSize: 80, mb: 2 }} />
      <Typography variant="h3" fontWeight={800} mb={1}>Boutique Library</Typography>
      <Typography variant="h6" sx={{ opacity: 0.9, mb: 4 }}>הספרייה הביתית שלך — השאל, קרא, גלה</Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
        <Button component={Link} to="/Login" variant="contained" size="large"
          sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: '#e0e0e0' } }}>
          התחבר
        </Button>
        <Button component={Link} to="/SignUp" variant="outlined" size="large"
          sx={{ borderColor: 'white', color: 'white', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}>
          הרשם עכשיו
        </Button>
      </Stack>
    </Container>
  </Box>
);

export default Enter;

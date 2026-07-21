import { Box, Typography, Container } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const Footer = () => (
  <Box component="footer" sx={{ bgcolor: 'secondary.main', color: 'white', py: 4, mt: 'auto' }}>
    <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
      <MenuBookIcon sx={{ fontSize: 36, mb: 1 }} />
      <Typography variant="h6" sx={{ fontWeight: 700 }}>Boutique Library</Typography>
      <Typography variant="body2" sx={{ mt: 1, opacity: 0.7 }}>
        הספרייה הביתית שלך — מערכת ניהול ספרים, השאלות וקהילה
      </Typography>
      <Typography variant="caption" sx={{ mt: 2, display: 'block', opacity: 0.5 }}>
        © {new Date().getFullYear()} Boutique Library. כל הזכויות שמורות.
      </Typography>
    </Container>
  </Box>
);
export default Footer;

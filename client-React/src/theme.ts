import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#0d7377', light: '#149aa3', dark: '#095557' },
    secondary: { main: '#323232', light: '#555', dark: '#1a1a1a' },
    background: { default: '#f5f7fa', paper: '#ffffff' },
    text: { primary: '#1a1a2e', secondary: '#555' },
  },
  typography: {
    fontFamily: '"Assistant", "Rubik", "Segoe UI", sans-serif',
    h3: { fontWeight: 700, letterSpacing: -0.5 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
          padding: '10px 24px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
        },
      },
    },
  },
});

export default theme;

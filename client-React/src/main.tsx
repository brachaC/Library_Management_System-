import { ThemeProvider, CssBaseline } from '@mui/material';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import routes from './routes';
import theme from './theme';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <RouterProvider router={routes} />
  </ThemeProvider>,
);

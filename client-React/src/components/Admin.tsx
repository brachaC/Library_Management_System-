import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  Box, Container, Typography, Tabs, Tab, Paper,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PeopleIcon from '@mui/icons-material/People';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const tabs = [
  { path: '/Admin/AddNewBook', label: 'הוספת ספר', icon: <AddIcon /> },
  { path: '/Admin/UsersDisplay', label: 'משתמשים', icon: <PeopleIcon /> },
  { path: '/Admin/AddNewAdmin', label: 'הוספת מנהל', icon: <AdminPanelSettingsIcon /> },
];

const Admin = () => {
  const location = useLocation();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.main', mb: 1 }}>
        ⚙️ פאנל ניהול
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        ניהול ספרים, משתמשים והרשאות במערכת
      </Typography>

      <Paper sx={{ mb: 4 }}>
        <Tabs
          value={tabs.findIndex((t) => location.pathname === t.path) > -1 ? location.pathname : false}
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.path}
              component={Link}
              to={tab.path}
              label={tab.label}
              icon={tab.icon}
              iconPosition="start"
              sx={{ fontWeight: 600 }}
            />
          ))}
        </Tabs>
      </Paper>

      <Outlet />
    </Container>
  );
};

export default Admin;

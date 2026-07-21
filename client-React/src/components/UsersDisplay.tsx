import { useEffect, useState, useCallback } from 'react';
import type { User } from '../models/Users';
import { getUsers, deleteUser, updateUser } from '../server/api';
import {
  Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button,
  Chip, Snackbar, Alert, Switch, FormControlLabel,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const UsersDisplay = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selected, setSelected] = useState<User | null>(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [snack, setSnack] = useState({ open: false, msg: '', severity: 'success' as 'success' | 'error' });

  const loadUsers = useCallback(async () => {
    try {
      const res = await getUsers();
      setUsers(res.data || []);
    } catch { setSnack({ open: true, msg: 'שגיאה בטעינת משתמשים', severity: 'error' }); }
  }, []);

  useEffect(() => { loadUsers(); }, [loadUsers]);

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      setSnack({ open: true, msg: 'המשתמש נמחק', severity: 'success' });
    } catch { setSnack({ open: true, msg: 'שגיאה במחיקת משתמש', severity: 'error' }); }
  };

  const handleEdit = (u: User) => { setSelected({ ...u }); setOpenEdit(true); };

  const handleSave = async () => {
    if (!selected) return;
    try {
      await updateUser(selected.id, selected);
      setUsers((prev) => prev.map((u) => (u.id === selected.id ? selected : u)));
      setOpenEdit(false);
      setSnack({ open: true, msg: 'המשתמש עודכן', severity: 'success' });
    } catch { setSnack({ open: true, msg: 'שגיאה בעדכון משתמש', severity: 'error' }); }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.main', mb: 3 }}>👥 ניהול משתמשים</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>שם</TableCell><TableCell>שם משתמש</TableCell><TableCell>ת.ז</TableCell>
              <TableCell>טלפון</TableCell><TableCell>מייל</TableCell><TableCell>תפקיד</TableCell><TableCell>פעולות</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id}>
                <TableCell>{u.firstName} {u.lastName}</TableCell>
                <TableCell>{u.userName}</TableCell>
                <TableCell>{u.tz}</TableCell>
                <TableCell>{u.phoneNumber}</TableCell>
                <TableCell>{u.mail}</TableCell>
                <TableCell><Chip label={u.status ? 'מנהל' : 'משתמש'} color={u.status ? 'primary' : 'default'} size="small" /></TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => handleEdit(u)}><EditIcon /></IconButton>
                  <IconButton size="small" color="error" onClick={() => handleDelete(u.id)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} maxWidth="sm" fullWidth>
        <DialogTitle>עריכת משתמש</DialogTitle>
        <DialogContent>
          <TextField fullWidth margin="normal" label="שם פרטי" value={selected?.firstName || ''} onChange={(e) => setSelected({ ...selected!, firstName: e.target.value })} />
          <TextField fullWidth margin="normal" label="שם משפחה" value={selected?.lastName || ''} onChange={(e) => setSelected({ ...selected!, lastName: e.target.value })} />
          <TextField fullWidth margin="normal" label="שם משתמש" value={selected?.userName || ''} onChange={(e) => setSelected({ ...selected!, userName: e.target.value })} />
          <TextField fullWidth margin="normal" label="טלפון" value={selected?.phoneNumber || ''} onChange={(e) => setSelected({ ...selected!, phoneNumber: e.target.value })} />
          <TextField fullWidth margin="normal" label="אימייל" value={selected?.mail || ''} onChange={(e) => setSelected({ ...selected!, mail: e.target.value })} />
          <FormControlLabel
            control={<Switch checked={selected?.status || false} onChange={(e) => setSelected({ ...selected!, status: e.target.checked })} />}
            label="מנהל"
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>ביטול</Button>
          <Button variant="contained" onClick={handleSave}>שמור</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack({ ...snack, open: false })}>
        <Alert severity={snack.severity}>{snack.msg}</Alert>
      </Snackbar>
    </Container>
  );
};

export default UsersDisplay;

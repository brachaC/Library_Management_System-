import { useContext, useEffect, useState, useCallback } from 'react';
import type { Lend } from '../models/Lend';
import { UserContext } from '../contexts/userContext';
import { getLendByUserId, deleteLend, updateLend } from '../server/api';
import {
  Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, IconButton, Button, Snackbar, Alert,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ReturnIcon from '@mui/icons-material/AssignmentReturn';

const ShowMyLends = () => {
  const { user } = useContext(UserContext);
  const [lends, setLends] = useState<Lend[]>([]);
  const [snack, setSnack] = useState({ open: false, msg: '', severity: 'success' as 'success' | 'error' });

  const loadLends = useCallback(async () => {
    if (!user) return;
    try {
      const res = await getLendByUserId(user.id);
      setLends(res.data || []);
    } catch { setSnack({ open: true, msg: 'שגיאה בטעינת השאלות', severity: 'error' }); }
  }, [user]);

  useEffect(() => { loadLends(); }, [loadLends]);

  const handleReturn = async (lend: Lend) => {
    try {
      await updateLend(lend.id, { ...lend, returnDate: new Date().toISOString().split('T')[0] });
      setSnack({ open: true, msg: 'הספר הוחזר בהצלחה', severity: 'success' });
      loadLends();
    } catch { setSnack({ open: true, msg: 'שגיאה בהחזרת ספר', severity: 'error' }); }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteLend(id);
      setLends((prev) => prev.filter((l) => l.id !== id));
      setSnack({ open: true, msg: 'ההשאלה נמחקה', severity: 'success' });
    } catch { setSnack({ open: true, msg: 'שגיאה במחיקת השאלה', severity: 'error' }); }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.main', mb: 3 }}>📖 ההשאלות שלי</Typography>
      {lends.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography color="text.secondary">אין לך השאלות פעילות. לך להשאיל ספר!</Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ספר</TableCell><TableCell>תאריך השאלה</TableCell><TableCell>תאריך החזרה</TableCell><TableCell>פעולות</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lends.map((l) => (
                <TableRow key={l.id}>
                  <TableCell>{l.bookName}</TableCell>
                  <TableCell>{l.lendingDate?.toString()}</TableCell>
                  <TableCell>{l.returnDate ? l.returnDate.toString() : <ChipNotReturned />}</TableCell>
                  <TableCell>
                    {!l.returnDate && (
                      <Button size="small" startIcon={<ReturnIcon />} variant="outlined" onClick={() => handleReturn(l)}>החזר</Button>
                    )}
                    <IconButton size="small" color="error" onClick={() => handleDelete(l.id)}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack({ ...snack, open: false })}>
        <Alert severity={snack.severity}>{snack.msg}</Alert>
      </Snackbar>
    </Container>
  );
};

const ChipNotReturned = () => (
  <Typography component="span" sx={{ color: 'warning.main', fontWeight: 600, fontSize: '0.85rem' }}>טרם הוחזר</Typography>
);

export default ShowMyLends;

import { useForm } from 'react-hook-form';
import { addNewBook, updateBook } from '../server/api';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Container, Typography, Paper, TextField, Button, Stack, Snackbar, Alert,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

interface BookForm {
  title: string; auther: string; image: string; summery: string; pageCount: number; categoryId: number; status: string;
}

const AddNewBook = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const editingBook = location.state as any;
  const isEdit = Boolean(editingBook?.id);
  const [snack, setSnack] = useState({ open: false, msg: '', severity: 'success' as 'success' | 'error' });

  const { register, handleSubmit, reset, formState: { errors } } = useForm<BookForm>();

  useEffect(() => {
    if (editingBook?.id) {
      reset({
        title: editingBook.title || '',
        auther: editingBook.author || editingBook.auther || '',
        image: editingBook.image || '',
        summery: editingBook.summary || editingBook.summery || '',
        pageCount: editingBook.pageCount || 0,
        categoryId: 1,
        status: 'true',
      });
    }
  }, [editingBook, reset]);

  const onSubmit = async (data: BookForm) => {
    try {
      if (isEdit) {
        await updateBook(editingBook.id, data);
        setSnack({ open: true, msg: 'הספר עודכן בהצלחה', severity: 'success' });
      } else {
        await addNewBook(data);
        setSnack({ open: true, msg: 'הספר נוסף בהצלחה', severity: 'success' });
      }
      setTimeout(() => navigate('/BooksDisplay'), 1200);
    } catch {
      setSnack({ open: true, msg: 'שגיאה בשמירת הספר', severity: 'error' });
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: 'primary.main' }}>
          {isEdit ? '✏️ עריכת ספר' : '📘 הוספת ספר חדש'}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <TextField label="כותרת" {...register('title', { required: true })} error={!!errors.title} helperText={errors.title && 'שדה חובה'} fullWidth />
            <TextField label="מחבר" {...register('auther', { required: true })} error={!!errors.auther} helperText={errors.auther && 'שדה חובה'} fullWidth />
            <TextField label="תמונת URL" {...register('image', { required: true })} error={!!errors.image} helperText={errors.image && 'שדה חובה'} fullWidth />
            <TextField label="תקציר" {...register('summery', { required: true })} error={!!errors.summery} helperText={errors.summery && 'שדה חובה'} multiline rows={3} fullWidth />
            <TextField label="מספר עמודים" type="number" {...register('pageCount', { required: true })} error={!!errors.pageCount} helperText={errors.pageCount && 'שדה חובה'} fullWidth />
            <Button type="submit" variant="contained" size="large" startIcon={<SaveIcon />}>
              {isEdit ? 'עדכן ספר' : 'הוסף ספר'}
            </Button>
          </Stack>
        </form>
      </Paper>
      <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack({ ...snack, open: false })}>
        <Alert severity={snack.severity}>{snack.msg}</Alert>
      </Snackbar>
    </Container>
  );
};

export default AddNewBook;

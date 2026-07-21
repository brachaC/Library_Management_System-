import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { createUser } from '../server/api';
import { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Stack, Snackbar, Alert } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

interface FormValues {
  userName: string; password: string; tz: string; firstName: string;
  lastName: string; phoneNumber: string; mail: string;
}

const schema = yup.object({
  firstName: yup.string().required('שדה חובה'),
  lastName: yup.string().required('שדה חובה'),
  userName: yup.string().required('שדה חובה'),
  password: yup.string().min(4).required('שדה חובה'),
  tz: yup.string().required('שדה חובה'),
  phoneNumber: yup.string().required('שדה חובה'),
  mail: yup.string().email('אימייל לא תקין').required('שדה חובה'),
}).required();

const AddNewAdmin = () => {
  const [snack, setSnack] = useState({ open: false, msg: '', severity: 'success' as 'success' | 'error' });
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    try {
      await createUser({ ...data, status: true });
      setSnack({ open: true, msg: 'מנהל נוסף בהצלחה', severity: 'success' });
      reset();
    } catch { setSnack({ open: true, msg: 'שגיאה בהוספת מנהל', severity: 'error' }); }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4 }}>
        <Typography variant="h6" fontWeight={700} color="primary.main" mb={3}>הוספת מנהל חדש</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField label="שם פרטי" {...register('firstName')} error={!!errors.firstName} helperText={errors.firstName?.message} fullWidth />
              <TextField label="שם משפחה" {...register('lastName')} error={!!errors.lastName} helperText={errors.lastName?.message} fullWidth />
            </Stack>
            <TextField label="שם משתמש" {...register('userName')} error={!!errors.userName} helperText={errors.userName?.message} fullWidth />
            <TextField label="סיסמה" type="password" {...register('password')} error={!!errors.password} helperText={errors.password?.message} fullWidth />
            <TextField label="תעודת זהות" {...register('tz')} error={!!errors.tz} helperText={errors.tz?.message} fullWidth />
            <TextField label="טלפון" {...register('phoneNumber')} error={!!errors.phoneNumber} helperText={errors.phoneNumber?.message} fullWidth />
            <TextField label="אימייל" {...register('mail')} error={!!errors.mail} helperText={errors.mail?.message} fullWidth />
            <Button type="submit" variant="contained" size="large" fullWidth startIcon={<PersonAddIcon />}>הוסף מנהל</Button>
          </Stack>
        </form>
      </Paper>
      <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack({ ...snack, open: false })}>
        <Alert severity={snack.severity}>{snack.msg}</Alert>
      </Snackbar>
    </Container>
  );
};

export default AddNewAdmin;

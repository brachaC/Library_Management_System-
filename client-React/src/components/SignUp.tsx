import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../contexts/userContext';
import { createUser } from '../server/api';
import { Container, Paper, Typography, TextField, Button, Stack, Alert } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

interface FormValues {
  userName: string; password: string; tz: string; firstName: string;
  lastName: string; phoneNumber: string; mail: string;
}

const schema = yup.object({
  firstName: yup.string().required('שדה חובה'),
  lastName: yup.string().required('שדה חובה'),
  userName: yup.string().required('שדה חובה'),
  password: yup.string().min(4, 'לפחות 4 תווים').required('שדה חובה'),
  tz: yup.string().required('שדה חובה'),
  phoneNumber: yup.string().required('שדה חובה'),
  mail: yup.string().email('אימייל לא תקין').required('שדה חובה'),
}).required();

const SignUp = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await createUser({ ...data, status: false });
      setUser(res?.data);
      navigate('/Home');
    } catch { setError('שגיאה בהרשמה, נסה שוב'); }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" fontWeight={700} color="primary.main" textAlign="center" mb={3}>הרשמה</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
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
            <Button type="submit" variant="contained" size="large" fullWidth startIcon={<PersonAddIcon />}>הרשם</Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;

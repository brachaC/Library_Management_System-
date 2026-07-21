import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../contexts/userContext';
import { getUserByUserName } from '../server/api';
import { Container, Paper, Typography, TextField, Button, Stack, Alert, Box } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

interface FormValues { userName: string; password: string; }

const schema = yup.object({ userName: yup.string().required('שדה חובה'), password: yup.string().required('שדה חובה') }).required();

const Login = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await getUserByUserName(data.userName);
      if (res?.data?.password !== data.password) {
        setError('סיסמה שגויה');
        return;
      }
      setUser(res.data);
      navigate('/Home');
    } catch { setError('המשתמש לא נמצא'); }
  };

  return (
    <Container maxWidth="xs" sx={{ py: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" fontWeight={700} color="primary.main" textAlign="center" mb={3}>התחברות</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <TextField label="שם משתמש" {...register('userName')} error={!!errors.userName} helperText={errors.userName?.message} fullWidth />
            <TextField label="סיסמה" type="password" {...register('password')} error={!!errors.password} helperText={errors.password?.message} fullWidth />
            <Button type="submit" variant="contained" size="large" fullWidth startIcon={<LoginIcon />}>התחבר</Button>
          </Stack>
        </form>
        <Box textAlign="center" mt={2}>
          <Typography variant="body2" color="text.secondary">
            אין לך חשבון? <Link to="/SignUp" style={{ color: '#0d7377', fontWeight: 600 }}>הרשם עכשיו</Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;

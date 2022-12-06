import { Email, Password } from '@mui/icons-material';

import {
  Box,
  Button, Checkbox, FormControlLabel, InputAdornment, Stack, TextField, Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLoginMutation } from '../../apiServices/authService';
import Logo from '../../assets/images/Logo.png';
import appConfig from '../../configs/app';
import { CredentialsType } from '../../interfaces/UserType';
import SocialLoginForm from './SocialLogin';

export default function LoginView() {
  const navigate = useNavigate();

  const [login] = useLoginMutation();

  const initialValues: CredentialsType = {
    email: '',
    password: '',
  };

  const onSubmit = async (credentials: CredentialsType) => {
    await login(credentials).unwrap();
    toast('Login successfully', { type: 'success' });
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <Stack spacing={2}>
      <Stack
        spacing={1}
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img src={Logo} alt={appConfig.appName} />
        <h2>{appConfig.appName}</h2>
      </Stack>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2}>
          <TextField
            required
            name="email"
            onChange={formik.handleChange}
            label="Email Address"
            type="email"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Email />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            required
            name="password"
            onChange={formik.handleChange}
            label="Password"
            type="password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Password />
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{
            display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
          }}
          >
            <FormControlLabel sx={{ marginTop: 0 }} control={<Checkbox defaultChecked />} label="Keep me logged in" />

            <Typography
              onClick={() => navigate('/forgot-password')}
              style={{ cursor: 'pointer', fontWeight: 'bold' }}
            >
              Forgot password ?

            </Typography>

          </Box>
          <Button type="submit">Login</Button>
        </Stack>
      </form>
      <Stack
        direction="row"
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <span>
          Don&apos;t have and account?
        </span>
        <Typography
          onClick={() => navigate('/signup')}
          style={{ cursor: 'pointer', fontWeight: 'bold' }}
        >
          Sign Up
        </Typography>

      </Stack>
      <SocialLoginForm />
    </Stack>
  );
}

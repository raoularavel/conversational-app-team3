import {
  Box, Stack, Toolbar, useTheme,
} from '@mui/material';
import axios from 'axios';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';
import Topbar from '../components/dashboard/Topbar';
import { useAuth } from '../store/authReducer';
import { drawerWidth } from '../theme/theme';

export default function DashboardLayout() {
  const theme = useTheme();

  const auth = useAuth();

  if (!auth.token) return <Navigate to="/login" />;

  axios.defaults.headers.common.Authorization = `Bearer ${auth.token}`;

  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <Topbar />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: '100%',
          p: 2,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          marginLeft: `${drawerWidth}px`,
          [theme.breakpoints.down('md')]: {
            marginLeft: 0,
          },
        }}
      >
        <Toolbar />
        <Stack
          spacing={2}
          sx={{
            display: 'flex',
            height: '100%',
          }}
        >
          <Outlet />
        </Stack>
      </Box>
    </Box>
  );
}

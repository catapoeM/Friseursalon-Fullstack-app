import Navbar from './AppHeader';
import { Outlet } from 'react-router-dom';
import { Toolbar, Box } from '@mui/material';

export default function MainLayout() {
  return (
    <>
      <Navbar />

      {/* Push content below AppBar */}
      <Toolbar />

      <Box sx={{ p: 3 }}>
        <Outlet />
      </Box>
    </>
  );
}

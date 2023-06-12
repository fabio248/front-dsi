import { useEffect } from 'react';

// MUI MATERIAL COMPONENTS
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks';
import LogoutIcon from '@mui/icons-material/Logout';

// Google Authentication
import { useSupabaseClient } from '@supabase/auth-helpers-react';

export function Logout() {
  useEffect(() => {}, []);

  const { logout } = useAuth();
  const navigate = useNavigate();
  async function onLogout(){
    await logout();
    singOut();
    navigate('/');
  };

  const supabase = useSupabaseClient();

  async function singOut() {
    await supabase.auth.signOut();
  }

  return (
    <Button
      startIcon={<LogoutIcon />}
      variant='contained'
      onClick={onLogout}
      color = 'error'
    >
      Cerrar sesion
    </Button>
  );
}

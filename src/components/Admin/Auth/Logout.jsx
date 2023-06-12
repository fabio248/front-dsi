import { useEffect } from 'react';

// MUI MATERIAL COMPONENTS
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks';

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
      sx={{ mx: 2, display: 'flex'}}
      variant='contained'
      onClick={onLogout}
      size='large'
      color = 'error'
    >
      Cerrar sesion
    </Button>
  );
}

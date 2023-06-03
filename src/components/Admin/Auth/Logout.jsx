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
  const onLogout = () => {
    logout();
    singOut();
    navigate('/');
  };

  const supabase = useSupabaseClient();

  async function singOut() {
    await supabase.auth.signOut();
  }

  return (
    <Button
      style={{ marginTop: '10px', position: 'fixed', right: 0, top: 0 }}
      variant='contained'
      onClick={onLogout}
      size='large'
      className='my_button'
    >
      Cerrar sesion
    </Button>
  );
}

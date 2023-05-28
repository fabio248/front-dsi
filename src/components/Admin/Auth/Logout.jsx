import { useEffect } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks";
import { useSupabaseClient } from '@supabase/auth-helpers-react';

export function Logout() {
    useEffect(() => {
    }, [])
    
    const { logout } = useAuth();
    const navigate = useNavigate();
    const onLogout = () => {
      logout();
      singOut();
      navigate("/admin")
    };

    const supabase = useSupabaseClient();

    async function singOut() {
      await supabase.auth.signOut();
    }
    

  return (
    <Button 
        variant="contained"
        onClick={onLogout}
        size="large"
        className="my_button" >Cerrar sesion
    </Button>
  );
}

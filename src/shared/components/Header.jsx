import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import React from "react";

export function Header() {
    const navigate = useNavigate();

    return (
        <AppBar position='static' sx={{ m:-1, width: '101.2%' }}>
            <Toolbar>
                <Typography
                    variant='h6'
                    component='div'
                    sx={{ flexGrow: 1 }}
                    onClick={() => navigate('/admin')}
                >
                    Clínica Veterinaria Mistun
                </Typography>

                <Button
                    variant='contained'
                    color='success'
                    style={{ color: 'white' }}
                    onClick={() => navigate(-1)}
                >
                    Regresar
                </Button>
            </Toolbar>
        </AppBar>
    )
}
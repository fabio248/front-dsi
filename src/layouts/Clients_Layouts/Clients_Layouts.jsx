import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PetsIcon from '@mui/icons-material/Pets';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SummarizeIcon from '@mui/icons-material/Summarize';
import InfoIcon from '@mui/icons-material/Info';
import { FaFacebook } from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { Logout } from '../../components/Admin/Auth/Logout';
import { NavLink } from 'react-router-dom';
import './Clients_Layouts.css';

const drawerWidth = 240;

export function Clients_Layouts(props) {
  const { children } = props;
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div className='main-container'>
      <div className='image-container'>
        <img src='/galeria/logo.png' alt='logo' className='imagen-appbar' />
      </div>
      <Divider sx={{ mt: -3 }} />
      <List>
        <ListItem disablePadding>
          <NavLink
            to='/client/catalogo'
            style={{
              textDecoration: 'none', // Quitar subrayado
              color: 'black', // Color de texto deseado
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <SummarizeIcon />
              </ListItemIcon>
              <ListItemText primary='Servicios Ofrecidos' />
            </ListItemButton>
          </NavLink>
        </ListItem>

        <Divider />
        <NavLink
          to='/client/mascotas'
          style={{
            textDecoration: 'none', // Quitar subrayado
            color: 'black', // Color de texto deseado
          }}
        >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PetsIcon />
              </ListItemIcon>
              <ListItemText primary='Mascotas' />
            </ListItemButton>
          </ListItem>
        </NavLink>

        <Divider />

        <NavLink
          to='/client/visualizar'
          style={{
            textDecoration: 'none', // Quitar subrayado
            color: 'black', // Color de texto deseado
          }}
        >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
              <CalendarMonthIcon />
              </ListItemIcon>
              <ListItemText primary='Visualizar Citas' />
            </ListItemButton>
          </ListItem>
        </NavLink>
      </List>
      <Divider />

      <div style={{ position: 'absolute', right: '10px', bottom: '10px' }}>
        <IconButton
          aria-label='Facebook'
          component='a'
          href='https://www.facebook.com/profile.php?id=100069913175592'
          target='_blank'
          style={{ fontSize: '2rem', color: '#573874' }}
        >
          <FaFacebook />
        </IconButton>

        <IconButton
          aria-label='WhatsApp'
          component='a'
          href='https://wa.me/50361366565'
          target='_blank'
          style={{ fontSize: '2rem', color: '#573874' }}
        >
          <FaWhatsapp />
        </IconButton>

        <IconButton
          aria-label='Instagram'
          component='a'
          href='https://www.instagram.com/mistumcv/'
          target='_blank'
          style={{ fontSize: '2rem', color: '#573874' }}
        >
          <FaInstagram />
        </IconButton>
      </div>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <div className='container'>
        <div>
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
              position='fixed'
              sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
              }}
            >
              <Toolbar>
                <IconButton
                  color='inherit'
                  aria-label='open drawer'
                  edge='start'
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, display: { sm: 'none' } }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant='h6' noWrap component='div'>
                  <div
                    style={{
                      position: 'absolute',
                      right: '10px',
                      bottom: '10px',
                    }}
                  >
                    {/* CERRAR SESION*/}
                    <Logout />
                  </div>
                </Typography>
              </Toolbar>
            </AppBar>
            <Box
              component='nav'
              sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
              aria-label='mailbox folders'
            >
              <Drawer
                container={container}
                variant='temporary'
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                  keepMounted: true,
                }}
                sx={{
                  display: { xs: 'block', sm: 'none' },
                  '& .MuiDrawer-paper': {
                    boxSizing: 'border-box',
                    width: drawerWidth,
                  },
                }}
              >
                {drawer}
              </Drawer>
              <Drawer
                variant='permanent'
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  '& .MuiDrawer-paper': {
                    boxSizing: 'border-box',
                    width: drawerWidth,
                  },
                }}
                open
              >
                {drawer}
              </Drawer>
            </Box>
            <Box
              component='main'
              sx={{
                flexGrow: 1,
                p: 3,
                width: { sm: `calc(100% - ${drawerWidth}px)` },
              }}
            >
              <Toolbar />
              {children}
              <Typography paragraph></Typography>
              <Typography paragraph></Typography>
            </Box>
          </Box>
        </div>
      </div>
    </>
  );
}

Clients_Layouts.propTypes = {
  window: PropTypes.func,
};

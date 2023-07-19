import React from 'react';
import './Vet_Layouts.css';
import { useAuth } from '../../hooks/UseAuth';
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
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PetsIcon from '@mui/icons-material/Pets';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import EventIcon from '@mui/icons-material/Event';
import { Logout } from '../../components/Admin/Auth/Logout';
import { Grid } from '@mui/material';
import { NavLink } from 'react-router-dom';

const drawerWidth = 240;

export function Vet_Layouts(props) {
  const { children } = props;

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const drawer = (
    <div>
      <div className='image-container'>
        <img
          src='../../../public/galeria/logo.png'
          alt='logo'
          className='imagen-appbar'
        />
      </div>

      <Divider sx={{ mt: -3 }} />
      <List>
        <NavLink
          to='/admin/users'
          style={{
            textDecoration: 'none', // Quitar subrayado
            color: 'black', // Color de texto deseado
          }}
        >
          <ListItem disablePadding>
            <ListItemButton component='a'>
              <ListItemIcon>
                <PeopleAltIcon />
              </ListItemIcon>
              <ListItemText primary='Clientes' />
            </ListItemButton>
          </ListItem>
        </NavLink>
        <Divider />
        <NavLink
          to='/admin/calendar'
          style={{
            textDecoration: 'none', // Quitar subrayado
            color: 'black', // Color de texto deseado
          }}
        >
          <ListItem disablePadding>
            <ListItemButton component='a'>
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText primary='Programación de citas' />
            </ListItemButton>
          </ListItem>
        </NavLink>

        <Divider />
        <ListItem disablePadding>
          <ListItemButton
            component='a'
            href='https://calendar.google.com/calendar/u/0/r'
            target='_blank'
          >
            <ListItemIcon>
              <CalendarMonthIcon />
            </ListItemIcon>
            <ListItemText primary='Visualizar citas' />
          </ListItemButton>
        </ListItem>

        <Divider />
        <NavLink
          to='/admin/userAndPets'
          style={{
            textDecoration: 'none', // Quitar subrayado
            color: 'black', // Color de texto deseado
          }}
        >
          <ListItem disablePadding>
            <ListItemButton component='a'>
              <ListItemIcon>
                <PersonAddAltIcon />
              </ListItemIcon>
              <ListItemText primary='Agregar Clientes y sus mascotas' />
            </ListItemButton>
          </ListItem>
        </NavLink>
        <Divider />
      </List>
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
                      bottom: '15px',
                    }}
                  >
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
              {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
              <Drawer
                container={container}
                variant='temporary'
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
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

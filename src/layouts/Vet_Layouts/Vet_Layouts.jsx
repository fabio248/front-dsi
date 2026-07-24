import React from 'react';
import './Vet_Layouts.css';
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
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DescriptionIcon from '@mui/icons-material/Description';
import EventIcon from '@mui/icons-material/Event';
import { Logout } from '../../components/Admin/Auth/Logout';
import { NavLink } from 'react-router-dom';
import PetsIcon from '@mui/icons-material/Pets';
import { ProductionQuantityLimitsTwoTone } from '@mui/icons-material';

import { useLocalStorageState } from '../../hooks';

const drawerWidth = 240;

// Ancho contraído: cabe el icono centrado y nada más. Sale de la métrica de
// MUI para un ListItemIcon (56px) más el padding del Drawer.
const collapsedDrawerWidth = 72;

// La preferencia se guarda por usuario del navegador: es de la misma familia
// que las columnas visibles del data grid, no algo que deba ir en la URL.
const SIDEBAR_COLLAPSED_KEY = 'vet-sidebar:collapsed';

/**
 * Elementos del menú. Antes cada uno era un bloque de JSX repetido; en una sola
 * lista el modo contraído (tooltip, texto oculto, icono centrado) se resuelve
 * una vez y no seis.
 *
 * `href` en vez de `to` marca los enlaces externos, que no pasan por el router.
 */
const NAV_ITEMS = [
  { label: 'Clientes', Icon: PeopleAltIcon, to: '/admin/users' },
  { label: 'Mascotas', Icon: PetsIcon, to: '/admin/userAndPets' },
  {
    label: 'Productos',
    Icon: ProductionQuantityLimitsTwoTone,
    to: '/admin/products',
  },
  { label: 'Facturación', Icon: DescriptionIcon, to: '/admin/facturations' },
  { label: 'Programación de citas', Icon: EventIcon, to: '/admin/calendar' },
  {
    label: 'Visualizar citas',
    Icon: CalendarMonthIcon,
    href: 'https://calendar.google.com/calendar/u/0/r',
    external: true,
  },
];

export function Vet_Layouts(props) {
  const { children, window } = props;

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [collapsed, setCollapsed] = useLocalStorageState(
    SIDEBAR_COLLAPSED_KEY,
    false
  );

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCollapseToggle = () => {
    setCollapsed((prevState) => !prevState);
  };

  // Ancho efectivo del menú fijo. El drawer temporal (móvil) no se contrae:
  // ahí el menú se abre sobre el contenido y se cierra al navegar, así que
  // ganar 168px no compensa perder las etiquetas.
  const currentDrawerWidth = collapsed ? collapsedDrawerWidth : drawerWidth;

  /**
   * @param {boolean} isCollapsed  El drawer temporal siempre se pinta expandido.
   */
  const renderDrawer = (isCollapsed) => (
    <div>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: isCollapsed ? 'center' : 'space-between',
          minHeight: 64,
          px: 1,
        }}
      >
        {/* El logo se esconde al contraer: a 72px de ancho quedaría ilegible. */}
        {!isCollapsed && (
          <div className='image-container'>
            <img src='/galeria/logo.png' alt='logo' className='imagen-appbar' />
          </div>
        )}

        {/* El botón solo existe en el menú fijo: el temporal se cierra solo. */}
        <Tooltip title={isCollapsed ? 'Expandir menú' : 'Contraer menú'}>
          <IconButton
            onClick={handleCollapseToggle}
            aria-label={isCollapsed ? 'Expandir menú' : 'Contraer menú'}
            aria-expanded={!isCollapsed}
            sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
          >
            {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </Tooltip>
      </Box>

      <Divider />
      <List>
        {NAV_ITEMS.map(({ label, Icon, to, href, external }) => {
          // Contraído no hay texto, así que la única pista del destino es el
          // tooltip. Expandido sobra y solo estorbaría al puntero.
          const item = (
            <ListItem key={label} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                {...(external
                  ? { href, target: '_blank' }
                  : { component: NavLink, to })}
                sx={{
                  minHeight: 48,
                  justifyContent: isCollapsed ? 'center' : 'initial',
                  px: 2.5,
                  color: 'black',
                  textDecoration: 'none',
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: isCollapsed ? 0 : 3,
                    justifyContent: 'center',
                  }}
                >
                  <Icon />
                </ListItemIcon>
                {/* Se desmonta en vez de ocultarse: un texto con opacity 0
                    sigue leyéndolo el lector de pantalla y ensancha la fila. */}
                {!isCollapsed && <ListItemText primary={label} />}
              </ListItemButton>
            </ListItem>
          );

          return isCollapsed ? (
            <Tooltip key={label} title={label} placement='right'>
              {item}
            </Tooltip>
          ) : (
            item
          );
        })}
      </List>
      <Divider />
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
                width: { sm: `calc(100% - ${currentDrawerWidth}px)` },
                ml: { sm: `${currentDrawerWidth}px` },
                transition: (theme) =>
                  theme.transitions.create(['width', 'margin'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                  }),
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
              sx={{
                width: { sm: currentDrawerWidth },
                flexShrink: { sm: 0 },
              }}
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
                {renderDrawer(false)}
              </Drawer>
              <Drawer
                variant='permanent'
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  '& .MuiDrawer-paper': {
                    boxSizing: 'border-box',
                    width: currentDrawerWidth,
                    overflowX: 'hidden',
                    transition: (theme) =>
                      theme.transitions.create('width', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                      }),
                  },
                }}
                open
              >
                {renderDrawer(collapsed)}
              </Drawer>
            </Box>
            <Box
              component='main'
              sx={{
                flexGrow: 1,
                p: 3,
                width: { sm: `calc(100% - ${currentDrawerWidth}px)` },
                height: '100vh',
              }}
            >
              <Toolbar
                sx={{
                  height: { xs: '4rem', sm: '7rem', md: '7rem', lg: '7rem' },
                }}
              />
              {children}
            </Box>
          </Box>
        </div>
      </div>
    </>
  );
}

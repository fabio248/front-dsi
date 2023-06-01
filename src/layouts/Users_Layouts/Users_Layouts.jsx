import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import StarBorder from '@mui/icons-material/StarBorder';
import SummarizeIcon from '@mui/icons-material/Summarize';
import InfoIcon from '@mui/icons-material/Info';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import { Button } from "@mui/material";
import { FaFacebook } from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa';

import "./Users_Layouts.css";

const drawerWidth = 240;

export function Users_Layouts(props) {
  const { children } = props;
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const render_cliente = () => {

  }

  const drawer = ( 
    <div>
      <div className="image-container">
        <img
          src="../../../public/galeria/logo.jpg"
          alt="logo"
          className="imagen-appbar"
        />
      </div>
      
      <Toolbar /> 
      <Divider />
      <List>
        <ListItem disablePadding style={{ height: '80px' }}>
          <ListItemButton component="a" href="/catalogo">
            <ListItemIcon>
              <SummarizeIcon />
            </ListItemIcon>
            <ListItemText primary="Servicios Ofrecidos" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />

      <List>
        <ListItem disablePadding style={{ height: '80px' }}>
          <ListItemButton component="a" href="/informacion">
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="Información del Establecimiento" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />

      <List>
        <ListItem disablePadding style={{ height: '80px' }}>
          <ListItemButton component="a" href="/historia">
            <ListItemIcon>
              <MenuBookIcon />
            </ListItemIcon>
            <ListItemText primary="Quienes Somos" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />

      <ListItem disablePadding style={{ height: '80px' }}>
        <ListItemButton component="a" href="/galeria">
          <ListItemIcon>
            <PhotoSizeSelectActualIcon />
          </ListItemIcon>
          <ListItemText primary="Galería de fotos" />
        </ListItemButton>
      </ListItem>
      <Divider />
      <div style={{ position: 'absolute', left: '10px', bottom: '10px' }}>
        <IconButton
          color="inherit"
          aria-label="Facebook"
          component="a"
          href="https://www.facebook.com/profile.php?id=100069913175592"
          target="_blank"
          style={{fontSize: '2rem' }}
        >
          <FaFacebook />
        </IconButton>

        <IconButton
          color="inherit"
          aria-label="WhatsApp"
          component="a"
          href="https://wa.me/50361366565"
          target="_blank"
          style={{fontSize: '2rem' }}
        >
          <FaWhatsapp />
        </IconButton>
      </div>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <div className="container">
        <div>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
              position="fixed"
              sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
              }}
            >
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, display: { sm: "none" } }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                  <div
                    style={{
                      position: 'absolute',
                      right: '10px',
                      bottom: '10px',
                    }}
                  >
                    <Button
                      className="btn-login"
                      variant="contained"
                      style={{ backgroundColor: '#44ACC1' }}
                      href = "/login"
                    >
                      INICIAR SESION
                    </Button>
                  </div>
                </Typography>
              </Toolbar>
            </AppBar>
            <Box
              component="nav"
              sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
              aria-label="mailbox folders"
            >
              <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                  keepMounted: true,
                }}
                sx={{
                  display: { xs: "block", sm: "none" },
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: drawerWidth,
                  },
                }}
              >
                {drawer}
              </Drawer>
              <Drawer
                variant="permanent"
                sx={{
                  display: { xs: "none", sm: "block" },
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: drawerWidth,
                  },
                }}
                open
              >
                {drawer}
              </Drawer>
            </Box>
            <Box
              component="main"
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

Users_Layouts.propTypes = {
  window: PropTypes.func,
};

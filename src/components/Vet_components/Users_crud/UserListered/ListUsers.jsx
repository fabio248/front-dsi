import React, { useEffect, useState } from 'react';
import { User } from '../../../../api/User.api';
import { ApiAuth } from '../../../../api/Auth.api';
import { size, map } from 'lodash';
import { UserItem } from '../UserItem';
import {
  TextField,
  Typography,
  Tab,
  Tabs,
  Box,
  CircularProgress,
  Grid,
} from '@mui/material';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import PropTypes from 'prop-types';

const userController = new User();
const AuthController = new ApiAuth();

export function ListUsers(props) {
  const { reload, onReload } = props;

  const [users, setUsers] = useState(false);
  const [value, setValue] = useState(0);
  //guarda el resultado de la busqueda y lo filtra
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (event, newValue) => setValue(newValue);

  //peticiones al back
  useEffect(() => {
    (async () => {
      try {
        const accessToken = AuthController.getAccessToken();

        const response = await userController.getAllUsers(accessToken);

        setUsers(response);
      } catch (error) {}
    })();
  }, [reload]);

  //funcion del target de busqueda
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  if (!users) return <CircularProgress />;

  //filtro de busqueda para los usuarios
  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const email = user.email.toLowerCase();
    const role = user.role.toLowerCase();
    const direction = user.direction ? user.direction.toLowerCase() : '';
    const dui = user.dui ? user.dui.toLowerCase() : '';
    const birthday = user.birthday ? user.birthday.toLowerCase() : '';
    const phone = user.phone ? user.phone.toLowerCase() : '';

    return [fullName, email, role, direction, dui, birthday, phone].some(
      (field) => field.includes(searchQuery.toLowerCase())
    );
  });

  //condicion del filtro
  const hasFilteredUsers = size(filteredUsers) > 0;

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Grid container spacing={3} alignItems='center'>
          <Grid item>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label='basic tabs example'
            >
              <Tab
                icon={<PeopleOutlineIcon />}
                label='Usuarios'
                {...a11yProps(0)}
              />
            </Tabs>
          </Grid>
          <Grid item sx={{ flexGrow: 1 }}>
            {/* Espacio flexible */}
          </Grid>
          <Grid item>
            <TextField
              style={{
                width: '500px',
                alignItems: 'left',
                borderWidth: '2px',
                borderRadius: '1px',
                borderColor: 'antiquewhite',
              }}
              label='Buscar...'
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder='Introduce cualquier dato del cliente...'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Box>
      <br />
      {hasFilteredUsers ? (
        <div
          style={{
            margin: '16px',
            backgroundColor: '#f0f0f0',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
          }}
        >
          {map(filteredUsers, (user) => (
            <UserItem key={user.id} user={user} onReload={onReload} />
          ))}
        </div>
      ) : (
        <Typography variant='h6' style={{ textAlign: 'center' }}>
          ¡No se encontraron usuarios registrados!
        </Typography>
      )}
    </div>
  );
}

function TabPanel({ children, value, index }) {
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

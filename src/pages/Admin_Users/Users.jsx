import React, { useState } from 'react';
import { Tab, Tabs, Button, Box, Typography } from '@mui/material';
import { Modal_users } from '../../shared';
import PropTypes from 'prop-types';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import { ListUsers, UserForm } from '../../components';

import './Users.css';

export function Users() {
  const [showModal, setShowModal] = useState(false);
  const [value, setValue] = useState(0);

  const onOpenCloseModal = () => setShowModal((prevSatate) => !prevSatate);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className='users-page'>
        <Button
          className='user-page_add'
          variant='contained'
          onClick={onOpenCloseModal}
        >
          Registrar Usuario
        </Button>

        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
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
          </Box>
          <>
            <ListUsers />
          </>
        </Box>

        <Modal_users
          show={showModal}
          close={onOpenCloseModal}
          title={'Crear Nuevo Usuario'}
        >
          <UserForm close={onOpenCloseModal} />
        </Modal_users>
      </div>
    </>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
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

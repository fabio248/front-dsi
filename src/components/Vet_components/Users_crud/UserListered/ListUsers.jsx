import React, { useEffect, useState } from 'react';
import { User } from '../../../../api/User.api';
import { ApiAuth } from '../../../../api/Auth.api';
import { size, map } from 'lodash';
import { UserItem } from '../UserItem';
import { CircularProgress } from '@mui/material';

const userController = new User();
const AuthController = new ApiAuth();

export function ListUsers(props) {
  const { reload, onReload } = props;
  const [users, setUsers] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const accessToken = AuthController.getAccessToken();

        const response = await userController.getAllUsers(accessToken);
        setUsers(response.data);
      } catch (error) {}
    })();
  }, [reload]);

  if (!users) return <CircularProgress />;

  if (size(users) === 0) {
    return (
      <Typography variant='h6' style={{ textAlign: 'center' }}>
        ¡No Se Encontraron Clientes registrados!
      </Typography>
    );
  }
  return (
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
      {map(users, (user) => (
        <UserItem key={user.id} user={user} onReload={onReload} />
      ))}
    </div>
  );
}

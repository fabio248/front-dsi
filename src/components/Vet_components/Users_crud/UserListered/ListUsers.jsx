import React from 'react';
import { User } from '../../../../api/User.api';
import { ApiAuth } from '../../../../api/Auth.api';
import { map } from 'lodash';
import { UserItem } from '../UserItem';
import { CircularProgress, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

const userController = new User();
const AuthController = new ApiAuth();

export function ListUsers() {
  const accessToken = AuthController.getAccessToken();

  const { isLoading, data: users } = useQuery({
    queryKey: ['users'],
    queryFn: async () => await userController.getAllUsers(accessToken),
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!users) {
    return (
      <Typography variant='h6' style={{ textAlign: 'center' }}>
        ¡No se encontraron clientes registrados!
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
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
}

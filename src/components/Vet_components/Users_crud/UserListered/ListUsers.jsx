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

  if (!users) return <CircularProgress /> + 'No hay ningún usuario';
  if (size(users) == null) return 'No hay ningún usuario';
  return (
    <div>
      {map(users, (user) => (
        <UserItem key={user.id} user={user} onReload={onReload} />
      ))}
    </div>
  );
}

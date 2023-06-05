import React from 'react';
import { User } from '../../../../api/User.api';
import { Button, Icon } from '@mui/material';

const userController = new User();
export function ListUsers(props) {
  const { user } = props;
  console.log(user);
  return (
    <>
      <div>ListUsers</div>
    </>
  );
}

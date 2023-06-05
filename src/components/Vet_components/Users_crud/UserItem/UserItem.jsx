import React from 'react';
import { Button, Icon, ImageList, IconButton } from '@mui/material';

//Mui material
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import PetsIcon from '@mui/icons-material/Pets';
import './UserItem.css';

export function UserItem(props) {
  const { user } = props;

  const birthday = user.birthday.split('T');
  //   user.direction = 'sandjasndjoa';

  return (
    <>
      <div className='user-item'>
        <div className='user-item_info'>
          <div>
            <p>
              <b>Usuario: </b>
              {user.firstName} {user.lastName}
              <br />
              <b>Correo: </b>
              {user.email}
              <br />
              <b>Role: </b>
              {user.role}
              <br />
              <b>
                {user.direction != null ? 'Direccion: ' + user.direction : ''}
              </b>
              <br />
              {user.dui}
              <br />
              {birthday[0]}
              <br />
              {user.phone}
            </p>
          </div>
          <div>
            <IconButton
              color='info'
              aria-label='delete'
              size='small'
              onClick={() => console.log('Hola')}
            >
              <ModeEditIcon fontSize='medium' />
            </IconButton>
            <IconButton
              color='error'
              aria-label='delete'
              size='small'
              onClick={() => console.log('Hola')}
            >
              <DeleteIcon fontSize='medium' />
            </IconButton>
            <IconButton
              color='success'
              aria-label='delete'
              size='small'
              onClick={() => console.log('Hola')}
            >
              <PetsIcon fontSize='medium' />
            </IconButton>
          </div>
        </div>
      </div>
    </>
  );
}

import React, { useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

//Mui material
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import PetsIcon from '@mui/icons-material/Pets';
import VisibilityIcon from '@mui/icons-material/Visibility';

//Modal Update/Register/Delete/CreatePet
import {
  Modal_users,
  Modal_delete,
  Alerta,
  Modal_create_pet,
} from '../../../../shared';

//objetos children que se renderizan dentro del modal
import { UserForm } from '../UserForm';
import { PetsForm } from '../../Pets_crud';

//import petitions of back
import { UserApi } from '../../../../api/User.api';
import { ApiAuth } from '../../../../api/Auth.api';

const userController = new UserApi();
const authController = new ApiAuth();

/**
 * El tema global (src/main.jsx) define `palette.inherit = { main: '#8EC167' }`.
 * `inherit` no es una clave válida de palette, y SvgIcon resuelve su color como
 * `palette[color].main` antes de caer al valor literal 'inherit'. Como el color
 * por defecto de SvgIcon ES 'inherit', ese green termina pisando el color del
 * IconButton y los cuatro iconos salen iguales.
 *
 * Envolver en un tema por defecto (sin esa clave) deja que los iconos hereden
 * el color del botón. Es el mismo workaround que ya usan UserItem, FactureItem,
 * ProductItem, PetsAllItems y Alert.
 */
const defaultTheme = createTheme();

/**
 * Acciones por fila (ver, editar, eliminar, crear mascota) con sus modales.
 *
 * Es la misma lógica que tenía UserItem, extraída para que la columna de
 * acciones no dependa del layout de tarjeta.
 */
export function UserRowActions({ user }) {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  //useState que controla el estado del (abrir o cerrar) modal Update/Register
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState('');

  //useState que controla el estado del (abrir o cerrar) modal Delete
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');
  const [titleDelete, setTitleDelete] = useState('');

  //useState que controla el estado del (abrir o cerrar) modal Create Pets
  const [showPets, setShowPets] = useState(false);
  const [titlePets, setTitlePets] = useState('');

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onCloseConfirm = () => setShowConfirm((prevState) => !prevState);
  const onOpenClosePets = () => setShowPets((prevState) => !prevState);

  const fullName = `${user.firstName} ${user.lastName}`;

  const openUpdateUser = () => {
    setTitleModal(`Actualizar Usuario: ${fullName}`);
    onOpenCloseModal();
  };

  const onCreatePetForUser = () => {
    setTitlePets('Crear Mascota para el cliente seleccionado.');
    onOpenClosePets();
  };

  const openDeleteUser = () => {
    setTitleDelete(`Eliminar usuario: ${fullName}`);
    setConfirmMessage(`¿Esta seguro de que desea eliminar al usuario?`);
    onCloseConfirm();
  };

  const accessToken = authController.getAccessToken();
  const queryClient = useQueryClient();

  const deleteUserMutation = useMutation({
    mutationFn: async ({ accessToken }) => {
      await userController.deleteUser(accessToken, user.id);
    },
    onSuccess: () => {
      // La tabla usa ['users', 'table', params]; invalidar por el prefijo
      // ['users'] refresca tanto la tabla como el scroll infinito.
      queryClient.invalidateQueries(['users']);
      setSuccess(true);
      onCloseConfirm();
    },
    onError: () => {
      onCloseConfirm();
      setError(true);
    },
  });

  const onDeleteUser = async () => {
    deleteUserMutation.mutate({ accessToken });
  };

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Tooltip title='Ver detalle'>
          <IconButton
            color='info'
            component={NavLink}
            to={`/admin/users/${user.id}`}
            aria-label={`Ver detalle de ${fullName}`}
          >
            <VisibilityIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title='Editar'>
          <IconButton
            color='warning'
            onClick={openUpdateUser}
            aria-label={`Editar a ${fullName}`}
          >
            <ModeEditIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title='Eliminar'>
          <IconButton
            color='error'
            onClick={openDeleteUser}
            aria-label={`Eliminar a ${fullName}`}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title='Crear mascota'>
          <IconButton
            color='success'
            onClick={onCreatePetForUser}
            aria-label={`Crear mascota para ${fullName}`}
          >
            <PetsIcon />
          </IconButton>
        </Tooltip>
      </ThemeProvider>

      {success && (
        <Alerta
          type={'success'}
          title={'¡Usuario Eliminado!'}
          message={'Se ha elimnado correctamente usuario'}
          strong={fullName}
        />
      )}
      {error && (
        <Alerta
          type={'error'}
          title={'¡Ha ocurrido un problema!'}
          message={'No se ha podido eliminar el usuario'}
          strong={fullName}
        />
      )}

      <Modal_users show={showModal} close={onOpenCloseModal} title={titleModal}>
        <UserForm close={onOpenCloseModal} user={user} />
      </Modal_users>

      <Modal_delete
        onOpen={showConfirm}
        onCancel={onCloseConfirm}
        onConfirm={onDeleteUser}
        content={confirmMessage}
        title={titleDelete}
        size='mini'
      ></Modal_delete>

      <Modal_create_pet
        show={showPets}
        close={onOpenClosePets}
        title={titlePets}
      >
        <PetsForm close={onOpenClosePets} idUser={user.id} />
      </Modal_create_pet>
    </>
  );
}

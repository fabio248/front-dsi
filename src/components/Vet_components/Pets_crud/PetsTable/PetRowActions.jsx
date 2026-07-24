import React, { useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

//Mui material
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

//Modal Update/Delete
import { Modal_create_pet, Modal_delete, Alerta } from '../../../../shared';

//objeto children que se renderiza dentro del modal
import { PetsForm } from '../PetsForm';

//import petitions of back
import { Pets } from '../../../../api/Pets.api';
import { ApiAuth } from '../../../../api/Auth.api';

const petController = new Pets();
const authController = new ApiAuth();

/**
 * El tema global (src/main.jsx) define `palette.inherit = { main: '#8EC167' }`.
 * `inherit` no es una clave válida de palette, y SvgIcon resuelve su color como
 * `palette[color].main` antes de caer al valor literal 'inherit'. Como el color
 * por defecto de SvgIcon ES 'inherit', ese green termina pisando el color del
 * IconButton y los iconos salen todos iguales.
 *
 * Envolver en un tema por defecto (sin esa clave) deja que los iconos hereden
 * el color del botón. Es el mismo workaround que ya usan UserRowActions,
 * PetsAllItems, FactureItem, ProductItem y Alert.
 */
const defaultTheme = createTheme();

/**
 * Acciones por fila (ver, editar, eliminar) con sus modales.
 *
 * Es la misma lógica que tenía PetsAllItems, extraída para que la columna de
 * acciones no dependa del layout de tarjeta.
 */
export function PetRowActions({ pet }) {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  //useState que controla el estado del (abrir o cerrar) modal Update
  const [showUpdatePet, setShowUpdatePet] = useState(false);
  const [titleUpdatePet, setTitleUpdatePet] = useState('');

  //useState que controla el estado del (abrir o cerrar) modal Delete
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');
  const [titleDelete, setTitleDelete] = useState('');

  const onOpenCloseUpdate = () => setShowUpdatePet((prevState) => !prevState);
  const onCloseConfirm = () => setShowConfirm((prevState) => !prevState);

  const openUpdatePet = () => {
    setTitleUpdatePet(`Actualizando datos de la Mascota: ${pet.name}`);
    onOpenCloseUpdate();
  };

  const openDeletePet = () => {
    setTitleDelete(`Eliminar Mascota: ${pet.name}`);
    setConfirmMessage(`¿Está seguro de que desea eliminar la mascota?`);
    onCloseConfirm();
  };

  const queryClient = useQueryClient();

  const deletePetMutation = useMutation({
    mutationFn: async () => {
      const accessToken = authController.getAccessToken();
      return await petController.deletePet(accessToken, pet.id);
    },
    onSuccess: () => {
      // La tabla usa ['pets', 'table', params]; invalidar por el prefijo
      // ['pets'] refresca tanto la tabla como el scroll infinito.
      queryClient.invalidateQueries(['pets']);
      setSuccess(true);
      onCloseConfirm();
    },
    onError: () => {
      onCloseConfirm();
      setError(true);
    },
  });

  const onDeletePet = async () => {
    deletePetMutation.mutate();
  };

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Tooltip title='Ver detalle'>
          <IconButton
            color='info'
            component={NavLink}
            to={`/admin/pets/${pet.id}`}
            aria-label={`Ver detalle de ${pet.name}`}
          >
            <VisibilityIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title='Editar'>
          <IconButton
            color='warning'
            onClick={openUpdatePet}
            aria-label={`Editar a ${pet.name}`}
          >
            <ModeEditIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title='Eliminar'>
          <IconButton
            color='error'
            onClick={openDeletePet}
            aria-label={`Eliminar a ${pet.name}`}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </ThemeProvider>

      {success && (
        <Alerta
          type={'info'}
          title={'¡Mascota Eliminada!'}
          message={'Se ha eliminado correctamente la mascota'}
          strong={pet.name}
        />
      )}
      {error && (
        <Alerta
          type={'error'}
          title={'¡Ha ocurrido un problema!'}
          message={'No se ha podido eliminar la mascota'}
          strong={pet.name}
        />
      )}

      <Modal_delete
        onOpen={showConfirm}
        onCancel={onCloseConfirm}
        onConfirm={onDeletePet}
        content={confirmMessage}
        title={titleDelete}
        size='mini'
      ></Modal_delete>

      <Modal_create_pet
        show={showUpdatePet}
        close={onOpenCloseUpdate}
        title={titleUpdatePet}
      >
        <PetsForm close={onOpenCloseUpdate} pet={pet} />
      </Modal_create_pet>
    </>
  );
}

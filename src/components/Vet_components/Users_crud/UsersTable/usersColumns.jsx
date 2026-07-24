import React from 'react';

import {
  EMPTY_CELL,
  formatDateOnly,
  formatTimestamp,
  textCell,
} from '../../../../shared/components/DataGrid';
import { UserRowActions } from './UserRowActions';

/**
 * Columnas sobre las que el backend acepta ordenar (§4 del contrato).
 * El `id` de cada columna ordenable debe salir de aquí: se manda tal cual como
 * `sortBy`, y un valor fuera de la lista blanca responde 400.
 */
export const SORTABLE_USER_FIELDS = [
  'firstName',
  'lastName',
  'email',
  'role',
  'dui',
  'birthday',
  'createdAt',
];

const ROLE_LABEL = {
  client: 'Cliente',
  admin: 'Administrador',
};

/**
 * Definición de columnas de la tabla de usuarios.
 *
 * `enableSorting: false` en las columnas que el backend no sabe ordenar: si el
 * encabezado ofreciera ordenar por teléfono o dirección, el click terminaría en
 * un 400. La UI solo muestra lo que el contrato soporta.
 */
export const usersColumns = [
  {
    // El servidor ordena por firstName; el nombre completo es solo presentación.
    id: 'firstName',
    header: 'Usuario',
    accessorFn: (user) => `${user.firstName} ${user.lastName}`,
    enableHiding: false,
    meta: { label: 'Usuario' },
    cell: textCell,
  },
  {
    id: 'email',
    accessorKey: 'email',
    header: 'Correo',
    meta: { label: 'Correo' },
    cell: textCell,
  },
  {
    id: 'role',
    accessorKey: 'role',
    header: 'Role',
    meta: { label: 'Role' },
    cell: ({ getValue }) => ROLE_LABEL[getValue()] ?? getValue() ?? EMPTY_CELL,
  },
  {
    id: 'dui',
    accessorKey: 'dui',
    header: 'DUI',
    meta: { label: 'DUI' },
    cell: textCell,
  },
  {
    id: 'birthday',
    accessorKey: 'birthday',
    header: 'Fecha de nacimiento',
    meta: { label: 'Fecha de nacimiento' },
    cell: ({ getValue }) => formatDateOnly(getValue()),
  },
  {
    id: 'createdAt',
    accessorKey: 'createdAt',
    header: 'Fecha de registro',
    meta: { label: 'Fecha de registro' },
    cell: ({ getValue }) => formatTimestamp(getValue()),
  },
  {
    id: 'phone',
    accessorKey: 'phone',
    header: 'Teléfono',
    enableSorting: false,
    meta: { label: 'Teléfono' },
    cell: textCell,
  },
  {
    id: 'direction',
    accessorKey: 'direction',
    header: 'Dirección',
    enableSorting: false,
    meta: { label: 'Dirección' },
    cell: textCell,
  },
  {
    id: 'actions',
    header: 'Acciones',
    enableSorting: false,
    enableHiding: false,
    meta: { variant: 'actions', label: 'Acciones' },
    cell: ({ row }) => <UserRowActions user={row.original} />,
  },
];

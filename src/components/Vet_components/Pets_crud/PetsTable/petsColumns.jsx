import React from 'react';

import {
  EMPTY_CELL,
  booleanCell,
  formatDateOnly,
  formatTimestamp,
  textCell,
} from '../../../../shared/components/DataGrid';
import { PetRowActions } from './PetRowActions';

/**
 * Columnas sobre las que el backend acepta ordenar (§5 del contrato,
 * `PetSortBy` en find-all-pets.args.ts).
 * El `id` de cada columna ordenable debe salir de aquí: se manda tal cual como
 * `sortBy`, y un valor fuera de la lista blanca responde 400.
 *
 * `specie` ordena por `specie.name` y `owner` por el nombre del dueño: ambos
 * los resuelve el servidor con JOIN, por eso el id de la columna no coincide
 * con la ruta del campo que se pinta.
 */
export const SORTABLE_PET_FIELDS = [
  'name',
  'raza',
  'color',
  'gender',
  'birthday',
  'createdAt',
  'specie',
  'owner',
];

const GENDER_LABEL = {
  macho: 'Macho',
  hembra: 'Hembra',
};

/**
 * Definición de columnas de la tabla de mascotas.
 *
 * `enableSorting: false` en las columnas que el backend no sabe ordenar
 * (`pedigree`, `isHaveTatto`): si el encabezado ofreciera ordenarlas, el click
 * terminaría en un 400. La UI solo muestra lo que el contrato soporta.
 */
export const petsColumns = [
  {
    id: 'name',
    accessorKey: 'name',
    header: 'Mascota',
    enableHiding: false,
    meta: { label: 'Mascota' },
    cell: textCell,
  },
  {
    // El servidor ordena por `specie` (JOIN a specie.name); el id de la columna
    // es el que entiende el backend, no la ruta del campo.
    id: 'specie',
    accessorFn: (pet) => pet.specie?.name,
    header: 'Especie',
    meta: { label: 'Especie' },
    cell: textCell,
  },
  {
    id: 'raza',
    accessorKey: 'raza',
    header: 'Raza',
    meta: { label: 'Raza' },
    cell: textCell,
  },
  {
    id: 'gender',
    accessorKey: 'gender',
    header: 'Género',
    meta: { label: 'Género' },
    cell: ({ getValue }) =>
      GENDER_LABEL[getValue()] ?? getValue() ?? EMPTY_CELL,
  },
  {
    id: 'color',
    accessorKey: 'color',
    header: 'Color',
    meta: { label: 'Color' },
    cell: textCell,
  },
  {
    id: 'birthday',
    accessorKey: 'birthday',
    header: 'Nacimiento',
    meta: { label: 'Nacimiento' },
    cell: ({ getValue }) => formatDateOnly(getValue()),
  },
  {
    // `owner` en el backend ordena por user.firstName, user.lastName.
    // `user` es opcional en PetResponseDto, así que puede no venir.
    id: 'owner',
    accessorFn: (pet) =>
      pet.user ? `${pet.user.firstName} ${pet.user.lastName}` : '',
    header: 'Dueño',
    meta: { label: 'Dueño' },
    cell: textCell,
  },
  {
    id: 'pedigree',
    accessorKey: 'pedigree',
    header: 'Pedigree',
    enableSorting: false,
    meta: { label: 'Pedigree' },
    cell: booleanCell,
  },
  {
    // Sí, con el typo: es el nombre del campo en la entidad y en el payload de
    // creación (ver §7 del contrato). Renombrarlo rompe el alta de mascotas.
    id: 'isHaveTatto',
    accessorKey: 'isHaveTatto',
    header: 'Tatuaje',
    enableSorting: false,
    meta: { label: 'Tatuaje' },
    cell: booleanCell,
  },
  {
    id: 'createdAt',
    accessorKey: 'createdAt',
    header: 'Fecha de registro',
    meta: { label: 'Fecha de registro' },
    cell: ({ getValue }) => formatTimestamp(getValue()),
  },
  {
    id: 'actions',
    header: 'Acciones',
    enableSorting: false,
    enableHiding: false,
    meta: { variant: 'actions', label: 'Acciones' },
    cell: ({ row }) => <PetRowActions pet={row.original} />,
  },
];

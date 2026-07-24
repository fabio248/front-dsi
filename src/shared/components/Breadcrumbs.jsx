import React from 'react';
import { Breadcrumbs as MuiBreadcrumbs, Link, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { NavLink } from 'react-router-dom';
import { readListQuery } from '../listQueryMemory';

const LOADING_LABEL = '…';

/**
 * Reconstruye el destino de una miga hacia un listado.
 *
 * Si el `to` ya trae query se respeta tal cual; si no, se le devuelve la última
 * que tuvo ese listado, para que volver de un detalle no borre la búsqueda, el
 * orden ni la página en la que se estaba.
 */
function resolveTo(to) {
  if (typeof to !== 'string' || to.includes('?')) return to;

  const search = readListQuery(to);
  return search ? { pathname: to, search } : to;
}

/**
 * Migas de pan para las páginas de detalle.
 *
 * Recibe la ruta de la sección hacia arriba (`items`) y antepone siempre el
 * inicio del panel. El último elemento es la página actual: se pinta como texto
 * y se marca con `aria-current`, no como enlace, porque un enlace a la página
 * en la que ya se está no lleva a ningún lado.
 *
 * Cada `item` es `{ label, to }`. Sin `to` el elemento no es navegable, lo que
 * sirve tanto para la página actual como para niveles intermedios que no tienen
 * pantalla propia.
 *
 * Los enlaces hacia un listado recuperan la query con la que se dejó ese
 * listado (ver `listQueryMemory`): quien entra a un detalle desde la página 3
 * de un resultado filtrado espera volver ahí, no al listado en blanco.
 *
 * El nombre del registro suele venir de una petición, así que `label` puede
 * llegar vacío en el primer render: se muestra un placeholder en vez de una
 * miga en blanco que luego cambia de ancho.
 */
export function Breadcrumbs({
  items = [],
  homeLabel = 'Inicio',
  homeTo = '/admin',
  ...props
}) {
  const crumbs = [{ label: homeLabel, to: homeTo, icon: true }, ...items];
  const lastIndex = crumbs.length - 1;

  return (
    <MuiBreadcrumbs
      aria-label='Ruta de navegación'
      separator={<NavigateNextIcon fontSize='small' />}
      {...props}
    >
      {crumbs.map((crumb, index) => {
        const label = crumb.label || LOADING_LABEL;
        const isCurrent = index === lastIndex;

        const content = crumb.icon ? (
          <>
            <HomeIcon fontSize='small' sx={{ mr: 0.5 }} />
            {label}
          </>
        ) : (
          label
        );

        // La página actual y los niveles sin ruta propia no son enlaces.
        if (isCurrent || !crumb.to) {
          return (
            <Typography
              key={`${label}-${index}`}
              color='text.primary'
              sx={{ display: 'flex', alignItems: 'center' }}
              aria-current={isCurrent ? 'page' : undefined}
            >
              {content}
            </Typography>
          );
        }

        return (
          <Link
            key={`${label}-${index}`}
            component={NavLink}
            to={resolveTo(crumb.to)}
            underline='hover'
            color='inherit'
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            {content}
          </Link>
        );
      })}
    </MuiBreadcrumbs>
  );
}

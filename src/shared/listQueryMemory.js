const STORAGE_PREFIX = 'list-query:';

/**
 * Memoria de la última vista de cada listado.
 *
 * El estado de las tablas (búsqueda, orden, página) vive en la query string,
 * así que al entrar a un detalle desde `/admin/users?search=ana&page=3` la URL
 * del detalle ya no lo lleva. Si la miga de pan apunta al path pelado, volver
 * al listado lo devuelve en su estado inicial y hay que rehacer el filtro.
 *
 * Aquí se guarda la query de cada listado por su pathname para que las migas
 * puedan reconstruir el enlace de vuelta. Va en `sessionStorage` porque es
 * contexto de navegación, no una preferencia: en una pestaña nueva se espera
 * empezar limpio.
 *
 * Si el storage falla (modo privado, cuota llena) se degrada a enlaces sin
 * query, que es exactamente el comportamiento anterior.
 */
export function rememberListQuery(pathname, search) {
  try {
    window.sessionStorage.setItem(STORAGE_PREFIX + pathname, search ?? '');
  } catch {
    // Sin memoria se vuelve al listado sin filtros: molesto, no roto.
  }
}

export function readListQuery(pathname) {
  try {
    return window.sessionStorage.getItem(STORAGE_PREFIX + pathname) ?? '';
  } catch {
    return '';
  }
}

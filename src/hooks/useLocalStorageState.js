import { useEffect, useState } from 'react';

/**
 * Estado de React respaldado en localStorage.
 *
 * Pensado para preferencias de UI que deben sobrevivir a un reload pero que no
 * pertenecen a la URL: qué columnas ve cada quien es una preferencia personal,
 * y meterla en la query string haría que compartir un enlace le imponga tu
 * layout al otro (además de ensuciar la URL).
 *
 * Si localStorage falla (modo privado, cuota llena, storage bloqueado) se
 * degrada a estado en memoria en vez de romper el render.
 */
export function useLocalStorageState(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored === null ? defaultValue : JSON.parse(stored);
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Preferencia no crítica: si no se puede guardar, seguimos en memoria.
    }
  }, [key, value]);

  return [value, setValue];
}

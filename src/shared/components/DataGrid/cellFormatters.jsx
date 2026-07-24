import { format } from 'date-fns';

export const EMPTY_CELL = '—';

/**
 * Fechas con semántica de día (`birthday`).
 *
 * Prisma la guarda como DateTime a medianoche UTC, así que se toma la parte de
 * fecha del ISO tal cual, con regex y no con `new Date(...)`: convertir a hora
 * local en El Salvador (UTC-6) correría el cumpleaños al día anterior.
 * Se tolera además el formato heredado dd/MM/yyyy por si quedan registros
 * viejos sin normalizar.
 */
export function formatDateOnly(value) {
  if (!value) return EMPTY_CELL;

  const isoDate = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
  if (isoDate) {
    const [, year, month, day] = isoDate;
    return `${day}/${month}/${year}`;
  }

  return value;
}

/**
 * Instantes reales (`createdAt`).
 *
 * Al revés que `birthday`: aquí sí importa la hora, así que se convierte a la
 * zona local. Un registro creado a las 02:00 UTC ocurrió el día anterior en
 * El Salvador, y recortar el ISO mostraría la fecha equivocada.
 */
export function formatTimestamp(value) {
  if (!value) return EMPTY_CELL;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return EMPTY_CELL;

  return format(date, 'dd/MM/yyyy');
}

/** Celda de texto plano: cae al guion cuando el campo es opcional y vino vacío. */
export function textCell({ getValue }) {
  return getValue() || EMPTY_CELL;
}

/** Celda booleana. `null`/`undefined` es "no se sabe", no "no". */
export function booleanCell({ getValue }) {
  const value = getValue();
  if (value === null || value === undefined) return EMPTY_CELL;

  return value ? 'Sí' : 'No';
}

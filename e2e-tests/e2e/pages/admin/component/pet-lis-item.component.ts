import { type Locator } from '@playwright/test';

// Tipo para estructurar los datos extraídos de cada mascota
export type PetDetails = {
  nombre: string;
  especie: string;
  raza: string;
  genero: string;
  nacimiento: string;
  colorPelaje: string;
  dueño: string;
};

/**
 * Encabezado de la columna del data grid del que sale cada campo.
 *
 * Se resuelve por texto de encabezado y no por posición fija: la tabla permite
 * ocultar columnas, así que el índice de una celda depende de la preferencia
 * guardada en localStorage.
 */
const COLUMN_BY_FIELD: Record<keyof PetDetails, string> = {
  nombre: 'Mascota',
  especie: 'Especie',
  raza: 'Raza',
  genero: 'Género',
  nacimiento: 'Nacimiento',
  colorPelaje: 'Color',
  dueño: 'Dueño',
};

export class PetListItem {
  public readonly rootLocator: Locator;

  // Botones de acción
  public readonly viewButton: Locator;
  public readonly editButton: Locator;
  public readonly deleteButton: Locator;

  // Índice de cada columna visible, por texto de encabezado.
  private readonly columnIndex: Record<string, number>;

  constructor(locator: Locator, columnIndex: Record<string, number> = {}) {
    this.rootLocator = locator;
    this.columnIndex = columnIndex;

    // Usamos botones accesibles expuestos con aria-label
    this.viewButton = this.rootLocator.getByRole('button', {
      name: /ver detalle de/i,
    });
    this.editButton = this.rootLocator.getByRole('button', {
      name: /editar a/i,
    });
    this.deleteButton = this.rootLocator.getByRole('button', {
      name: /eliminar a/i,
    });
  }

  /**
   * Devuelve los detalles de la mascota leyendo las celdas de la fila.
   */
  async getDetails(): Promise<PetDetails> {
    const cells = await this.rootLocator.getByRole('cell').allInnerTexts();

    const read = (field: keyof PetDetails) => {
      const index = this.columnIndex[COLUMN_BY_FIELD[field]];
      if (index === undefined) return '';

      return cells[index]?.trim() ?? '';
    };

    return {
      nombre: read('nombre'),
      especie: read('especie'),
      raza: read('raza'),
      genero: read('genero'),
      nacimiento: read('nacimiento'),
      colorPelaje: read('colorPelaje'),
      dueño: read('dueño'),
    };
  }

  async clickView(): Promise<void> {
    await this.viewButton.click();
  }

  async clickEdit(): Promise<void> {
    await this.editButton.click();
  }

  async clickDelete(): Promise<void> {
    await this.deleteButton.click();
  }
}

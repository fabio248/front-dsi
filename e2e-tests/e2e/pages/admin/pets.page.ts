import { type Page, type Locator } from '@playwright/test';
import { PetListItem } from './component/pet-lis-item.component';
import { AppRoutes } from '../../routes/app.routes';

export class PetsPage {
  public readonly page: Page;

  // Controles principales de la página
  public readonly registerClientAndPetButton: Locator;
  public readonly searchInput: Locator;
  public readonly totalPetsText: Locator;
  public readonly deleteConfirmButton: Locator;
  private readonly grid: Locator;
  private readonly headerCells: Locator;
  private readonly petRows: Locator;
  private readonly emptyMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.registerClientAndPetButton = page.getByRole('button', {
      name: 'Registrar cliente y su mascota',
    });
    this.searchInput = page.getByLabel('Buscar');
    this.totalPetsText = page.locator('text=/Total mascotas registradas:/');
    this.grid = page.locator('table.data-grid');
    this.headerCells = this.grid.locator('thead th');
    // Las filas de "cargando" y "sin resultados" también viven en el tbody,
    // pero se marcan con `data-grid__message`: se excluyen para que no cuenten
    // como mascotas.
    this.petRows = this.grid.locator(
      'tbody tr:not(:has(td.data-grid__message))'
    );
    this.emptyMessage = this.grid.locator('td.data-grid__message');
    // El botón de confirmar del modal de borrado. Se acota al diálogo porque
    // los botones de acción de cada fila también dicen "Eliminar".
    this.deleteConfirmButton = page
      .getByRole('dialog')
      .getByRole('button', { name: /^eliminar$/i });
  }

  /**
   * Navega a la página de mascotas.
   */
  public async visit(): Promise<void> {
    await this.page.goto(AppRoutes.admin.pets); // Ajusta la URL si es necesario
  }

  /**
   * Realiza una búsqueda en la lista de mascotas.
   *
   * La tabla filtra en servidor con 500 ms de debounce, así que hay que esperar
   * a que la petición termine antes de leer las filas.
   */
  public async search(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.waitForProgressSpinner();
    await this.waitForIdleGrid();
  }

  /**
   * Obtiene el número total de mascotas registradas desde el texto.
   */
  public async getTotalPetsCount(): Promise<number> {
    const text = await this.totalPetsText.textContent();
    const count = text?.split(':')[1].trim();
    return count ? parseInt(count, 10) : 0;
  }

  /**
   * Encuentra una mascota específica por su nombre y devuelve su componente.
   *
   * Con paginación en servidor ya no se recorren las páginas: se filtra por
   * nombre, que es una de las columnas que cubre `search`.
   */
  public async getPetByName(name: string): Promise<PetListItem> {
    await this.search(name);
    await this.waitForAnyPet();

    const petLocator = this.petRows.filter({ hasText: name }).first();
    return new PetListItem(petLocator, await this.getColumnIndex());
  }

  /**
   * Devuelve un array con todos los componentes de mascotas visibles en la
   * página actual de la tabla.
   */
  public async getVisiblePets(): Promise<PetListItem[]> {
    await this.waitForAnyPet();

    const columnIndex = await this.getColumnIndex();
    const locators = await this.petRows.all();
    return locators.map((locator) => new PetListItem(locator, columnIndex));
  }

  /**
   * Posición de cada columna visible, por texto de encabezado. Permite leer
   * celdas por nombre aunque el usuario haya ocultado columnas.
   */
  private async getColumnIndex(): Promise<Record<string, number>> {
    const headers = await this.headerCells.allInnerTexts();

    return headers.reduce<Record<string, number>>((index, header, position) => {
      index[header.trim()] = position;
      return index;
    }, {});
  }

  private async waitForAnyPet(timeout = 5000): Promise<boolean> {
    try {
      await this.petRows.first().waitFor({ state: 'visible', timeout });
      return true;
    } catch {
      await this.emptyMessage
        .first()
        .waitFor({ state: 'visible', timeout: 1000 })
        .catch(() => {});
      return false;
    }
  }

  /** Espera a que la tabla deje de refrescarse (`aria-busy`). */
  private async waitForIdleGrid(timeout = 10000): Promise<void> {
    await this.page
      .waitForFunction(
        () =>
          document
            .querySelector('table.data-grid')
            ?.getAttribute('aria-busy') === 'false',
        undefined,
        { timeout }
      )
      .catch(() => {});
  }

  private async waitForProgressSpinner() {
    const spinner = this.page
      .locator('span[role="progressbar"], [role="progressbar"]')
      .first();
    // Algunos renders activan el spinner después del fill, por lo que
    // esperamos primero a que aparezca y luego a que desaparezca.
    try {
      await spinner.waitFor({ state: 'visible', timeout: 1000 });
    } catch {
      // Si no apareció, continuamos; evita fallar en búsquedas instantáneas.
    }
    await spinner.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
  }
}

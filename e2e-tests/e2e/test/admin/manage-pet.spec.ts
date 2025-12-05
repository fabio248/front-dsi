import { PetDetails } from './../../pages/admin/component/pet-lis-item.component';
import { test, expect } from '../../fixtures/auth.fixture';
import { makeNewPet } from '../../factories/pet.factory';
import { UserListItem } from '../../pages/admin/component/user-card.component';
import { UserDetailsPage } from '../../pages/admin/user-details.page';
import { AppRoutes } from '../../routes/app.routes';
import type { Pet } from '../../types/pet';
import { PetsPage } from '../../pages/admin/pets.page';
import { PetFormModal } from '../../pages/admin/component/create-pet-modal.component';
import { getRandomNumber } from '../../utils/get-random-number';
import { PetDetailsPage } from '../../pages/admin/pet-details.page';
import { AdminUsersPage } from '../../pages/admin/users.page';
import { CreateClinicalSheetModal } from '../../pages/admin/component/mediacal-history-moda/create-clinica-sheet-modal.component';
import {
  makeAnamnesisData,
  makeDiagnosisData,
  makePhysicalExamData,
} from '../../factories/clinical-sheet.factory';

// Usamos test.describe.serial para asegurar que los tests se ejecuten en orden.
test.describe('Manejo de acciones de mascotas', () => {
  // Declaramos la variable aquí para compartirla entre los tests.

  test('debería crear una nueva mascota correctamente', async ({ page }) => {
    // 1. Generamos los datos de la mascota usando la fábrica
    const newPet = makeNewPet();

    await page.goto(AppRoutes.admin.users);
    const usersPage = new AdminUsersPage(page);
    await usersPage.loadMoreTimes(getRandomNumber(50));
    const visibleUsers = await usersPage.getVisibleUsers();

    const user = visibleUsers[getRandomNumber(visibleUsers.length)];

    // Asumo que este método abre el modal de creación
    await user.createPet();

    // 2. Usamos el modal refactorizado en modo 'create'
    const petModal = new PetFormModal(page, 'create');
    await expect(petModal.title).toBeVisible();

    // 3. Rellenamos y enviamos el formulario
    await petModal.fillForm(newPet);
    await petModal.submit(); // Usamos el método genérico .submit()

    // 4. Verificamos que la mascota fue creada en la página de detalles del usuario
    await user.viewUserDetails();
    const userDetailsPage = new UserDetailsPage(page);
    const createdPet = await userDetailsPage.petsCard.getPetByName(newPet.name);

    const details = await createdPet.getDetails();
    expect(details.nombre).toBe(newPet.name);
  });

  test('debería modificar una mascota', async ({ page }) => {
    // 1. Navegamos a la página principal de mascotas donde se puede editar
    const petsPage = new PetsPage(page);
    await petsPage.visit();
    const newPetname = makeNewPet();

    // 2. Tomamos la primera mascota visible en la lista

    const visiblePets = await petsPage.getVisiblePets();
    expect(visiblePets.length).toBeGreaterThan(0);

    // Generate a random index between 0 and loaded pets
    const randomIndex = getRandomNumber(visiblePets.length);
    const petToUpdate = visiblePets[randomIndex];

    await expect(petToUpdate.rootLocator).toBeVisible();

    // 3. Hacemos clic en el botón de editar para abrir el modal
    await petToUpdate.clickEdit();

    // 4. Usamos el mismo modal refactorizado, pero ahora en modo 'update'
    const petModal = new PetFormModal(page, 'update');
    await expect(petModal.title).toBeVisible();

    // 5. Definimos los nuevos datos que queremos actualizar
    const updatedData = {
      name: `${newPetname.name} Actualizado`,
      hasPedigree: false, // Vamos a desmarcar esta opción
    };

    // 6. Rellenamos el formulario solo con los datos a cambiar y enviamos
    await petModal.fillForm(updatedData);
    await petModal.submit();
  });

  test('debería crear un registro clinico a una mascota', async ({ page }) => {
    const petsPage = new PetsPage(page);
    await petsPage.visit();
    const visiblePets = await petsPage.getVisiblePets();
    expect(visiblePets.length).toBeGreaterThan(0);

    // Generate a random index between 0 and loaded pets
    const randomIndex = getRandomNumber(visiblePets.length);
    const petToCreateMedicalHistory = visiblePets[randomIndex];
    await petToCreateMedicalHistory.clickView();

    const petDetailsPage = new PetDetailsPage(page);
    await petDetailsPage.registerClinicalSheetButton.click();
    const clinicalSheetModal = new CreateClinicalSheetModal(page);

    const anamnesisData = makeAnamnesisData();
    const physicalExamData = makePhysicalExamData();
    const diagnosisData = makeDiagnosisData();

    // --- 3. COMPLETAR EL FLUJO DEL MODAL ---

    // PASO 1: Anamnesis
    await expect(clinicalSheetModal.title).toBeVisible();
    await expect(clinicalSheetModal.getActiveStep()).resolves.toBe('Anamnesis');
    await clinicalSheetModal.anamnesisStep.fillForm(anamnesisData);
    await clinicalSheetModal.goToNextStep();

    // PASO 2: Examen Físico
    await clinicalSheetModal.physicalExamStep.fillForm(physicalExamData);
    await clinicalSheetModal.goToNextStep();

    // PASO 3: Diagnóstico
    await clinicalSheetModal.diagnosisStep.fillForm(diagnosisData);

    // FINALIZAR
    await clinicalSheetModal.finish();

    // Verificación adicional: el nuevo diagnóstico debería aparecer en la página de detalles
    const firstDiagnosisDescription = diagnosisData.description
      .split('.')[0]
      .trim();
    await petDetailsPage.expectClinicalHistoryEntryContains(
      firstDiagnosisDescription
    );
  });

  test('debería eliminar una mascota existente', async ({ page }) => {
    const petsPage = new PetsPage(page);
    await petsPage.visit();
    
    const visiblePets = await petsPage.getVisiblePets();
    const initialCount = visiblePets.length;
    const petToDelete = visiblePets[0];
    const petDetails = await petToDelete.getDetails();
    
    await petToDelete.clickDelete();
    await page.getByRole('button', { name: /confirmar|eliminar|aceptar/i }).click();

    // Wait for the success alert
    await expect(page.getByText('¡Mascota Eliminada!')).toBeVisible();
    await expect(page.getByText('Se ha eliminado correctamente la mascota')).toBeVisible();
  });

  test('debería mostrar errores al intentar crear mascota sin datos requeridos', async ({ page }) => {
    await page.goto(AppRoutes.admin.users);
    const usersPage = new AdminUsersPage(page);
    const visibleUsers = await usersPage.getVisibleUsers();
    const user = visibleUsers[0];
    
    await user.createPet();
    
    const petModal = new PetFormModal(page, 'create');
    await petModal.submit();
    
    await expect(petModal.title).toBeVisible();
    
    const errorMessages = page.locator('.MuiFormHelperText-root.Mui-error');
    expect(await errorMessages.count()).toBeGreaterThan(0);
  });

  test('debería validar que no se puede seleccionar una fecha futura', async ({ page }) => {
    await page.goto(AppRoutes.admin.users);
    const usersPage = new AdminUsersPage(page);
    const visibleUsers = await usersPage.getVisibleUsers();
    const user = visibleUsers[0];
    
    await user.createPet();
    
    const petModal = new PetFormModal(page, 'create');
    
    // Open date picker
    await page.getByRole('button', { name: /Choose date/i }).click();
    
    // Calculate tomorrow
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    // We need to handle the case where tomorrow is in the next month
    // If tomorrow's month is different from today's month, we need to click "Next month"
    if (tomorrow.getMonth() !== today.getMonth()) {
       await page.getByRole('button', { name: 'Next month' }).click();
    }

    // Find the button for tomorrow using its day number
    // We filter by text to be precise, and ensure it's a day button
    const dayNumber = tomorrow.getDate().toString();
    const dayButton = page.getByRole('gridcell', { name: dayNumber, exact: true });

    // Verify it is disabled
    await expect(dayButton).toBeDisabled();
  });
  
});
